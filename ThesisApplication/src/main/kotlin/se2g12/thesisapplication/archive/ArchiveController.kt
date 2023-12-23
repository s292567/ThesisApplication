package se2g12.thesisapplication.archive

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import se2g12.thesisapplication.proposal.ProposalDTO
import se2g12.thesisapplication.proposal.ProposalService
import se2g12.thesisapplication.proposal.toDTO
import java.util.*

@RestController
@CrossOrigin
class ArchiveController(private val archiveService: ArchiveService,private val proposalService: ProposalService) {
    //getArchivedPropId Test Endpoint
    @GetMapping("/API/thesis/archive/getAllArchivedForLoggedInProf/")
    @PreAuthorize("hasRole('Professor')")
    fun getArchived(): List<ProposalDTO> {
        val archive=archiveService.getAll().map{it.proposal.toDTO()}

        val securityContext = SecurityContextHolder.getContext()
// Get the authentication object from the security context
        val authentication = securityContext.authentication

// Check if the user is authenticated
        return if (authentication != null && authentication.isAuthenticated) {
            proposalService.getProposalByProfessorId(authentication.name.split("@")[0]).filter{archive.contains(it)}
        } else
            emptyList()
    }
}