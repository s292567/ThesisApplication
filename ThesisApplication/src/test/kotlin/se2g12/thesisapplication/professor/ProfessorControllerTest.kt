package se2g12.thesisapplication.professor

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import se2g12.thesisapplication.proposal.*
import se2g12.thesisapplication.security.JwtAuthConverterProperties
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*


/*@WebMvcTest(ProfessorController::class)
class ProfessorControllerTest(@Autowired val mockMvc: MockMvc) {

    @MockBean
    private lateinit var proposalService: ProposalService
    @MockBean
    private lateinit var proposalRepository: ProposalRepository
    @MockBean
    private lateinit var teacherRepository: TeacherRepository
    @MockBean
    private lateinit var jwtAuthConverterProperties: JwtAuthConverterProperties
    private lateinit var mockProposal: Proposal
    private lateinit var mockNewProposal: NewProposalDTO
    private lateinit var myJson: String

    @BeforeEach
    fun setUp() {
        // You can perform additional setup if needed
        proposalService = mockk()
        proposalRepository = mockk()
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
    fun testAddNewProposal() {
        val professorId = "p101"
        every { proposalService.addNewProposal(mockNewProposal, professorId) } returns Unit

        mockMvc.perform(post("/API/thesis/proposals/$professorId")
            .contentType(MediaType.APPLICATION_JSON)
            .content(myJson)
            .with(user("$professorId@example.com").roles("Professor"))
        )
//            .andExpect(status().isCreated)
    }
    @Test
    fun testUpdateProposal() {
        val proposalId = UUID.randomUUID()
        val newProposalDTO = mockk<NewProposalDTO>()

        val oldProposal = mockProposal
        every { proposalRepository.findById(proposalId) } returns Optional.of(oldProposal)
        every { proposalService.updateProposal(newProposalDTO, any(), any(), oldProposal) } returns mockk()

        mockMvc.perform(put("/API/thesis/proposals/update/$proposalId")
            .with(user("p101@example.com").roles("Professor"))
            .contentType(MediaType.APPLICATION_JSON)
            .content(myJson)
        )
//            .andExpect(status().isCreated)
    }
    @Test
    fun getProposalByProfessorId() {
        val professorId = "p101"
        val proposals = listOf(mockProposal.toDTO())
        every { proposalService.getProposalByProfessorId(professorId) } returns proposals

        mockMvc.perform(get("/API/thesis/proposals/getProfessorProposals/$professorId")
            .with(user("$professorId@example.com").roles("Professor"))
        )
            .andExpect(status().isOk)
    }
}*/