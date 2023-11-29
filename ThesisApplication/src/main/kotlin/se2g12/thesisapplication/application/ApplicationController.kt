package se2g12.thesisapplication.application

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.student.StudentDTO
import java.util.UUID

@RestController
@CrossOrigin
class ApplicationController(private val applicationService: ApplicationService) {

    @PostMapping("/API/thesis/proposals/apply")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewApplication(@RequestBody obj: NewApplicationDTO){
        applicationService.addNewApplication(obj)
    }

    @PatchMapping("/API/thesis/applications/{professorId}")
    fun updateApplication(@PathVariable professorId: String, @RequestBody application: ApplicationDTO){
        if (professorId !== applicationService.getApplicationProposalSupervisorId(application.id))
            throw UnauthorizedProfessorError("Cannot operate on applications to proposals of other professors")
        if (application.status == "accepted") {
            applicationService.acceptApplication(application.id)
        }else if (application.status == "declined") {
            applicationService.declineApplication(application.id)
        }
        // if another status is passed, do nothing
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

    @GetMapping("/API/thesis/applications/student")
    @PreAuthorize("hasRole('Student')")
    fun getApplicationsForLoggedInStudent(@RequestParam studentId: String): List<ApplicationDTO> {
        SecurityContextHolder.getContext().authentication.principal
            return applicationService.getApplicationsForStudent(studentId)
    }
}