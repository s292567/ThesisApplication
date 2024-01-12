package se2g12.thesisapplication.request

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.persistence.EntityManager
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.degree.Degree
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.department.Department
import se2g12.thesisapplication.department.DepartmentRepository
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.util.UUID

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@AutoConfigureMockMvc(addFilters = false)
class RequestControllerTest {
    @Autowired
    private lateinit var objectMapper: ObjectMapper
    @Autowired
    private lateinit var mockMvc: MockMvc
    @Autowired
    private lateinit var requestService: RequestService

    @Autowired
    lateinit var teacherRepository: TeacherRepository
    @Autowired
    lateinit var studentRepository: StudentRepository
    @Autowired
    lateinit var requestRepository: RequestRepository
    @Autowired
    lateinit var departmentRepository: DepartmentRepository
    @Autowired
    lateinit var groupDepRepository: GroupDepRepository
    @Autowired
    lateinit var degreeRepository: DegreeRepository
    @Autowired
    lateinit var entityManager: EntityManager

    lateinit var savedRequests: List<Request>

    @BeforeAll
    fun init(){
        val department=departmentRepository.save(Department("DEP1"))
        val groupDep=groupDepRepository.save(GroupDep(id="G13",department = department))
        val teacher1 = teacherRepository.save(Teacher("Ferrari", "Luca", "p101@example.com",groupDep,id="p101"))
        val teacher2 = teacherRepository.save(Teacher("Rossi", "Mario", "p102@example.com",groupDep,id="p102"))

        val degree= degreeRepository.save(Degree("DEG1","MockDeg"))
        val student1= studentRepository.save(Student("mocksurname","mockname","F","IT","s654140@example.com",degree,2013,id="s654140"))
        val student2= studentRepository.save(Student("Moresco","Lara","F","IT","s123456@example.com",degree,2019,id="s123456"))

        val request1 = Request(student1, "My thesis request", "some description", teacher1, "")
        val request2 = Request(student2, "Some thesis request", "some other description", teacher2, "Luca Ferrari")
        val request3 = Request(student2, "A rejected request", "A thesis request rejected by the secretary", teacher1, "", "rejected")
        savedRequests = requestRepository.saveAll(listOf(request1, request2, request3))

    }

    @WithMockUser(roles = ["Secretary"])
    @Test
    fun `test get all requests by a Secretary`() {
        val result = mockMvc.perform(
            get("/API/thesis/requests")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andReturn()
        val requests:List<RequestDTO> = objectMapper.readValue(result.response.contentAsString, object : TypeReference<List<RequestDTO>>() {})
//      should return only request 0 and 1, not 2 which is not pending
        assertEquals(2, requests.size)
        assert(requests.all { it.title == savedRequests[0].title || it.title == savedRequests[1].title})
        assert(!requests.any { it.title == savedRequests[2].title})
    }

    @WithMockUser(roles = ["Secretary"])
    @Test
    @Transactional
    fun `test accept a request`() {
        val requestId=savedRequests[0].id!!
        val requestStatus = RequestStatusDTO(requestId, "accepted")
        mockMvc.perform(
            patch("/API/thesis/requests")
                .content("""${objectMapper.writeValueAsString(requestStatus)}""")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)

        // assert the status has been changed
        val updatedRequest = requestRepository.findById(requestId).get()
        assertEquals("accepted", updatedRequest.secretaryStatus )
    }

    @WithMockUser(roles = ["Secretary"])
    @Test
    @Transactional
    fun `test reject a request`() {
        val requestId=savedRequests[0].id!!
        val requestStatus = RequestStatusDTO(requestId, "reject")
        mockMvc.perform(
            patch("/API/thesis/requests")
                .content("""${objectMapper.writeValueAsString(requestStatus)}""")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
        // assert the status has been changed
        val updatedRequest = requestRepository.findById(requestId).get()
        assertEquals("rejected", updatedRequest.secretaryStatus)
    }
    @WithMockUser(roles = ["Secretary"])
    @Test
    fun `test incorrect status`() {
        val requestId=savedRequests[0].id!!
        // "declined" is invalid, only "rejected"
        val requestStatus = RequestStatusDTO(requestId, "declined")
        mockMvc.perform(
            patch("/API/thesis/requests")
                .content("""${objectMapper.writeValueAsString(requestStatus)}""")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isUnprocessableEntity)
        // assert the status has NOT been changed
        val updatedRequest = requestRepository.findById(requestId).get()
        assertEquals(updatedRequest.secretaryStatus, "pending")
    }
    @WithMockUser(roles = ["Secretary"])
    @Test
    fun `test request not found`() {
        val validIds:List<UUID> = savedRequests.map { it.id!! }
        var randomId:UUID
        // make sure the ID is not a valid one
        do {
            randomId=UUID.randomUUID()
        }while (validIds.contains(randomId))

        val requestStatus = RequestStatusDTO(randomId, "accept")
        mockMvc.perform(
            patch("/API/thesis/requests")
                .content("""${objectMapper.writeValueAsString(requestStatus)}""")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isNotFound)

    }
    @WithMockUser(roles = ["Secretary"])
    @Test
    fun `test request status not modifiable`() {
        val requestId=savedRequests[2].id!!
        // "declined" is invalid, only "rejected"
        val requestStatus = RequestStatusDTO(requestId, "accepted")
        mockMvc.perform(
            patch("/API/thesis/requests")
                .content("""${objectMapper.writeValueAsString(requestStatus)}""")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isUnprocessableEntity)
        // assert the status has NOT been changed
        val updatedRequest = requestRepository.findById(requestId).get()
        assertEquals("rejected", updatedRequest.secretaryStatus,)
    }
}