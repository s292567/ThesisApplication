package se2g12.thesisapplication.proposal


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

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

    // Find distinct supervisor names
    @Query("SELECT DISTINCT CONCAT(p.supervisor.name, ' ', p.supervisor.surname) FROM Proposal p")
    fun findDistinctSupervisors(): List<String>
    // Find distinct co-supervisor names
    @Query("SELECT DISTINCT unnest(string_to_array(p.coSupervisors, ', ')) AS coSup FROM Proposal p")
    fun findDistinctCoSupervisors(): List<String>

    // Find distinct proposal types
    @Query("SELECT DISTINCT unnest(string_to_array(p.type, ', ')) AS key FROM Proposal p")
    fun findDistinctProposalTypes(): List<String>

    // Find distinct proposal levels
    @Query("SELECT DISTINCT p.level FROM Proposal p")
    fun findDistinctProposalLevels(): List<String>

    // Find distinct proposal keywords
    @Query("SELECT DISTINCT unnest(string_to_array(p.keywords, ', ')) AS key FROM Proposal p")
    fun findDistinctProposalKeywords(): List<String>

    // Find distinct proposal groups
    @Query("SELECT DISTINCT unnest(string_to_array(p.groups, ', ')) AS grp FROM Proposal p")
    fun findDistinctProposalGroups(): List<String>

    // Find distinct proposal cds
    @Query("SELECT DISTINCT unnest(string_to_array(p.cds, ', ')) AS cds FROM Proposal p")
    fun findDistinctProposalCds(): List<String>

     //Find proposal by attribute - previous search implementation
    fun findByTitleContaining(title: String): List<Proposal>
    fun findBySupervisorNameContaining(supervisorName: String): List<Proposal>
    fun findBycoSupervisorsContaining(coSupervisors: String): List<Proposal>
    fun findByKeywordsContaining(keyword: String): List<Proposal>
    fun findByCdsContaining(cds: String): List<Proposal>
    fun findByLevelContaining(level: String): List<Proposal>
    fun findByDescriptionContaining(description: String): List<Proposal>
    // Case-insensitive search methods
    fun findByTitleIgnoreCaseContaining(title: String): List<Proposal>
    fun findBySupervisorNameIgnoreCaseContaining(supervisorName: String): List<Proposal>
    fun findBycoSupervisorsIgnoreCaseContaining(coSupervisors: String): List<Proposal>
    fun findByKeywordsIgnoreCaseContaining(keyword: String): List<Proposal>
    fun findByCdsIgnoreCaseContaining(cds: String): List<Proposal>
    fun findByLevelIgnoreCaseContaining(level: String): List<Proposal>
    fun findByDescriptionIgnoreCaseContaining(description: String): List<Proposal>

}