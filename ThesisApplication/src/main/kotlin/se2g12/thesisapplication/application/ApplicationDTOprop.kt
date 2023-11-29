package se2g12.thesisapplication.application

import se2g12.thesisapplication.proposal.Proposal
import java.util.*

data class ApplicationDTOprop (
    var id: UUID,
    var studentId:String?,
    var proposal: Proposal,
    var status: String?
)

