package se2g12.thesisapplication.proposal

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.util.*

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

    //default filtered search
    @PostMapping("/API/thesis/proposals/search-filtered")
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
    @PostMapping("/API/thesis/proposals/copy/{proposalId}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('Professor')")
    fun copyProposal(@PathVariable proposalId: UUID): ProposalDTO {
        val copiedProposal = proposalService.copyProposal(proposalId)
        return copiedProposal.toDTO()
    }
    @DeleteMapping("/API/thesis/proposals/delete/{proposalId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('Professor')")
    fun deleteProposal(@PathVariable proposalId: UUID) {
        proposalService.deleteProposalById(proposalId)
    }
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


