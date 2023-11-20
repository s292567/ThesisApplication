package se2g12.thesisapplication.proposal

import se2g12.thesisapplication.teacher.Teacher
import java.text.SimpleDateFormat
import java.util.*

data class ProposalDTO(
    val id: UUID? = null,
    val title: String? = null,
    val supervisor: Teacher? = null,
    val coSupervisors: List<String>? = null,
    val keywords: List<String>? = null,
    val type: List<String>? = null,
    val groups: List<String>? = null,
    val description: String? = null,
    val requiredKnowledge: String? = null,
    val notes: String? = null,
    val expiration: String? = null,
    val level: String? = null,
    val cds: List<String>? = null
)

fun Proposal.toDTO() : ProposalDTO{
    val coSup=if (this.coSupervisors.isNullOrBlank())
        emptyList<String>()
    else
        this.coSupervisors.split(", ", ",")

    val key= if(this.keywords.isBlank())
        emptyList<String>()
    else
        this.keywords.split(", ", ",")
    val gr=if(this.groups.isBlank())
        emptyList<String>()
    else
        this.groups.split(", ", ",")
    val type=if(this.groups.isBlank())
        emptyList<String>()
    else
        this.type.split(", ", ",")
    val date = SimpleDateFormat("yyyy-MM-dd").format(this.expiration)

    val cdsNames = this.cds.split(", ", ",")
    return ProposalDTO(
        this.id,
        this.title,
        this.supervisor,
        coSup, key,
        type,
        gr,
        this.description,
        this.requiredKnowledge,
        this.notes,
        date,
        this.level,
        cdsNames // cdsNames is converted to List<String>
    )
}