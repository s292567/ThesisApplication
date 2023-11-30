package se2g12.thesisapplication.application

import java.util.UUID

data class ApplicationStatus (
    var studentId:String,
    var proposalId:UUID,
    var status: String
)

