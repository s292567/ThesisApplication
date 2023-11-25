package se2g12.thesisapplication.proposal

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.util.Date

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
//    @PreAuthorize("hasRole('Student')")
    fun getProposalsByCds(@RequestParam cds: String): List<ProposalDTO> {
        return proposalService.getProposalsByCds(cds)
    }

    // search input string across all fields
    @GetMapping("API/thesis/proposals/search")
//    @PreAuthorize("hasRole('Student') or hasRole('Professor')")
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

    @GetMapping("/API/thesis/proposals/search/{studentId}")
//    @PreAuthorize("hasRole('Student')")
    fun searchProposalsByStudentCds(
        @RequestParam(required = false) query: String?,
        @PathVariable studentId: String
    ): List<ProposalDTO> {
        return proposalService.searchProposalByStudentCds(studentId, query)
    }

    @GetMapping("/API/thesis/proposals/search-with-filters")
    @PreAuthorize("hasRole('Student') or hasRole('Professor')")
    fun searchProposalsWithFilters(
        @RequestParam(required = false) supervisorName: String?,
        @RequestParam(required = false) coSupervisors: String?,
        @RequestParam(required = false) keywords: String?,
        @RequestParam(required = false) types: String?,
        @RequestParam(required = false) groups: String?,
        @RequestParam(required = false) cds: String?,
        @RequestParam(required = false) query: String?,
        @RequestParam(required = false) startDate: Date?,
        @RequestParam(required = false) endDate: Date?
    ): List<ProposalDTO> {
        return proposalService.searchProposalsWithFilters(
            supervisorName,
            coSupervisors,
            keywords,
            types,
            groups,
            cds,
            query,
            startDate,
            endDate
        )
    }

    @PostMapping("/API/thesis/proposals/search-custom")
    @PreAuthorize("hasRole('Student') or hasRole('Professor')")
    fun searchProposalsCustom(
        @RequestBody filterCriteria: ProposalFilterCriteria
    ): List<ProposalDTO> {
        val list = proposalService.getAllProposals()
        println("Received filter criteria: $filterCriteria")
        println("Original List Size: ${list.size}")

        val filteredList = list
            .filter { proposal ->
                println("Filtering by Supervisor: ${filterCriteria.supervisor}")
                println("Proposal supervisor: ${proposal.supervisor}")
                val matches = filterCriteria.supervisor.isNullOrBlank() ||
                        (proposal.supervisor.name + " " + proposal.supervisor.surname)
                            .equals(filterCriteria.supervisor, ignoreCase = true)
                println("Matches criteria? $matches")
                matches
            }
            .filter { proposal ->
                println("Filter criteria co-supervisors: ${filterCriteria.coSupervisors}")

                val matches = filterCriteria.coSupervisors.isNullOrEmpty() ||
                        proposal.coSupervisors?.any {
                            filterCriteria.coSupervisors.contains(it)
                        } ?: false

                println("Matches criteria? $matches")

                matches
            }
            .filter { proposal ->
                println("Filtering by Keywords: ${filterCriteria.keywords}")
                println("Proposal keywords: ${proposal.keywords}")
                val matches = filterCriteria.keywords.isNullOrEmpty() ||
                        proposal.keywords?.any { filterCriteria.keywords.contains(it) } ?: false
                println("Matches criteria? $matches")
                matches
            }
            .filter { proposal ->
                println("Filtering by Types: ${filterCriteria.types}")
                println("Proposal types: ${proposal.type}")
                val matches = filterCriteria.types.isNullOrEmpty() ||
                        proposal.type?.any { filterCriteria.types.contains(it) } ?: false
                println("Matches criteria? $matches")
                matches
            }
            .filter { proposal ->
                println("Filtering by Groups: ${filterCriteria.groups}")
                println("Proposal groups: ${proposal.groups}")
                val matches = filterCriteria.groups == null ||
                        filterCriteria.groups.isEmpty() ||
                        proposal.groups?.any { filterCriteria.groups.contains(it) } ?: false
                println("Matches criteria? $matches")
                matches
            }
            .filter { proposal ->
                println("Filtering by CDS: ${filterCriteria.cds}")
                println("Proposal cds: ${proposal.cds}")
                val matches = filterCriteria.cds.isNullOrEmpty() ||
                        proposal.cds?.any { filterCriteria.cds.contains(it) } ?: false
                println("Matches criteria? $matches")
                matches
            }
            .filter { proposal ->
                println("Filtering by Query String: ${filterCriteria.queryString}")
                filterCriteria.queryString.isNullOrBlank() ||
                        proposal.title.contains(filterCriteria.queryString, ignoreCase = true) ||
                        proposal.description.contains(filterCriteria.queryString, ignoreCase = true) ||
                        proposal.notes?.contains(filterCriteria.queryString, ignoreCase = true) ?: false ||
                        proposal.requiredKnowledge?.contains(filterCriteria.queryString, ignoreCase = true) ?: false
            }
            .filter { proposal ->
                println("Filtering by Date Range: startDate=${filterCriteria.startDate}, endDate=${filterCriteria.endDate}")
                val proposalExpiration = proposal.expiration
                val currentDate = LocalDate.now()
                val endDateValue = filterCriteria.endDate
                println("Proposal Expiration: $proposalExpiration, Current Date: $currentDate, End Date Value: $endDateValue")

                if (endDateValue != null) {
                    proposalExpiration >= filterCriteria.startDate && proposalExpiration <= endDateValue
                } else {
                    // If endDate is null, there's no upper limit for the expiration date
                    proposalExpiration >= filterCriteria.startDate
                }
            }
            .toList()

        println("Final List Size: ${filteredList.size}")

        return filteredList
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

        @GetMapping("/API/thesis/proposals/supervisors")
        fun getDistinctSupervisorNames(): List<String> {
            return proposalService.getDistinctSupervisors()
        }

        @GetMapping("/API/thesis/proposals/coSupervisors")
        fun getDistinctCoSupervisors(): List<String> {
            return proposalService.getDistinctCoSupervisors()
                .flatMap { it.split(", ") }
                .distinct()
        }

        @GetMapping("/API/thesis/proposals/types")
        fun getDistinctProposalTypes(): List<String> {
            return proposalService.getDistinctProposalTypes()
                .flatMap { it.split(", ") }
                .distinct()
        }

        @GetMapping("/API/thesis/proposals/levels")
        fun getDistinctProposalLevels(): List<String> {
            return proposalService.getDistinctProposalLevels()
        }

        @GetMapping("/API/thesis/proposals/keywords")
        fun getDistinctProposalKeywords(): List<String> {
            return proposalService.getDistinctProposalKeywords()
                .flatMap { it.split(", ") }
                .distinct()
        }

        @GetMapping("/API/thesis/proposals/groups")
        fun getDistinctProposalGroups(): List<String> {
            return proposalService.getDistinctProposalGroups()
                .flatMap { it.split(", ") }
                .distinct()
        }

        @GetMapping("/API/thesis/proposals/degrees")
        fun getDistinctProposalCds(): List<String> {
            return proposalService.getDistinctProposalCds()
                .flatMap { it.split(", ") }
                .distinct()
        }

    }


