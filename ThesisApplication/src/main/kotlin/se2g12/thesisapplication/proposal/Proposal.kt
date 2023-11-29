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
    var groups: String,
    var description: String,
    var requiredKnowledge: String?=null,
    var notes: String?=null,
    @Temporal(TemporalType.DATE)
    var expiration: LocalDate,
    var level: String,
    var cds: String
){
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}