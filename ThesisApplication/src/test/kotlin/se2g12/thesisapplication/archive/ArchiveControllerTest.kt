package se2g12.thesisapplication.archive

import com.fasterxml.jackson.core.type.TypeReference
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
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.department.Department
import se2g12.thesisapplication.department.DepartmentRepository
import se2g12.thesisapplication.proposal.Proposal
import se2g12.thesisapplication.proposal.ProposalDTO
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.proposal.ProposalService
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
class ArchiveControllerTest {

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

    // 0 and 2 are archived; 1 is not
    lateinit var savedProposals: List<Proposal>
    lateinit var savedArchived: List<Archive>

    @BeforeAll
    fun init(){
        val department=departmentRepository.save(Department("DEP1"))

        val groupDep=groupDepRepository.save(GroupDep(id="G13",department = department))
        val localDate: LocalDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        var teacher = Teacher("Ferrari", "Luca", "p101@example.com",groupDep,id="p101")
        teacher= teacherRepository.save(teacher);
        var proposal = Proposal(
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
        var proposal2 = Proposal(
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
        var proposal3 = Proposal(
            title = "Sample Proposal Ver3",
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
        proposal=proposalRepository.save(proposal)
        proposal2=proposalRepository.save(proposal2)
        proposal3=proposalRepository.save(proposal3)
        savedProposals = listOf(proposal, proposal2, proposal3)
        savedArchived = archiveRepository.saveAll(listOf(Archive(proposal), Archive(proposal3)))
    }


    @WithMockUser(username = "p101@example.com", roles = ["Professor"])
    @Test
    fun `test getArchived endpoint successfully`() {
        val result = mockMvc.perform(
            MockMvcRequestBuilders.get("/API/thesis/archive/getAllArchivedForLoggedInProf/")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()
        val archivedProposals:List<ProposalDTO> = objectMapper.readValue(result.response.contentAsString, object : TypeReference<List<ProposalDTO>>() {})
        assertEquals(2, archivedProposals.size)
        assert(archivedProposals.all { it.title == savedProposals[0].title || it.title == savedProposals[2].title})
        assert(!archivedProposals.any { it.title == savedProposals[1].title})

    }
    @Test
    @WithMockUser(username = "testProfessor", roles = ["Professor"])
    fun testArchiveProposal() {


        val proposalId = savedProposals.first().id

        // Mocking behavior of thesisService
        // Here, you can mock the behavior according to your needs
        // For example: given(thesisService.archiveProposal(proposalId)).willReturn(/* Whatever you want to return */)

        mockMvc.perform(
            MockMvcRequestBuilders.post("/API/thesis/archive/{proposalId}", proposalId)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)

        // You can add more assertions based on your requirements
    }

}