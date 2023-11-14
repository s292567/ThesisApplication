package se2g12.thesisapplication.application

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.text.SimpleDateFormat
import java.util.*


@Service
class ApplicationServiceImpl (
    private val applicationRepository: ApplicationRepository,
    private val proposalRepository: ProposalRepository,
    private val studentRepository: StudentRepository
)
    : ApplicationService {
    //@PreAuthorize("hasRole('Student')")
    override fun addNewApplication(newApplication: NewApplicationDTO) {
        val student=studentRepository.findById(newApplication.studentId).get()
        // check with auth
        val proposal=proposalRepository.findById(newApplication.proposalId)
        if (proposal.isEmpty)
            throw ProposalNotFoundError("Proposal ${newApplication.proposalId} not found")
        val application=Application(student, proposal.get(), "pending")
        applicationRepository.save(application)
    }

}