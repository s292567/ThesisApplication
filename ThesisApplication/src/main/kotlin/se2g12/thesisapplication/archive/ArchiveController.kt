package se2g12.thesisapplication.archive

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.application.ApplicationService
import se2g12.thesisapplication.proposal.ProposalDTO
import se2g12.thesisapplication.proposal.ProposalService
import se2g12.thesisapplication.proposal.toDTO
import java.util.*

@RestController
@CrossOrigin
class ArchiveController(private val archiveService: ArchiveService,private val proposalService: ProposalService, private val applicationService: ApplicationService) {
    //getArchivedPropId Test Endpoint
    @GetMapping("/API/thesis/archive/getAllArchivedForLoggedInProf/")
    @PreAuthorize("hasRole('Professor')")
    fun getArchived(): List<ProposalDTO> {
        val archive=archiveService.getAll().map{it.proposal.toDTO()}
            val securityContext = SecurityContextHolder.getContext()
// Get the authentication object from the security context
            val authentication = securityContext.authentication

            val profThesis =proposalService.getProposalByProfessorId(authentication.name.split("@")[0])



// Check if the user is authenticated
        return if (authentication != null && authentication.isAuthenticated) {
            archive.filter { profThesis.contains(it) }
        }
        else
            emptyList()
    }
    @PostMapping("/API/thesis/archive/{proposalId}")
    @PreAuthorize("hasRole('Professor')")
    fun archiveProposal(@PathVariable proposalId: UUID) {
        // Retrieve the proposal by ID
        val proposal = proposalService.getProposalById(proposalId)

        // Archive the proposal
        archiveService.archiveProposal(proposal)

        // Delete all related applications
        applicationService.deleteApplicationsByProposalId(proposalId)
    }
}