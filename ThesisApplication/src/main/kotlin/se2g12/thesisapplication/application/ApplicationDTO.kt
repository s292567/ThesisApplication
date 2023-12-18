package se2g12.thesisapplication.application

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.multipart.MultipartFile
import se2g12.thesisapplication.file.FileService
import java.util.UUID

data class ApplicationDTO (
    var id:UUID?,
    var studentId:String?,
    var proposalId:UUID?,
    var status: String?,
    var fileId:UUID?=null,
        var fileName:String?=null
)

fun Application.toDTO(): ApplicationDTO{
    return ApplicationDTO(this.id, this.student.id!!, this.proposal.id!!, this.status!!,this.fileID,this.fileName)
}
