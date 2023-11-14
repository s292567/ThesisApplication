import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import se2g12.thesisapplication.proposal.Proposal

@RestController
class ProposalController(@Autowired private val proposalService: ProposalService) {

    //getAll
    @GetMapping("/proposals/all")
    fun getAllProposals(): List<Proposal> {
        return proposalService.getAllProposals()
    }

    //getByCds
    @GetMapping("/proposals/cds")
    fun getProposalsByCds(@RequestParam cds: String): List<Proposal> {
        return proposalService.getProposalsByCds(cds)
    }

    //text search
    @GetMapping("/proposals")
    fun searchProposals(
        @RequestParam(required = false) title: String?,
        @RequestParam(required = false) supervisorName: String?,
        @RequestParam(required = false) coSupervisorName: String?,
        @RequestParam(required = false) keywords: String?,
        @RequestParam(required = false) cds: String?,
        @RequestParam(required = false) level: String?,
        @RequestParam(required = false) description: String?,
    ): List<Proposal> {
        // If needed implement logic here to call the appropriate service methods based on the provided parameters
        return when {
            title != null -> proposalService.searchProposalsByTitle(title)
            supervisorName != null -> proposalService.searchProposalsBySupervisorName(supervisorName)
            coSupervisorName != null -> proposalService.searchProposalsByCoSupervisorName(coSupervisorName)
            keywords != null -> proposalService.searchProposalsByKeywords(keywords)
            cds != null -> proposalService.searchProposalsByCds(cds)
            level != null -> proposalService.searchProposalsByLevel(level)
            description != null -> proposalService.searchProposalsByDescription(description)
            else -> emptyList()
        }
    }

}
