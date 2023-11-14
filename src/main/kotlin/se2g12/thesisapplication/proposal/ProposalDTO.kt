package se2g12.thesisapplication.proposal

import org.springframework.beans.factory.annotation.Autowired
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.teacher.Teacher
import java.text.SimpleDateFormat
import java.util.*
import kotlin.jvm.optionals.getOrNull

data class ProposalDTO(
    val id: UUID? = null,
    val title: String? = null,
    val supervisor: Teacher? = null,
    val coSupervisors: List<String>? = null,
    val keywords: List<String>? = null,
    val type: String? = null,
    val groups: List<String>? = null,
    val description: String? = null,
    val requiredKnowledge: String? = null,
    val notes: String? = null,
    val expiration: String? = null,
    val level: String? = null,
    val cds: List<String>? = null
)

fun Proposal.toDTO(degreeRepository: DegreeRepository) : ProposalDTO{
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
    val date = SimpleDateFormat("yyyy-MM-dd").format(this.expiration)
    val cdsCodes= this.cds.split(", ", ",")
    val cdsNames = mutableListOf<String>()
    for (code in cdsCodes){
        val degree = degreeRepository.findById(code)
        if(degree.isPresent){
            cdsNames.add(degree.get().titleDegree!!)
        }
    }
    return ProposalDTO(
        this.id,
        this.title,
        this.supervisor,
        coSup, key,
        this.type,
        gr, this.description, this.requiredKnowledge, this.notes,
        date, this.level, cdsNames)
}