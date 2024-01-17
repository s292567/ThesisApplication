package se2g12.thesisapplication.file

import org.springframework.core.io.ByteArrayResource
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.application.ApplicationRepository
import se2g12.thesisapplication.application.ApplicationService
import se2g12.thesisapplication.proposal.ProposalService
import java.util.*

@RestController
@CrossOrigin
class FileController(private val fileService: FileService,private val applicationRepository: ApplicationRepository,val applicationService: ApplicationService,val proposalService: ProposalService) {


    @GetMapping("/API/downloadFile/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('Student')||hasRole('Professor')")
    fun getFile(@PathVariable id: UUID): ResponseEntity<ByteArrayResource> {
        val roles = SecurityContextHolder.getContext().authentication.authorities.map { it.authority }
        if (roles.contains("ROLE_Student"))
        {
            val application=applicationRepository.findByStudentId(SecurityContextHolder.getContext().authentication.name.split("@")[0])
            if(application.filter { it.fileID != null }.none { it.fileID == id })
                throw Exception("not your application")
        }
        else{
            val proposals=proposalService.getProposalByProfessorId(SecurityContextHolder.getContext().authentication.name.split("@")[0])
            if(proposals.filter{applicationRepository.getAllApplicationsByProposalId(it.id!!).filter { it.fileID==id }.isNotEmpty()}.isEmpty())
                throw Exception("not your proposal")
           
        }

        var elem = fileService.getFileByID(id)
        if (elem.file != null) {
            val resource = ByteArrayResource(elem.file!!)

            val headers = HttpHeaders()
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=${elem.fileName}")
            headers.contentType = MediaType.APPLICATION_OCTET_STREAM

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(elem.file!!.size.toLong())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource)
        } else {
            return ResponseEntity.notFound().build()
        }
    }
}