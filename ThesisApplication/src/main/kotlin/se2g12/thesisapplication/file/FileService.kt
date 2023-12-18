package se2g12.thesisapplication.file

import org.springframework.web.multipart.MultipartFile
import java.util.*

interface FileService {
    fun addFile(file:MultipartFile):UUID
    fun getFileByID(fileID: UUID):File
}