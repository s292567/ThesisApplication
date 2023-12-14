package se2g12.thesisapplication.archive

import org.springframework.stereotype.Service
import java.util.*
@Service
class ArchiveServiceImpl(private val archiveRepository: ArchiveRepository):ArchiveService {
    override fun findByPropId(proposalId: UUID): List<Archive> {
        return archiveRepository.findByProposalId(proposalId)
    }
}