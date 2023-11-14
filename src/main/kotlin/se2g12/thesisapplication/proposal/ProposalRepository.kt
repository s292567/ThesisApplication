package se2g12.thesisapplication.proposal


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface ProposalRepository : JpaRepository<Proposal, UUID> {
    // Find all proposals
    override fun findAll(): List<Proposal>

    // Find all proposals of a specific CDS (user default filter)
    fun findByCds(cds: String): List<Proposal>

    // query method for searching across multiple fields, case-insensitive!
    @Query("SELECT p FROM Proposal p WHERE " +
            "LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.supervisor.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.supervisor.surname) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.coSupervisors) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.keywords) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.type) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.groups) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.notes) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.cds) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.level) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    fun searchProposals(@Param("query") query: String): List<Proposal>

    // Find proposal by attribute
    fun findByTitleContaining(title: String): List<Proposal>
    fun findBySupervisorNameContaining(supervisorName: String): List<Proposal>
    fun findBycoSupervisorsContaining(coSupervisors: String): List<Proposal>
    fun findByKeywordsContaining(keyword: String): List<Proposal>
    fun findByCdsContaining(cds: String): List<Proposal>
    fun findByLevelContaining(level: String): List<Proposal>
    fun findByDescriptionContaining(description: String): List<Proposal>
}
