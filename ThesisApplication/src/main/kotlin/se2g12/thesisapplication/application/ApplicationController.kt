package se2g12.thesisapplication.application

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import se2g12.thesisapplication.file.FileService
import se2g12.thesisapplication.proposal.ProposalRepository
import se2g12.thesisapplication.proposal.toDTO
import se2g12.thesisapplication.student.StudentDTO
import java.util.UUID

@RestController
@CrossOrigin
class ApplicationController( private val applicationService: ApplicationService, private val proposalRepository: ProposalRepository) {

    @PostMapping("/API/thesis/proposals/apply")
    @PreAuthorize("hasRole('Student')")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewApplication(
        @RequestParam proposalId: UUID,@RequestParam studentId: String,@RequestParam file:MultipartFile?
    ) {
        val newApplicationDTO=NewApplicationDTO(studentId,proposalId, file)

        if (newApplicationDTO.file != null && !newApplicationDTO.file!!.contentType.equals("application/pdf")) {
            throw Exception("File must be in .pdf format")
        }

        val username = SecurityContextHolder.getContext().authentication.name
        println(username)

        if (username.contains(newApplicationDTO.studentId)) {
            applicationService.addNewApplication(newApplicationDTO)
        } else {
            throw Exception("Cannot add application for another student")
        }
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