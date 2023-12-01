package se2g12.thesisapplication.application

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.proposal.Proposal
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

class ApplicationServiceImplTest {

    private val studentRepository = mockk<StudentRepository>()
    private val proposalRepository = mockk<ProposalRepository>()
    private val applicationRepository = mockk<ApplicationRepository>()
    private val archiveRepository = mockk<ArchiveRepository>()

    private val applicationService = ApplicationServiceImpl(applicationRepository, proposalRepository, studentRepository, archiveRepository)
    private val mockProposal = mockk<Proposal>()

    @Test
    fun `test addNewApplication successful`() {
        val uuid=UUID.randomUUID()
        val studentId="s123456"
        // Arrange
        val newApplication = NewApplicationDTO(studentId, uuid)
        val student = Student(surname = "Rossi", name =  "Mario")

        every { studentRepository.findById(newApplication.studentId) } returns Optional.of(student)
        every { proposalRepository.findById(newApplication.proposalId) } returns Optional.of(mockProposal)
        every { applicationRepository.save(any()) } returns mockk()

        val application=Application(student, mockProposal, "pending")
        // Act
        applicationService.addNewApplication(newApplication)

        verify (exactly = 1) { applicationRepository.save(application) }
        // Assert
        // You can add assertions for the expected behavior after a successful application
    }

    @Test
    fun `test addNewApplication proposalNotFound`() {

        val uuid=UUID.randomUUID()
        val studentId="s123456"
        val newApplication = NewApplicationDTO(studentId, uuid)

        every { studentRepository.findById(newApplication.studentId) } returns Optional.of(Student())
        every { proposalRepository.findById(newApplication.proposalId) } returns Optional.empty()

        // Act and Assert
        assertThrows<ProposalNotFoundError> {
            applicationService.addNewApplication(newApplication)
        }
        verify (exactly = 0) { applicationRepository.save(any()) }
    }

    // Add more tests for other error cases if needed
    @Test
    fun `Get all applications for proposal by ID - Success`() {
        // Mocked proposal ID
        val proposalId = UUID.randomUUID()

        // Mocked result
        val mockedApplications = listOf(ApplicationDTO(
            id = UUID.randomUUID(),
            studentId = 1.toString(),
            proposalId,
            status = "pending"
        ))

}}