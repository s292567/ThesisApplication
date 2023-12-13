package se2g12.thesisapplication.application

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.proposal.toDTO
import se2g12.thesisapplication.student.StudentDTO
import java.util.UUID

@RestController
@CrossOrigin
class ApplicationController(private val applicationService: ApplicationService,private val proposalRepository: ProposalRepository) {

    @PostMapping("/API/thesis/proposals/apply")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewApplication(@RequestBody obj: NewApplicationDTO){
        applicationService.addNewApplication(obj)
    }

    @PatchMapping("/API/thesis/applications/{professorId}")
    fun updateApplication(@PathVariable professorId: String, @RequestBody application: ApplicationStatus){
        updateApplicationByProposalAndStudent(application)

        // if another status is passed, do nothing
    }
    private fun updateApplicationById(professorId: String, application: ApplicationDTO){
        if (professorId !== applicationService.getApplicationProposalSupervisorId(application.id!!))
            throw UnauthorizedProfessorError("Cannot operate on applications to proposals of other professors")
        if (application.status == "accepted") {
            applicationService.acceptApplication(application.id!!)
        }else if (application.status == "declined") {
            applicationService.declineApplication(application.id!!)
        }
    }
    private fun updateApplicationByProposalAndStudent(application: ApplicationStatus){
        /*if (professorId !== applicationService.getApplicationProposalSupervisorId(application.id!!))
            throw UnauthorizedProfessorError("Cannot operate on applications to proposals of other professors")
        */

        if (application.status == "accepted") {
            applicationService.acceptApplicationByProposalAndStudent(application.proposalId, application.studentId)
        }else if (application.status == "declined") {
            applicationService.declineApplicationByProposalAndStudent(application.proposalId, application.studentId)
        }
    }
    @GetMapping("/API/thesis/applications/students")
    @PreAuthorize("hasRole('Professor')")
    fun getAllApplyingStudentsForProposal(@RequestParam proposalId: UUID) : List<StudentDTO> {
        return applicationService.getAllApplyingStudentsForProposalById(UUID.fromString(proposalId.toString()))
    }

    @GetMapping("/API/thesis/applications/by")
    @PreAuthorize("hasRole('Professor')")
    fun getAllApplicationsForProposal(@RequestParam proposalId: UUID) : List<ApplicationDTO> {
        return applicationService.getAllApplicationsForProposalById(UUID.fromString(proposalId.toString()))
    }

    @GetMapping("/API/thesis/applications/student/{studentId}")
    @PreAuthorize("hasRole('Student')")
    fun getApplicationsForLoggedInStudent(@PathVariable studentId: String): List<ApplicationDTOprop> {
        return applicationService.getApplicationsForStudent(studentId).map{
            ApplicationDTOprop(id=it.id,studentId=it.studentId, proposal = proposalRepository.getReferenceById(it.proposalId!!).toDTO(), status = it.status)
        }
    }
}