import org.springframework.data.jpa.repository.JpaRepository
import se2g12.thesisapplication.proposal.Proposal
import java.util.UUID

interface ProposalRepository : JpaRepository<Proposal, UUID> {
    // Find all proposals
    override fun findAll(): List<Proposal>

    // Find all proposals of a specific CDS (user default filter)
    fun findByCds(cds: String): List<Proposal>


    // Find proposal by attribute
    fun findByTitleContaining(title: String): List<Proposal>
    fun findBySupervisorNameContaining(supervisorName: String): List<Proposal>
    fun findBycoSupervisorNameContaining(coSupervisorName: String): List<Proposal>
    fun findByKeywordsContaining(keyword: String): List<Proposal>
    fun findByCdsContaining(cds: String): List<Proposal>
    fun findByLevelContaining(level: String): List<Proposal>
    fun findByDescriptionContaining(description: String): List<Proposal>
}
