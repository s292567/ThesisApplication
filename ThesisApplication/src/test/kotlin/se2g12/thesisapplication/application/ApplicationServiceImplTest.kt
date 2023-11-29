package se2g12.thesisapplication.application

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.assertThrows
import se2g12.thesisapplication.proposal.Proposal
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import java.text.SimpleDateFormat
import java.util.*

class ApplicationServiceImplTest {

    private val studentRepository = mockk<StudentRepository>()
    private val proposalRepository = mockk<ProposalRepository>()
    private val applicationRepository = mockk<ApplicationRepository>()

    private val applicationService = ApplicationServiceImpl(applicationRepository, proposalRepository, studentRepository)

    @Test
    fun `test addNewApplication successful`() {
        val uuid=UUID.randomUUID()
        val email="s123456@example.com"
        // Arrange
        val newApplication = NewApplicationDTO(email, uuid)
        val student = Student(surname = "Rossi", name =  "Mario", email = email)
        val proposal = Proposal("Advanced algorithms for image processing",
            Teacher("Ferrari", "Luca"),
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "in external company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            SimpleDateFormat("yyyy-MM-dd").parse("2024-04-23"),
            "MSc",
            "Computer Engineering, Civil Engineering")

        every { studentRepository.findByEmail(newApplication.studentId) } returns listOf(student)
        every { proposalRepository.findById(newApplication.proposalId) } returns Optional.of(proposal)
        every { applicationRepository.save(any()) } returns mockk()

        val application=Application(student, proposal, "pending")
        // Act
        applicationService.addNewApplication(newApplication)

        verify (exactly = 1) { applicationRepository.save(application) }
        // Assert
        // You can add assertions for the expected behavior after a successful application
    }

    @Test
    fun `test addNewApplication proposalNotFound`() {

        val uuid=UUID.randomUUID()
        val email="s123456@example.com"
        val newApplication = NewApplicationDTO(email, uuid)

        every { studentRepository.findByEmail(newApplication.studentId) } returns listOf(Student())
        every { proposalRepository.findById(newApplication.proposalId) } returns Optional.empty()

        // Act and Assert
        assertThrows<ProposalNotFoundError> {
            applicationService.addNewApplication(newApplication)
        }
        verify (exactly = 0) { applicationRepository.save(any()) }
    }

    // Add more tests for other error cases if needed

}