package se2g12.thesisapplication.application

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.Mail.EmailService
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.student.StudentDTO
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.student.toDTO
import java.util.*


@Service
@Transactional
class ApplicationServiceImpl (
    private val applicationRepository: ApplicationRepository,
    private val proposalRepository: ProposalRepository,
    private val studentRepository: StudentRepository,
    private val archiveRepository: ArchiveRepository,
    private val emailService: EmailService
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
        val app=getModifiableApplication(applicationId)
        //notify declined student
        emailService.sendHtmlEmail(app.student.email,"accepted")
        applicationRepository.updateStatusById(applicationId, "declined")
    }

    override fun acceptApplication(applicationId: UUID) {
        val app= getModifiableApplication(applicationId)
        applicationRepository.updateStatusById(applicationId ,"accepted")
        //notify accepted Student
        emailService.sendHtmlEmail(app.student.email,"accepted")
        // decline all student applications and notify them
        val app2=applicationRepository.getAllApplicationsByProposalId(app.proposal.id!!)
        app2.forEach {
            if(it.status?.compareTo("pending")==0)
                emailService.sendHtmlEmail(app.student.email,"declined")

        }
        applicationRepository.updateStatusByStudentId(app.student.id!!, "declined")
        // decline all proposal applications
        applicationRepository.updateStatusByProposalId(app.proposal.id!!, "declined")
        // archive proposal
        archiveRepository.save(Archive(app.proposal))
    }

    override fun declineApplicationByProposalAndStudent(proposalId: UUID, studentId: String) {

        var appId=applicationRepository.findByProposalIdAndStudentId(proposalId, studentId).first().id
        declineApplication(appId!!)
    }

    override fun acceptApplicationByProposalAndStudent(proposalId: UUID, studentId: String) {
        var appId=applicationRepository.findByProposalIdAndStudentId(proposalId, studentId).first().id
        acceptApplication(appId!!)
    }

    private fun getModifiableApplication(applicationId: UUID): Application{
        val app= applicationRepository.findById(applicationId).orElseThrow { ApplicationNotFoundError(applicationId) }
        if (app.status != "pending")
            throw NotModifiableApplicationError(applicationId, app.status!!)
        return app
    }
    override fun getApplicationProposalSupervisorId(applicationId: UUID): String {
        val app = applicationRepository.findById(applicationId).orElseThrow { ApplicationNotFoundError(applicationId) }
        return app.proposal.supervisor.id!!
    }

    /**
     * Get a list of all students that applied to a specific proposal
     */
    override fun getAllApplyingStudentsForProposalById(proposalId: UUID) : List<StudentDTO> {
        return studentRepository.getApplyingStudentsByProposalId(proposalId).map { it.toDTO() }
    }
    override fun getApplicationsForStudent(studentId: String): List<ApplicationDTO> {
        return applicationRepository.findByStudentId(studentId)
            .map { it.toDTO() }
    }

    /**
     * Get a list of all applications for a specific proposal
     */
    override fun getAllApplicationsForProposalById(proposalId: UUID) : List<ApplicationDTO> {
        return applicationRepository.getAllApplicationsByProposalId(proposalId).filter { it.status=="pending" }
            .map { it.toDTO() }
    }

}