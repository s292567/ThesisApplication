package se2g12.thesisapplication.proposal

import jakarta.persistence.*
import se2g12.thesisapplication.teacher.Teacher
import java.time.LocalDate
import java.util.*

@Entity
data class Proposal(
    var title: String,
    @ManyToOne
    @JoinColumn(name = "supervisor_id", referencedColumnName = "id")
    var supervisor: Teacher,  // Reference to the associated teacher
    // For simplicity, co-supervisors are stored as a comma-separated string of teacher IDs
    var coSupervisors: String? = null,
    // For simplicity, keywords are stored as a comma-separated string
    var keywords: String,
    var type: String,
    // For simplicity, groups are stored as a comma-separated string
    val groups: String,
    val description: String,
    val requiredKnowledge: String?=null,
    val notes: String?=null,
    @Temporal(TemporalType.DATE)
    val expiration: LocalDate,
    val level: String,
    val cds: String
){
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}