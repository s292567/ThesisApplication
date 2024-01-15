package se2g12.thesisapplication.application

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.mock.web.MockMultipartFile
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.archive.ArchiveService
import se2g12.thesisapplication.degree.Degree
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.department.Department
import se2g12.thesisapplication.department.DepartmentRepository
import se2g12.thesisapplication.proposal.Proposal
import se2g12.thesisapplication.proposal.ProposalDTO
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.proposal.ProposalService
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.student.toDTO
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.nio.charset.StandardCharsets
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@AutoConfigureMockMvc(addFilters = false)
class ApplicationControllerTest {

    @Autowired
    private lateinit var objectMapper: ObjectMapper
    @Autowired
    private lateinit var applicationService: ApplicationService
    @Autowired
    lateinit var archiveRepository: ArchiveRepository
    @Autowired
    lateinit var teacherRepository: TeacherRepository
    @Autowired
    lateinit var proposalRepository: ProposalRepository
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

    private lateinit var savedStudent: Student
    private lateinit var savedTeacher: Teacher
    private var savedProposals: MutableList<Proposal> = mutableListOf()

    @BeforeAll
    fun init(){
        // at least 1 student, 1 teacher and 1 proposal
        val department=departmentRepository.save(Department("DEP1"))

        val groupDep=groupDepRepository.save(GroupDep(id="G13",department = department))
        val localDate: LocalDate = LocalDate.parse("2020-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        var teacher = Teacher("Ferrari", "Luca", "p101@example.com",groupDep,id="p101")
        teacher= teacherRepository.save(teacher);
        savedTeacher = teacher
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
            cds = "Computer Science, Data Science,MockDeg"
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
            cds = "Computer Science, Data Science,MockDeg"
        )
        savedProposals.add(proposalRepository.save(proposal))
        savedProposals.add(proposalRepository.save(proposal2))
        val degree= Degree("DEG1","MockDeg")
        val student= Student("mocksurname","mockname","F","IT","s654140@example.com",degree,2013,id="s654140")
        val application=Application(student,proposal,"pending")

        degreeRepository.save(degree)
        savedStudent=studentRepository.save(student)
        // applicationRepository.save(application)
    }




    @WithMockUser(username = "p101@example.com", roles = ["Professor"])
    @Test
    fun `test decline application`() {
        /* --save an application-- */
        var application=Application(savedStudent,savedProposals.first(),"pending")
        application = applicationRepository.save(application)

        val applicationStatus=ApplicationStatus(savedStudent.id!!, savedProposals.first().id!!, "declined")
        val professorId = savedTeacher.id!!
        mockMvc.perform(
            MockMvcRequestBuilders.patch("/API/thesis/applications/$professorId")
                .content("""${objectMapper.writeValueAsString(applicationStatus)}""")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)

        val dbApplication = applicationRepository.findById(application.id!!).get()
        assertEquals("declined", dbApplication.status)

    }

    @WithMockUser(username = "p101@example.com", roles = ["Professor"])
    @Test
    fun `test accept application`() {
        /* --save an application-- */
        var application=Application(savedStudent,savedProposals.first(),"pending")
        application = applicationRepository.save(application)

        val applicationStatus=ApplicationStatus(savedStudent.id!!, savedProposals.first().id!!, "accepted")
        val professorId = savedTeacher.id!!
        mockMvc.perform(
            MockMvcRequestBuilders.patch("/API/thesis/applications/$professorId")
                .content("""${objectMapper.writeValueAsString(applicationStatus)}""")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
        val dbApplication = applicationRepository.findById(application.id!!).get()
        assertEquals("accepted", dbApplication.status)

    }

    @WithMockUser(username = "p101@example.com", roles = ["Professor"])
    @Test
    fun getAllApplyingStudentsForProposal() {
        /* --save an application-- */
        val proposalId=savedProposals.first().id!!
        val application=Application(savedStudent,savedProposals.first(),"pending")
        applicationRepository.save(application)
        val listOfStudents = listOf(savedStudent.toDTO())

        mockMvc.perform(
            MockMvcRequestBuilders.get("/API/thesis/applications/students?proposalId=$proposalId")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @WithMockUser(username = "p101@example.com", roles = ["Professor"])
    @Test
    fun getAllApplicationsForProposal() {
        /* --save an application-- */
        val proposalId=savedProposals.first().id!!
        var application=Application(savedStudent,savedProposals.first(),"pending")
        application=applicationRepository.save(application)
        val listOfApplications = listOf(application)

        mockMvc.perform(
            MockMvcRequestBuilders.get("/API/thesis/applications/by?proposalId=$proposalId")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
        // TODO: add more checks on the body
    }

    @WithMockUser(username = "s654140@example.com", roles = ["Student"])
    @Test
    fun getApplicationsForLoggedInStudent() {
        /* --save an application-- */
        val proposalId=savedProposals.first().id!!
        var application=Application(savedStudent,savedProposals.first(),"pending")
        application=applicationRepository.save(application)
        val listOfApplications = listOf(application)

        mockMvc.perform(
            MockMvcRequestBuilders.get("/API/thesis/applications/student/s654140@example.com")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }
}