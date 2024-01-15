package se2g12.thesisapplication.archive

import org.springframework.stereotype.Service
import se2g12.thesisapplication.proposal.Proposal
import java.util.*
@Service
class ArchiveServiceImpl(private val archiveRepository: ArchiveRepository):ArchiveService {
    override fun findByPropId(proposalId: UUID): List<Archive> {
        return archiveRepository.findByProposalId(proposalId)
    }
    override fun getAll(): List<Archive> {
        return archiveRepository.findAll()
    }
    override fun archiveProposal(proposal: Proposal) {
        val archive = Archive(proposal)
        archiveRepository.save(archive)
    }
}