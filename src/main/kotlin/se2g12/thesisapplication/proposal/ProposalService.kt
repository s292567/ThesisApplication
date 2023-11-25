package se2g12.thesisapplication.proposal

import java.util.*


interface ProposalService {
    fun addNewProposal(newProposal: NewProposalDTO, professorId: String)
    fun getAllProposals(): List<ProposalDTO>
    fun getProposalsByCds(cds: String): List<ProposalDTO>
    fun searchProposals(query: String): List<ProposalDTO>
    fun searchProposalByStudentCds(studentId: String, query: String? ): List<ProposalDTO>

    // filtered search
    fun searchProposalsWithFilters(
        supervisorName: String?,
        coSupervisors: String?,
        keywords: String?,
        types: String?,
        groups: String?,
        cds: String?,
        query: String?,
        startDate: Date?,
        endDate: Date?
    ): List<ProposalDTO>

    //attribute search
    fun searchProposalsByTitle(title: String): List<Proposal>
    fun searchProposalsBySupervisorName(supervisorName: String): List<Proposal>
    fun searchProposalsBycoSupervisors(coSupervisors: String): List<Proposal>
    fun searchProposalsByKeywords(keyword: String): List<Proposal>
    fun searchProposalsByCds(cds: String): List<Proposal>
    fun searchProposalsByLevel(level: String): List<Proposal>
    fun searchProposalsByDescription(description: String): List<Proposal>

    //case-insensitive attribute search
    fun searchProposalsByTitleIgnoreCase(title: String): List<Proposal>
    fun searchProposalsBySupervisorNameIgnoreCase(supervisorName: String): List<Proposal>
    fun searchProposalsBycoSupervisorsIgnoreCase(coSupervisors: String): List<Proposal>
    fun searchProposalsByKeywordsIgnoreCase(keywords: String): List<Proposal>
    fun searchProposalsByCdsIgnoreCase(cds: String): List<Proposal>
    fun searchProposalsByLevelIgnoreCase(level: String): List<Proposal>
    fun searchProposalsByDescriptionIgnoreCase(description: String): List<Proposal>


    fun getDistinctSupervisors(): List<String>
    // Retrieve distinct co-supervisor names
    fun getDistinctCoSupervisors(): List<String>

    // Retrieve distinct proposal types
    fun getDistinctProposalTypes(): List<String>

    // Retrieve distinct proposal levels
    fun getDistinctProposalLevels(): List<String>

    // Retrieve distinct proposal keywords
    fun getDistinctProposalKeywords(): List<String>

    // Retrieve distinct proposal groups
    fun getDistinctProposalGroups(): List<String>

    // Retrieve distinct proposal cds
    fun getDistinctProposalCds(): List<String>
}

