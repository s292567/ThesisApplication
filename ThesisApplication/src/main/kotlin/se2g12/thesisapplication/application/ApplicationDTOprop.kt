package se2g12.thesisapplication.application

import se2g12.thesisapplication.proposal.ProposalDTO
import java.util.*

data class ApplicationDTOprop (
    var id: UUID?,
    var studentId:String?,
    var proposal: ProposalDTO,
    var status: String?
)

