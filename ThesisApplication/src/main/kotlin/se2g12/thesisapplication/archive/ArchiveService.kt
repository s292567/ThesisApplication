package se2g12.thesisapplication.archive

import se2g12.thesisapplication.proposal.Proposal
import java.util.UUID

interface ArchiveService {
    fun findByPropId(proposalId:UUID):List<Archive>
}