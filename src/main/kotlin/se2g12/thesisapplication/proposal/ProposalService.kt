import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import se2g12.thesisapplication.proposal.Proposal
import java.util.UUID

@Service
class ProposalService(@Autowired private val proposalRepository: ProposalRepository) {
    //getAll
    fun getAllProposals(): List<Proposal> {
        return proposalRepository.findAll()
    }

    //getByCds
    fun getProposalsByCds(cds: String): List<Proposal> {
        return proposalRepository.findByCds(cds)
    }

    //searchByAttributes-----------------------
    fun searchProposalsByTitle(title: String): List<Proposal> {
        return proposalRepository.findByTitleContaining(title)
    }

    fun searchProposalsBySupervisorName(supervisorName: String): List<Proposal> {
        return proposalRepository.findBySupervisorNameContaining(supervisorName)
    }

    fun searchProposalsByCoSupervisorName(coSupervisorName: String): List<Proposal> {
        return proposalRepository.findBycoSupervisorNameContaining(coSupervisorName)
    }

    fun searchProposalsByKeywords(keyword: String): List<Proposal> {
        return proposalRepository.findByKeywordsContaining(keyword)
    }

    fun searchProposalsByCds(cds: String): List<Proposal> {
        return proposalRepository.findByCdsContaining(cds)
    }

    fun searchProposalsByLevel(level: String): List<Proposal> {
        return proposalRepository.findByLevelContaining(level)
    }

    fun searchProposalsByDescription(description: String): List<Proposal> {
        return proposalRepository.findByDescriptionContaining(description)
    }
    //------------------------------------------
}