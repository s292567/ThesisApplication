package se2g12.thesisapplication.application

import java.util.UUID

data class NewApplicationDTO (
    var studentId:String,
    var proposalId:UUID,
)