package se2g12.thesisapplication.file

import java.util.*

data class FileDTO (var id: UUID, var fileName: String?)
fun File.toDTO(): FileDTO {
    return FileDTO(this.fileId!!,this.fileName)
}