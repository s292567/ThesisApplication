package se2g12.thesisapplication.application

import org.springframework.web.multipart.MultipartFile
import java.util.UUID

data class NewApplicationDTO (
    var studentId:String,
    var proposalId:UUID,
    var file:MultipartFile?=null
)