package se2g12.thesisapplication.application

import jakarta.persistence.*
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

    val status: String?="pending",
){
    @Id
    @GeneratedValue(generator = "uuid2")
    var id: UUID?=null

}

