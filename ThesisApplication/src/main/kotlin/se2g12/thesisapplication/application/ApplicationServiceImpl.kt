package se2g12.thesisapplication.application

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.text.SimpleDateFormat
import java.util.*


@Service
@Transactional
class ApplicationServiceImpl (
    private val applicationRepository: ApplicationRepository,
    private val proposalRepository: ProposalRepository,
    private val studentRepository: StudentRepository,
    private val archiveRepository: ArchiveRepository
)
    : ApplicationService {

    override fun addNewApplication(newApplication: NewApplicationDTO) {
        val student=studentRepository.findById(newApplication.studentId).get()
        val proposal=proposalRepository.findById(newApplication.proposalId)
        if (proposal.isEmpty)
            throw ProposalNotFoundError("Proposal ${newApplication.proposalId} not found")
        val application=Application(student, proposal.get(), "pending")
        applicationRepository.save(application)
    }

    override fun declineApplication(applicationId: UUID) {
        val app= applicationRepository.findById(applicationId)
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
        archiveRepository.save(Archive(app.proposal))
    }

}