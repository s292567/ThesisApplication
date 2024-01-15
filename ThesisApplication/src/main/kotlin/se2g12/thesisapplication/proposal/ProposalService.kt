package se2g12.thesisapplication.proposal
import java.util.*


interface ProposalService {
    fun getProposalByProfessorId(supervisorId: String):List<ProposalDTO>
    fun updateProposal(newProposal: NewProposalDTO,professorId : String,oldName:String,old: Proposal):ProposalDTO
    fun addNewProposal(newProposal: NewProposalDTO, professorId: String)
    fun getAllProposals(): List<ProposalDTO>
    fun getProposalById(proposalId: UUID): Proposal
    fun getProposalsByCds(cds: String): List<ProposalDTO>
    fun searchProposals(query: String): List<ProposalDTO>
    fun deleteProposalById(proposalId: UUID)
    fun copyProposal(proposalId: UUID): Proposal
    fun searchProposalByStudentCds(studentId: String, query: String? ): List<ProposalDTO>

    fun getDistinctSupervisors(): List<String>
    fun findDistinctSupervisors(): List<String>

    fun findDistinctCoSupervisors(): List<String>

    fun findDistinctProposalTypes(): List<String>

    fun findDistinctProposalLevels(): List<String>

    fun findDistinctProposalKeywords(): List<String>

    fun findDistinctProposalGroups(): List<String>

    fun findDistinctProposalCds(): List<String>

}

