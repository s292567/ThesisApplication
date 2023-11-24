package se2g12.thesisapplication.proposal

import jakarta.persistence.*
import se2g12.thesisapplication.teacher.Teacher
import java.util.*

@Entity
data class Proposal(
    val title: String,
    @ManyToOne
    @JoinColumn(name = "supervisor_id", referencedColumnName = "id")
    val supervisor: Teacher,  // Reference to the associated teacher
    // For simplicity, co-supervisors are stored as a comma-separated string of teacher IDs
    val coSupervisors: String? = null,
    // For simplicity, keywords are stored as a comma-separated string
    val keywords: String,
    val type: String,
    // For simplicity, groups are stored as a comma-separated string
    val groups: String,
    val description: String,
    val requiredKnowledge: String?=null,
    val notes: String?=null,
    val expiration: Date,
    val level: String,
    val cds: String
){
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}