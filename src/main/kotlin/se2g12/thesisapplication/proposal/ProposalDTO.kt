package se2g12.thesisapplication.proposal

import se2g12.thesisapplication.teacher.Teacher
import java.util.*

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
    val expiration: Date? = null,
    val level: String? = null,
    val cds: List<String>? = null
)