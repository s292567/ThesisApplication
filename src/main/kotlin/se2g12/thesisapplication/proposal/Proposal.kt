package se2g12.thesisapplication.proposal

import jakarta.persistence.*
import se2g12.thesisapplication.teacher.Teacher
import java.util.*

@Entity
data class Proposal(
    val title: String?=null,
    @ManyToOne
    @JoinColumn(name = "supervisor_id", referencedColumnName = "id")
    val supervisor: Teacher? = null,  // Reference to the associated teacher
    @OneToMany
    val coSupervisors: List<Teacher>?=null,
    @ElementCollection
    val keywords: List<String>?=null,
    val type: String?=null,
    @ElementCollection
    val groups: List<String>?=null,
    val description: String?=null,
    val requiredKnowledge: String?=null,
    val notes: String?=null,
    val expiration: Date?=null,
    val level: String?=null,
    @ElementCollection
    val cds: List<String>?=null
){
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}