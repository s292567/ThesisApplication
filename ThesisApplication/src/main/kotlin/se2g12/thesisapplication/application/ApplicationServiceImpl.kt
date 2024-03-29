package se2g12.thesisapplication.application

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.Mail.EmailService
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.file.FileService
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
    private val emailService: EmailService,
        private val fileService: FileService
)
    : ApplicationService {

    override fun addNewApplication(newApplication: NewApplicationDTO) {
        var file:UUID?=null
        if(newApplication.file!=null)
            file=fileService.addFile(newApplication.file!!)

        checkApplicationConflicts(newApplication.studentId, newApplication.proposalId)
        val student=studentRepository.findById(newApplication.studentId)
            .orElseThrow { StudentNotFoundError("Student ${newApplication.studentId} not found") }
        val proposal=proposalRepository.findById(newApplication.proposalId)
            .orElseThrow { ProposalNotFoundError("Proposal ${newApplication.proposalId} not found") }

        var application=Application(student, proposal, "pending",file, file?.let { fileService.getName(it) })
        application = applicationRepository.save(application)

        emailService.sendHtmlEmail(proposal.supervisor.email,application.toDTO())
    }
    private fun checkApplicationConflicts(studentId: String, proposalId: UUID){
        if (applicationRepository.findByStudentIdAndStatus(studentId, "accepted").isNotEmpty())
            throw ApplicationConflictError("You ($studentId) already have an accepted application.")
        if (applicationRepository.findByStudentIdAndProposalIdAndStatus(studentId, proposalId, "pending").isNotEmpty())
            throw ApplicationConflictError("You ($studentId) already have a pending application for this proposal." )
    }
    override fun declineApplication(applicationId: UUID) {
        val app=getModifiableApplication(applicationId)
        //notify declined student

        applicationRepository.updateStatusById(applicationId, "declined")
        app.status="declined"
        emailService.sendHtmlEmail(app.student.email,app.toDTO())
    }

    override fun acceptApplication(applicationId: UUID) {
        val app= getModifiableApplication(applicationId)
        applicationRepository.updateStatusById(applicationId ,"accepted")
        //notify accepted Student
        app.status="accepted"
        emailService.sendHtmlEmail(app.student.email,app.toDTO())
        // decline all student applications and notify them
        val app2=applicationRepository.getAllApplicationsByProposalId(app.proposal.id!!)
        app2.forEach {
            if(it.status?.compareTo("pending")==0 && it.id!!.compareTo(applicationId)!=0)
            {
                it.status="declined"
                emailService.sendHtmlEmail(app.student.email, it.toDTO())
            }
        }
        applicationRepository.updateStatusByStudentId(app.student.id!!, "declined")
        // decline all proposal applications
        applicationRepository.updateStatusByProposalId(app.proposal.id!!, "declined")
        // archive proposal
        archiveRepository.save(Archive(app.proposal))
    }

    override fun declineApplicationByProposalAndStudent(proposalId: UUID, studentId: String) {
        try {
            val appId=applicationRepository.findByProposalIdAndStudentId(proposalId, studentId).first().id
            declineApplication(appId!!)
        }
        catch (e: NoSuchElementException){
            throw ApplicationNotFoundError("Application by student $studentId for proposal $proposalId not found")
        }
    }

    override fun acceptApplicationByProposalAndStudent(proposalId: UUID, studentId: String) {
        try {
            val appId=applicationRepository.findByProposalIdAndStudentId(proposalId, studentId).first().id!!
            acceptApplication(appId)
        }
        catch (e: NoSuchElementException){
            throw ApplicationNotFoundError("Application by student $studentId for proposal $proposalId not found")
        }

    }

    private fun getModifiableApplication(applicationId: UUID): Application{
        val app= applicationRepository.findById(applicationId).orElseThrow { ApplicationNotFoundError("Application $applicationId not found") }
        if (app.status != "pending")
            throw NotModifiableApplicationError(applicationId, app.status!!)
        return app
    }
    override fun getApplicationProposalSupervisorId(applicationId: UUID): String {
        val app = applicationRepository.findById(applicationId).orElseThrow { ApplicationNotFoundError("Application $applicationId not found") }
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

    override fun deleteApplicationsByProposalId(proposalId: UUID) {
        val applications = applicationRepository.findByProposalId(proposalId)
        applicationRepository.deleteAll(applications)
    }

}