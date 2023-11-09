package se2g12.thesisapplication.proposal

import jakarta.persistence.ElementCollection
import java.util.*

data class NewProposalDTO (
    var title : String,
    var supervisor : String,
    var coSupervisors : List<String>?,
    var keywords : List<String>,
    var type : String,
    var groups : String,
    var description : String,
    var requiredKnowledge : String?,
    var notes : String?,
    var expiration : Date,
    var level: String,
    var Cds: List<String>
)
