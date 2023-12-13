package se2g12.thesisapplication.proposal

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ProposalDateCheckTest {

    @Autowired
    lateinit var teacherRepository: TeacherRepository

    @Autowired
    lateinit var archiveRepository: ArchiveRepository

    @Autowired
    lateinit var proposalRepository: ProposalRepository

    @Autowired
    lateinit var proposalDateCheck: ProposalDateCheck

    @Test
    fun testCheckForMyDateChanges() {
        // Mock a specific date
        val date = LocalDate.of(2023, 12, 31)
        val localDate: LocalDate = LocalDate.parse("2020-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))

        // Mock proposalRepository and archiveRepository behaviors as needed
        var teacher = Teacher("Ferrari", "Luca", "p101@example.com", GroupDep("G13"),id="p101")
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
        proposalRepository.save(proposal)

        // Run the method to be tested
        proposalDateCheck.checkForMyDateChanges(date)

        // Verify other conditions as needed
        val archived = archiveRepository.findAll().filter{it.proposal.title.compareTo(proposal.title)==0 }
        Assertions.assertEquals("Sample Proposal Late", archived.first().proposal.title)
        // Add more specific assertions based on your requirements
    }
}
