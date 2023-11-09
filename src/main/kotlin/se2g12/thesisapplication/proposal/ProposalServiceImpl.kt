package se2g12.thesisapplication.proposal

import org.springframework.stereotype.Service

@Service
class ProposalServiceImpl (private val proposalRepository: ProposalRepository) : ProposalService{
    override fun addNewProposal(newProposal: NewProposalDTO) {
//        TODO("Not yet implemented")
//      TODO("check auth")
        newProposal.checkBody()

        proposalRepository.save(newProposal.toProposal())
    }
}