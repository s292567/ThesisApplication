package se2g12.thesisapplication.proposal

import jakarta.persistence.Entity
import jakarta.persistence.ElementCollection
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import java.util.*


@Entity
class Proposal (
    var title : String,
    var supervisor : String,
    @ElementCollection
    var coSupervisors : List<String>,
    @ElementCollection
    var keywords : List<String>,
    var type : String,
    var groups : String,
    var description : String,
    var requiredKnowledge : String,
    var notes : String,
    var expiration : Date,
    var level: String,
    @ElementCollection
    var Cds: List<String>
){
    @Id
    @GeneratedValue(generator = "uuid2")
    var id: UUID?=null

}