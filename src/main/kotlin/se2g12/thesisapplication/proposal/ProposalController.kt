package se2g12.thesisapplication.proposal

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
class ProposalController(@Autowired private val proposalService: ProposalService) {

    //getAll
        @GetMapping("/API/thesis/proposals/all")
    fun getAllProposals(): List<ProposalDTO> {
        return proposalService.getAllProposals()
    }

    //getByCds
    @GetMapping("API/thesis/proposals/cds")
    fun getProposalsByCds(@RequestParam cds: String): List<ProposalDTO> {
        return proposalService.getProposalsByCds(cds)
    }

    // search input string across all fields
    @GetMapping("API/thesis/proposals/search")
    fun searchProposals(
        @RequestParam(required = false) query: String?,
    ): List<ProposalDTO> {
        // if query null => return all proposals
        if (query.isNullOrBlank()) {
            return proposalService.getAllProposals()
        }

        // else, search across multiple fields
        return proposalService.searchProposals(query)
    }

    //text search - OLD VERSION
//    @GetMapping("/proposals")
//    fun searchProposals(
//        @RequestParam(required = false) title: String?,
//        @RequestParam(required = false) supervisorName: String?,
//        @RequestParam(required = false) coSupervisors: String?,
//        @RequestParam(required = false) keywords: String?,
//        @RequestParam(required = false) cds: String?,
//        @RequestParam(required = false) level: String?,
//        @RequestParam(required = false) description: String?,
//    ): List<Proposal> {
//        // If needed implement logic here to call the appropriate service methods based on the provided parameters
//        return when {
//            title != null -> proposalService.searchProposalsByTitle(title)
//            supervisorName != null -> proposalService.searchProposalsBySupervisorName(supervisorName)
//            coSupervisors != null -> proposalService.searchProposalsBycoSupervisors(coSupervisors)
//            keywords != null -> proposalService.searchProposalsByKeywords(keywords)
//            cds != null -> proposalService.searchProposalsByCds(cds)
//            level != null -> proposalService.searchProposalsByLevel(level)
//            description != null -> proposalService.searchProposalsByDescription(description)
//            else -> emptyList()
//        }
//    }

}
