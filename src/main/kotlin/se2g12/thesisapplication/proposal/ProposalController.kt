package se2g12.thesisapplication.proposal

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class ProposalController(@Autowired private val proposalService: ProposalService) {

    //getAll
        @GetMapping("/API/thesis/proposals/all")
        @PreAuthorize("hasRole('Student') or hasRole('Professor')")
    fun getAllProposals(): List<ProposalDTO> {
        return proposalService.getAllProposals()
    }

    //getByCds
    @GetMapping("API/thesis/proposals/cds")
    @PreAuthorize("hasRole('Student')")
    fun getProposalsByCds(@RequestParam cds: String): List<ProposalDTO> {
        return proposalService.getProposalsByCds(cds)
    }

    // search input string across all fields
    @GetMapping("API/thesis/proposals/search")
    @PreAuthorize("hasRole('Student') or hasRole('Professor')")
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
    @GetMapping("API/thesis/proposals/search/{studentId}")
    @PreAuthorize("hasRole('Student')")
    fun searchProposalsByStudentCds(
        @RequestParam(required = false) query: String?,
        @PathVariable studentId : String
    ): List<ProposalDTO> {
        return proposalService.searchProposalByStudentCds(studentId, query)
    }

    //text search - OLD VERSION
//    @PostMapping("/API/thesis/proposals/filtered")
//    @PreAuthorize("hasRole('Student')")
//    fun searchProposals(@RequestBody searchRequest: SearchRequest): List<Proposal> {
//
//        var results = proposalService.getAllProposals()
//
//        if (searchRequest.title != null) {
//            results = filterByTitle(results, searchRequest.title)
//        }
//
//        if (searchRequest.supervisorName != null) {
//            results = filterBySupervisorName(results, searchRequest.supervisorName)
//        }
//
//        if (searchRequest.coSupervisors != null) {
//            results = filterByCoSupervisors(results, searchRequest.coSupervisors)
//        }
//
//        if (searchRequest.keywords != null) {
//            results = filterByKeywords(results, searchRequest.keywords)
//        }
//
//        if (searchRequest.cds != null) {
//            results = filterByCds(results, searchRequest.cds)
//        }
//
//        if (searchRequest.level != null) {
//            results = filterByLevel(results, searchRequest.level)
//        }
//
//        if (searchRequest.description != null) {
//            results = filterByDescription(results, searchRequest.description)
//        }
//
//        return results
//    }
//
//    fun filterByTitle(proposals: List<Proposal>, title: String) =
//        proposals.filter { it.title.contains(title) }


}
