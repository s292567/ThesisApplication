package se2g12.thesisapplication.application

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.file.FileService
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.proposal.toDTO
import se2g12.thesisapplication.student.StudentDTO
import java.util.UUID

@RestController
@CrossOrigin
class ApplicationController( private val applicationService: ApplicationService, private val proposalRepository: ProposalRepository) {

    @PostMapping("/API/thesis/proposals/apply")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('Student')")
    fun addNewApplication(@RequestBody obj: NewApplicationDTO){
        val username=SecurityContextHolder.getContext().authentication.name
        if(username.contains(obj.studentId))
        applicationService.addNewApplication(obj)
        else
            throw Exception("cant add application for other")
    }



    @PatchMapping("/API/thesis/applications/{professorId}")
    fun updateApplication(@PathVariable professorId: String, @RequestBody application: ApplicationStatus){
        updateApplicationByProposalAndStudent(application)
    }

    private fun updateApplicationByProposalAndStudent(application: ApplicationStatus){


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
            ApplicationDTOprop(id=it.id,studentId=it.studentId, proposal = proposalRepository.getReferenceById(it.proposalId!!).toDTO(), status = it.status,fileId = it.fileId,fileName=it.fileName)
        }
    }
}