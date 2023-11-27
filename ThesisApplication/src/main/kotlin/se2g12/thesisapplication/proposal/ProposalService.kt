package se2g12.thesisapplication.proposal


interface ProposalService {
    fun updateProposal(newProposal: ProposalDTO,professorId : String):ProposalDTO
    fun addNewProposal(newProposal: NewProposalDTO, professorId: String)
    fun getAllProposals(): List<ProposalDTO>
    fun getProposalsByCds(cds: String): List<ProposalDTO>
    fun searchProposals(query: String): List<ProposalDTO>
    fun searchProposalByStudentCds(studentId: String, query: String? ): List<ProposalDTO>

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
}

