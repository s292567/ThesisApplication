package se2g12.thesisapplication.proposal

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import se2g12.thesisapplication.application.Application
import se2g12.thesisapplication.application.ApplicationRepository
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveService
import se2g12.thesisapplication.degree.Degree
import se2g12.thesisapplication.security.JwtAuthConverterProperties
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Optional
import java.util.UUID

@WebMvcTest(ProposalController::class)
class ProposalControllerTest(@Autowired val mockMvc: MockMvc)  {
    @MockBean
    private lateinit var proposalService: ProposalService
    @MockBean
    private lateinit var archiveService: ArchiveService
    @MockBean
    private lateinit var studentRepository: StudentRepository
    @MockBean
    private lateinit var proposalRepository: ProposalRepository
    @MockBean
    private lateinit var applicationRepository: ApplicationRepository
    @MockBean
    private lateinit var teacherRepository: TeacherRepository
    @MockBean
    private lateinit var jwtAuthConverterProperties: JwtAuthConverterProperties
    private lateinit var mockProposal: Proposal
    private lateinit var mockNewProposal: NewProposalDTO
    private lateinit var myJson: String
    private lateinit var securityContext: SecurityContext

    @BeforeEach
    fun setUp() {
        // You can perform additional setup if needed
        proposalService = mockk()
        archiveService = mockk()
        applicationRepository = mockk()
        studentRepository = mockk()
        securityContext = mockk<SecurityContext>()
        val date = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        mockProposal = Proposal("Advanced algorithms for image processing",
            mockk<Teacher>(),
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "Company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            date,
            "MSc",
            "Computer Engineering, Civil Engineering")
        mockNewProposal = NewProposalDTO(
            "Advanced algorithms for image processing",
            listOf("Paolo Ricci", "Mario Rossi") ,
            listOf("image processing"),
            listOf("Company"),
            listOf("G13","G21"),
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            date,
            "MSc",
            listOf("Computer Engineering", "Civil Engineering")
        )
        myJson = "{ \"title\": \"Advanced algorithms for image processing\", \"coSupervisors\": [\"Paolo Ricci\", \"Mario Rossi\"], \"keywords\": [\"image processing\"], \"types\": [\"Company\"], \"groups\": [\"G13\",\"G21\"], \"description\": \"something\",\"requiredKnowledge\": \"\", \"notes\":\"\", \"expiration\": \"2024-11-07\", \"level\": \"MSc\", \"cds\": [\"Computer Engineering\", \"Civil Engineering\"] }"

    }

    @Test
    fun getAllProposals() {
        val prop= mockk<ProposalDTO>()
        every { prop.id } returns mockk()
        every { proposalService.getAllProposals() }
        every { archiveService.findByPropId(any()) } returns emptyList()

        mockMvc.perform(
            get("/API/thesis/proposals/all")
            .with(user("p101@example.com").roles("Professor"))
        )
            .andExpect(status().isOk)
    }
    @Test
    fun getThesisStatusById() {
        val proposalId = UUID.randomUUID()
        val username = "s123456@example.com"
        val app= mockk<Application>()

        every { securityContext.authentication } returns mockAuthentication(true, username)
        every { applicationRepository.findByProposalIdAndStudentId(any(), any()) } returns listOf(app)

        mockMvc.perform(
            get("/API/thesis/proposals/statusById/$proposalId")
                .with(user(username).roles("Student"))
        )
            .andExpect(status().isOk)
    }
    @Test
    fun `getThesisStatusById unauthorized`() {
        val proposalId = UUID.randomUUID()
        val username = "s123456@example.com"
        val app= mockk<Application>()

        every { securityContext.authentication } returns mockAuthentication(false, username)
        every { applicationRepository.findByProposalIdAndStudentId(any(), any()) } returns listOf(app)

        mockMvc.perform(
            get("/API/thesis/proposals/statusById/$proposalId")
                .with(user(username).roles("Student"))
        )
            .andExpect(status().isOk)
//            .andExpect(content().json("\"false\""))
    }
    @Test
    fun getProposalsByCds() {
        val cds = "someCds"
        val proposals = listOf(mockk<ProposalDTO>())
        every { proposalService.getProposalsByCds(cds) } returns proposals
        every { archiveService.findByPropId(any()) } returns emptyList()

        mockMvc.perform(get("/API/thesis/proposals/cds").param("cds", cds)
            .with(user("s123456@example.com").roles("Student"))
        )
            .andExpect(status().isOk)
    }

    /*@Test
    fun getProposalsStudentId() {
        val studentId = "s123456"
        val username="$studentId@example.com"
        val degree = Degree(titleDegree = "ENG1")
        val mockStudent= Student(degree=degree)

//        PROBLEM: studentRepository.findById() return Optional.empty
        every { securityContext.authentication } returns mockAuthentication(true, username)
        every { studentRepository.findById(studentId) } returns Optional.of(mockStudent)
        every { archiveService.findByPropId(any()) } returns emptyList<Archive>()

        mockMvc.perform(get("/API/thesis/proposals/getProposalsBySId/$studentId")
            .with(user(username).roles("Student"))
        )
    }*/
    @Test
    fun searchProposals() {
        val studentId = "s123456"
        val username="$studentId@example.com"
        val prop= mockk<ProposalDTO>()
        every { prop.id } returns mockk()
        every { proposalService.getAllProposals() }
        every { archiveService.findByPropId(any()) } returns emptyList()
        mockMvc.perform(get("/API/thesis/proposals/search-text")
            .with(user(username).roles("Student"))
        )
    }
    @Test
    fun `searchProposals with query`() {
        val studentId = "s123456"
        val query= "image"
        val username="$studentId@example.com"
        val prop= mockk<ProposalDTO>()
        every { prop.id } returns mockk()
        every { proposalService.searchProposals(any()) } returns listOf(prop)
        every { archiveService.findByPropId(any()) } returns emptyList()
        mockMvc.perform(get("/API/thesis/proposals/search-text?query=$query")
            .with(user(username).roles("Student"))
        )
    }

    @Test
    fun searchProposalsByStudentCds() {
        val studentId = "s123456"
        val username="$studentId@example.com"
        val prop= mockk<ProposalDTO>()
        every { prop.id } returns mockk()
        every { proposalService.searchProposalByStudentCds(any(), any()) } returns listOf(prop)
        every { archiveService.findByPropId(any()) } returns emptyList()

        mockMvc.perform(get("/API/thesis/proposals/search/$studentId")
            .with(user(username).roles("Student"))
        )
    }
    @Test
    fun `searchProposalsByStudentCds with query`() {
        val studentId = "s123456"
        val query= "image"
        val username="$studentId@example.com"
        val prop= mockk<ProposalDTO>()
        every { prop.id } returns mockk()
        every { proposalService.searchProposalByStudentCds(any(), any()) } returns listOf(prop)
        every { archiveService.findByPropId(any()) } returns emptyList()

        mockMvc.perform(get("/API/thesis/proposals/search/$studentId?query=$query")
            .with(user(username).roles("Student"))
        )
            .andExpect(status().isOk)
    }

    /*@Test
    fun copyProposal() {
        val proposalId = UUID.randomUUID()
        val username="p101@example.com"
        val prop= mockk<Proposal>()
        val date = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val propDTO = ProposalDTO(UUID.randomUUID(), "", mockk<Teacher>(), listOf(""),
        listOf(""), listOf(""), listOf(""), "", "", "", date, "", listOf("")
        )
        val mockProposal = Proposal("Advanced algorithms for image processing",
            Teacher("", ""),
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "Company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            date,
            "MSc",
            "Computer Engineering, Civil Engineering")

        every { prop.id } returns mockk()
        every { proposalService.copyProposal(any()) } returns mockProposal
        every { prop.toDTO() } returns propDTO

        mockMvc.perform(
            post("/API/thesis/proposals/copy/$proposalId")
            .with(user(username).roles("Professor"))
                .with(csrf())
        )
            .andExpect(status().isCreated)
    }*/


    private fun mockAuthentication(isAuthenticated: Boolean, name: String): Authentication {
        val authentication = mockk<Authentication>()
        every { authentication.isAuthenticated } returns isAuthenticated
        every { authentication.name } returns name
        return authentication
    }

}