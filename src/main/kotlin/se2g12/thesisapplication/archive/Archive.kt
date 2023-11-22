package se2g12.thesisapplication.archive

import jakarta.persistence.*
import se2g12.thesisapplication.proposal.Proposal
import java.util.*

@Entity
data class Archive(
    @OneToOne
    @JoinColumn(name = "proposal_id", referencedColumnName = "id")
    val proposal: Proposal
){
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}