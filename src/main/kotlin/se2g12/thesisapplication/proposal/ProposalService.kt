package se2g12.thesisapplication.proposal


interface ProposalService {
    fun addNewProposal(newProposal: NewProposalDTO, professorId: String)
    fun getAllProposals(): List<ProposalDTO>
    fun getProposalsByCds(cds: String): List<ProposalDTO>
    fun searchProposals(query: String): List<ProposalDTO>
    fun searchProposalByStudentCds(studentId: String, query: String? ): List<ProposalDTO>

//    fun searchProposalsByTitle(title: String): List<Proposal>
//
//    fun searchProposalsBySupervisorName(supervisorName: String): List<Proposal>
//
//    fun searchProposalsBycoSupervisors(coSupervisors: String): List<Proposal>
//
//    fun searchProposalsByKeywords(keyword: String): List<Proposal>
//
//    fun searchProposalsByCds(cds: String): List<Proposal>
//
//    fun searchProposalsByLevel(level: String): List<Proposal>
//
//    fun searchProposalsByDescription(description: String): List<Proposal>
}
