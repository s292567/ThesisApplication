package se2g12.thesisapplication.proposal
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.application.Application
import se2g12.thesisapplication.application.ApplicationRepository
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.archive.ArchiveService
import se2g12.thesisapplication.degree.Degree
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.department.Department
import se2g12.thesisapplication.department.DepartmentRepository
import se2g12.thesisapplication.security.JwtAuthConverterProperties
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
class ProposalControllerMat {
    @Autowired
    lateinit var archiveRepository: ArchiveRepository

    @Autowired
    lateinit var teacherRepository: TeacherRepository

    @Autowired
    lateinit var proposalRepository: ProposalRepository
    @Autowired
    lateinit var proposalService:ProposalService
    @Autowired
    lateinit var archiveService: ArchiveService
    @Autowired
    lateinit var studentRepository: StudentRepository
    @Autowired
    lateinit var departmentRepository: DepartmentRepository
    @Autowired
    lateinit var applicationRepository: ApplicationRepository
    @Autowired
    lateinit var degreeRepository: DegreeRepository
    @Autowired
    lateinit var groupDepRepository: GroupDepRepository
    @Autowired
    private lateinit var mockMvc: MockMvc


    // Other @Autowired or @MockBean declarations
    @BeforeAll
    fun init(){
        val department=departmentRepository.save(Department("DEP1"))

        val groupDep=groupDepRepository.save(GroupDep(id="G13",department = department))
        val localDate: LocalDate = LocalDate.parse("2020-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        var teacher = Teacher("Ferrari", "Luca", "p101@example.com",groupDep,id="p101")
        teacher= teacherRepository.save(teacher);
        val proposal = Proposal(
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
            cds = "Computer Science, Data Science"
        )
        val proposal2 = Proposal(
            title = "Sample Proposal Ver2",
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
            cds = "Computer Science, Data Science"
        )
        proposalRepository.save(proposal)
        proposalRepository.save(proposal2)
        val degree=Degree("DEG1","MockDeg")
        val student= Student("mocksurname","mockname","F","IT","s654140@example.com",degree,2013,id="s654140")
        val application=Application(student,proposal,"pending")

        degreeRepository.save(degree)
        studentRepository.save(student)
        applicationRepository.save(application)
    }
    @WithMockUser(roles = ["Student"])
    @Test
    fun `test getAllProposals endpoint`() {

        // Mock data
        // Perform the request and assert the response
        mockMvc.perform(get("/API/thesis/proposals/all")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").isNotEmpty)
    }
    @Test
    @WithMockUser(username = "s654140@example.com", roles = ["Student"])
    fun `test getThesisStatusById endpoint`() {


        var proposalId=proposalRepository.findAll().filter { it.title.compareTo("Sample Proposal Late")==0 }.first().id
        var proposalId2=proposalRepository.findAll().filter { it.title.compareTo("Sample Proposal Late")!=0 }.first().id



        // Perform the request and assert the response
        mockMvc.perform(get("/API/thesis/proposals/statusById/{proposalId}", proposalId)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$").value(true))
        mockMvc.perform(get("/API/thesis/proposals/statusById/{proposalId2}", proposalId2)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$").value(false))
    }

// Add more tests for other endpoints as needed
}
