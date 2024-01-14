package se2g12.thesisapplication.file

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.TestInstance
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.core.io.ByteArrayResource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.application.Application
import se2g12.thesisapplication.application.ApplicationRepository
import se2g12.thesisapplication.application.ApplicationService
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.degree.Degree
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.department.Department
import se2g12.thesisapplication.department.DepartmentRepository
import se2g12.thesisapplication.proposal.Proposal
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.proposal.ProposalService
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@AutoConfigureMockMvc(addFilters = false)
class FileControllerTest {

    @Autowired
    private lateinit var objectMapper: ObjectMapper
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var teacherRepository: TeacherRepository
    @Autowired
    lateinit var proposalRepository: ProposalRepository
    @Autowired
    lateinit var archiveRepository: ArchiveRepository
    @Autowired
    lateinit var departmentRepository: DepartmentRepository
    @Autowired
    lateinit var groupDepRepository: GroupDepRepository
    @Autowired
    lateinit var degreeRepository: DegreeRepository
    @Autowired
    lateinit var studentRepository: StudentRepository
    @Autowired
    lateinit var applicationRepository: ApplicationRepository
    @Autowired
    lateinit var fileRepository: FileRepository

    lateinit var teacher: Teacher
    lateinit var student: Student
    lateinit var savedProposal:Proposal
    lateinit var savedApplication: Application
    lateinit var savedFile: File

    @BeforeEach
    fun setUp() {
        val department=departmentRepository.save(Department("DEP1"))

        val groupDep=groupDepRepository.save(GroupDep(id="G13",department = department))
        val localDate: LocalDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        teacher= teacherRepository.save(Teacher("Ferrari", "Luca", "p101@example.com",groupDep,id="p101"));
        savedProposal=proposalRepository.save(Proposal(
            title = "Sample Proposal Late",
            supervisor = teacher,
            coSupervisors = "Jane Doe, Bob Smith",
            keywords = "Java, Kotlin, MockK",
            type = "Research",
            groups = "GroupA, GroupB",
            description = "Sample proposal description",
            requiredKnowledge = "Sample required knowledge",
            notes = "Sample notes",
            expiration = localDate,
            level = "Master",
            cds = "Computer Science, Data Science,MockDeg"
        ))

        val degree= degreeRepository.save(Degree("DEG1","MockDeg"))
        student= studentRepository.save(Student("mocksurname","mockname","F","IT","s654140@example.com",degree,2013,id="s654140"))
        val fileContent="A simple text file."
        val file=File(fileContent.toByteArray(),"text/plain", "example.txt")
        savedFile=fileRepository.save(file)

        savedApplication= applicationRepository.save(Application(student,savedProposal,"pending", savedFile.fileId, savedFile.fileName))


    }

    @WithMockUser(username = "s654140@example.com", roles = ["Student"])
    @Test
    fun `test getFile by student`() {

        val result = mockMvc.perform(
            MockMvcRequestBuilders.get("/API/downloadFile/{id}", savedFile.fileId)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

        val returnedFile: ByteArray = result.response.contentAsByteArray
        val expectedResource = savedFile.file!!

        assertTrue(result.response.containsHeader(HttpHeaders.CONTENT_DISPOSITION))
        assertEquals("attachment; filename=${savedFile.fileName}", result.response.getHeader(HttpHeaders.CONTENT_DISPOSITION))
        assertEquals(MediaType.APPLICATION_OCTET_STREAM_VALUE, result.response.contentType)

        assertArrayEquals(expectedResource, returnedFile)
    }

    @WithMockUser(username = "p101@example.com", roles = ["Professor"])
    @Test
    fun `test getFile by professor`() {

        val result = mockMvc.perform(
            MockMvcRequestBuilders.get("/API/downloadFile/{id}", savedFile.fileId)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

        val returnedFile: ByteArray = result.response.contentAsByteArray
        val expectedResource = savedFile.file!!

        assertTrue(result.response.containsHeader(HttpHeaders.CONTENT_DISPOSITION))
        assertEquals("attachment; filename=${savedFile.fileName}", result.response.getHeader(HttpHeaders.CONTENT_DISPOSITION))
        assertEquals(MediaType.APPLICATION_OCTET_STREAM_VALUE, result.response.contentType)

        assertArrayEquals(expectedResource, returnedFile)
    }

    @WithMockUser(username = "s123456@example.com", roles = ["Student"])
    @Test
    fun `test getFile by student throws error`() {

        val exception = assertThrows<Exception> {
            mockMvc.perform(
                MockMvcRequestBuilders.get("/API/downloadFile/{id}", savedFile.fileId)
                    .contentType(MediaType.APPLICATION_JSON)
            )
                .andExpect(MockMvcResultMatchers.status().isInternalServerError) // Add expected HTTP status if needed
                .andReturn()
        }
        assert(exception.message!!.contains("not your application"))
    }

    @WithMockUser(username = "p103@example.com", roles = ["Professor"])
    @Test
    fun `test getFile by professor throws error`() {

        val exception = assertThrows<Exception> {
            mockMvc.perform(
                MockMvcRequestBuilders.get("/API/downloadFile/{id}", savedFile.fileId)
                    .contentType(MediaType.APPLICATION_JSON)
            )
                .andExpect(MockMvcResultMatchers.status().isInternalServerError) // Add expected HTTP status if needed
                .andReturn()
        }
        assert(exception.message!!.contains("not your proposal"))
    }
}