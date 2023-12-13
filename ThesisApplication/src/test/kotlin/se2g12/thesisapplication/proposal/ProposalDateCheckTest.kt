package se2g12.thesisapplication.proposal

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.date.Date
import se2g12.thesisapplication.teacher.Teacher
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@ExtendWith(MockitoExtension::class)
class ProposalDateCheckTest {
    private lateinit var proposalRepository: ProposalRepository
    private lateinit var archiveRepository: ProposalRepository
    private lateinit var proposalDateCheck: ProposalDateCheck

    @BeforeEach
    fun setUp() {
        proposalRepository = mockk()
        archiveRepository=mockk()
        proposalDateCheck=mockk()
    }
    @Test
    fun testCheckForMyDateChanges() {
        // Mock a specific date
        val date = LocalDate.of(2023, 12, 31)
        val localDate: LocalDate = LocalDate.parse("2020-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))

        // Mock proposalRepository and archiveRepository behaviors as needed

        val proposal = Proposal(
            title = "Sample Proposal Late",
            supervisor = Teacher("Ferrari", "Luca", "p101@example.com", GroupDep("G13")),
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

        every { proposalRepository.save(proposal) } returns mockk()
        // Run the method to be tested
        every { proposalDateCheck.checkForMyDateChanges(date)}returns mockk()
        every { archiveRepository.findAll() } returns mockk()
        // Verify other conditions as needed
        val archived = archiveRepository.findAll()

        Assertions.assertEquals("Sample Proposal Late", archived)
        // Add more specific assertions based on your requirements
    }
}
