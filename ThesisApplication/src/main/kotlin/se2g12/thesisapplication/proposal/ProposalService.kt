package se2g12.thesisapplication.proposal


interface ProposalService {
    fun addNewProposal(newProposal: NewProposalDTO, professorId: String)
    fun getAllProposals(): List<ProposalDTO>
    fun getProposalsByCds(cds: String): List<ProposalDTO>
    fun searchProposals(query: String): List<ProposalDTO>
    fun searchProposalByStudentCds(studentId: String, query: String? ): List<ProposalDTO>

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

