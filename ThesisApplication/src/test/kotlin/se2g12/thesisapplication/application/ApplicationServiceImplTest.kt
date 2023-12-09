package se2g12.thesisapplication.application

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.assertThrows
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

        every { applicationRepository.findByStudentIdAndStatus(studentId, "accepted") } returns emptyList()
        every { applicationRepository.findByStudentIdAndProposalIdAndStatus(studentId,uuid, "pending") } returns emptyList()
        every { studentRepository.findById(newApplication.studentId) } returns Optional.of(student)
        every { proposalRepository.findById(newApplication.proposalId) } returns Optional.of(mockProposal)
        every { applicationRepository.save(any()) } returns mockk()

        val application=Application(student, mockProposal, "pending")
        // Act
        applicationService.addNewApplication(newApplication)

        verify (exactly = 1) { applicationRepository.save(application) }
    }

    @Test
    fun `test addNewApplication throws proposalNotFound`() {

        val uuid=UUID.randomUUID()
        val studentId="s123456"
        val newApplication = NewApplicationDTO(studentId, uuid)

        every { applicationRepository.findByStudentIdAndStatus(studentId, "accepted") } returns emptyList()
        every { applicationRepository.findByStudentIdAndProposalIdAndStatus(studentId,uuid, "pending") } returns emptyList()
        every { studentRepository.findById(newApplication.studentId) } returns Optional.of(Student())
        every { proposalRepository.findById(newApplication.proposalId) } returns Optional.empty()

        // Act and Assert
        assertThrows<ProposalNotFoundError> {
            applicationService.addNewApplication(newApplication)
        }
        verify (exactly = 0) { applicationRepository.save(any()) }
    }
    @Test
    fun `test addNewApplication throws studentNotFound`() {

        val uuid=UUID.randomUUID()
        val studentId="s123456"
        val newApplication = NewApplicationDTO(studentId, uuid)

        every { applicationRepository.findByStudentIdAndStatus(studentId, "accepted") } returns emptyList()
        every { applicationRepository.findByStudentIdAndProposalIdAndStatus(studentId,uuid, "pending") } returns emptyList()
        every { studentRepository.findById(newApplication.studentId) } returns Optional.empty()

        // Act and Assert
        assertThrows<StudentNotFoundError> {
            applicationService.addNewApplication(newApplication)
        }
        verify (exactly = 0) { applicationRepository.save(any()) }
    }
    @Test
    fun `test addNewApplication throws error when student already accepted`() {
        val uuid=UUID.randomUUID()
        val studentId="s123456"
        // Arrange
        val newApplication = NewApplicationDTO(studentId, uuid)
        val student = Student(surname = "Rossi", name =  "Mario")
        val presentApplication= Application(student, mockProposal, "accepted")

        every { applicationRepository.findByStudentIdAndStatus(studentId, "accepted") } returns listOf(presentApplication)

        assertThrows<ApplicationConflictError> {
            applicationService.addNewApplication(newApplication)
        }

        verify (exactly = 0) { applicationRepository.save(any()) }
    }
    @Test
    fun `test addNewApplication throws error when application already pending`() {
        val uuid=UUID.randomUUID()
        val studentId="s123456"
        // Arrange
        val newApplication = NewApplicationDTO(studentId, uuid)
        val student = Student(surname = "Rossi", name =  "Mario")
        val presentApplication= Application(student, mockProposal, "pending")

        every { applicationRepository.findByStudentIdAndStatus(studentId, "accepted") } returns emptyList()
        every { applicationRepository.findByStudentIdAndProposalIdAndStatus(studentId,uuid, "pending") } returns listOf(presentApplication)

        assertThrows<ApplicationConflictError> {
            applicationService.addNewApplication(newApplication)
        }

        verify (exactly = 0) { applicationRepository.save(any()) }
    }


    @Test
    fun `accept application with success`(){
        val applicationUUID = UUID.randomUUID()
        val studentId="s123456"
        val proposalId = UUID.randomUUID()
        val student = mockk<Student>()
        val mockApp = Application(student, mockProposal, "pending")

        every { applicationRepository.findById(applicationUUID) } returns Optional.of(mockApp)
        every { applicationRepository.updateStatusById(any(), any()) } returns mockk()
        every { applicationRepository.updateStatusByStudentId(any(), any()) } returns mockk()
        every { applicationRepository.updateStatusByProposalId(any(), any()) } returns mockk()
        every { archiveRepository.save(any()) } returns mockk()
        every { student.id } returns studentId
        every { mockProposal.id } returns proposalId

        applicationService.acceptApplication(applicationUUID)

        verify { applicationRepository.updateStatusById(applicationUUID, "accepted") }
        verify { applicationRepository.updateStatusByStudentId(studentId, "declined") }
        verify { applicationRepository.updateStatusByProposalId(proposalId, "declined") }
    }
    @Test
    fun `accept application with Not Found exception`(){
        val applicationUUID = UUID.randomUUID()
        val studentId="s123456"
        val proposalId = UUID.randomUUID()
        val student = mockk<Student>()
        val mockApp = Application(student, mockProposal, "pending")

        every { applicationRepository.findById(applicationUUID) } returns Optional.empty()

        assertThrows<ApplicationNotFoundError> {
            applicationService.acceptApplication(applicationUUID)
        }

        verify (exactly = 0){ applicationRepository.updateStatusById(applicationUUID, "accepted") }
        verify (exactly = 0){ applicationRepository.updateStatusByStudentId(studentId, "declined") }
        verify (exactly = 0){ applicationRepository.updateStatusByProposalId(proposalId, "declined") }
    }
    @Test
    fun `accept not modifiable application`(){
        val applicationUUID = UUID.randomUUID()
        val studentId="s123456"
        val proposalId = UUID.randomUUID()
        val student = mockk<Student>()
        val mockApp = Application(student, mockProposal, "accepted")

        every { applicationRepository.findById(applicationUUID) } returns Optional.of(mockApp)
        every { applicationRepository.updateStatusById(any(), any()) } returns mockk()
        every { applicationRepository.updateStatusByStudentId(any(), any()) } returns mockk()
        every { applicationRepository.updateStatusByProposalId(any(), any()) } returns mockk()
        every { archiveRepository.save(any()) } returns mockk()
        every { student.id } returns studentId
        every { mockProposal.id } returns proposalId

        assertThrows<NotModifiableApplicationError> {
            applicationService.acceptApplication(applicationUUID)
        }

        verify (exactly = 0) { applicationRepository.updateStatusById(applicationUUID, "accepted") }
        verify (exactly = 0) { applicationRepository.updateStatusByStudentId(studentId, "declined") }
        verify (exactly = 0) { applicationRepository.updateStatusByProposalId(proposalId, "declined") }
    }
    @Test
    fun `decline application with success`() {
        val applicationUUID = UUID.randomUUID()
        val studentId = "s123456"
        val proposalId = UUID.randomUUID()
        val student = mockk<Student>()
        val mockApp = Application(student, mockProposal, "pending")

        every { applicationRepository.findById(applicationUUID) } returns Optional.of(mockApp)
        every { applicationRepository.updateStatusById(any(), any()) } returns mockk()

        applicationService.declineApplication(applicationUUID)

        verify { applicationRepository.updateStatusById(applicationUUID, "declined") }
        verify(exactly = 0) { applicationRepository.updateStatusByStudentId(studentId, "declined") }
        verify(exactly = 0) { applicationRepository.updateStatusByProposalId(proposalId, "declined") }
    }
    @Test
    fun `decline application with Not Found exception`(){
        val applicationUUID = UUID.randomUUID()
        val studentId="s123456"
        val proposalId = UUID.randomUUID()

        every { applicationRepository.findById(applicationUUID) } returns Optional.empty()

        assertThrows<ApplicationNotFoundError> {
            applicationService.declineApplication(applicationUUID)
        }

        verify (exactly = 0){ applicationRepository.updateStatusById(applicationUUID, "accepted") }
        verify (exactly = 0){ applicationRepository.updateStatusByStudentId(studentId, "declined") }
        verify (exactly = 0){ applicationRepository.updateStatusByProposalId(proposalId, "declined") }
    }
}