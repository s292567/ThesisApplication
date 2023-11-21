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
//        val student=studentRepository.findById(newApplication.studentId).get()
        val student=studentRepository.findByEmail(newApplication.studentId).first()
        // check with auth
        val proposal=proposalRepository.findById(newApplication.proposalId)
        if (proposal.isEmpty)
            throw ProposalNotFoundError("Proposal ${newApplication.proposalId} not found")
        val application=Application(student, proposal.get(), "pending")
        applicationRepository.save(application)
    }

    override fun declineApplication(applicationId: UUID) {
        val app= applicationRepository.findById(applicationId)
        // double check if exists
        applicationRepository.updateStatusById(applicationId, "declined")
    }

    override fun acceptApplication(applicationId: UUID) {
        val app= applicationRepository.findById(applicationId).get()
        applicationRepository.updateStatusById(applicationId ,"accepted")
        // decline all student applications
        applicationRepository.updateStatusByStudentId(app.student.id!!, "declined")
        // decline all proposal applications
        applicationRepository.updateStatusByProposalId(app.proposal.id!!, "declined")
        // archive proposal
        TODO("add active/archived status to proposals")
    }

}