package se2g12.thesisapplication.application

import jakarta.persistence.*
import org.springframework.web.multipart.MultipartFile
import se2g12.thesisapplication.file.File
import se2g12.thesisapplication.proposal.Proposal
import se2g12.thesisapplication.student.Student
import java.util.*


@Entity
data class Application(
    @ManyToOne
    @JoinColumn(name = "student_id")
    val student: Student,

    @ManyToOne
    @JoinColumn(name = "proposal_id")
    val proposal: Proposal,

    var status: String?="pending",
    val fileID:UUID?=null,
    val fileName:String?=null

){
    @Id
    @GeneratedValue(generator = "uuid2")
    var id: UUID?=null

}

