package se2g12.thesisapplication.file

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.*
@Service
class FileServiceImpl(private val fileRepository: FileRepository) : FileService {

    override fun addFile( file: MultipartFile):UUID {
        var toAdd=File(file.bytes,file.contentType!!,file.originalFilename!!)
        return fileRepository.save(toAdd).fileId!!
    }

    override fun getName(fileID: UUID): String {
        return fileRepository.getReferenceById(fileID).fileName
    }

    override fun getFileByID(fileID: UUID): File {
        return fileRepository.getReferenceById(fileID)
    }


}