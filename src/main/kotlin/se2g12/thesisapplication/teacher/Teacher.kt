package se2g12.thesisapplication.teacher

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import java.util.*

@Entity
data class Teacher(
    @Id
    val id: String,
    val surname: String? = null,
    val name: String? = null,
    val email: String? = null,
    val codGroup: String? = null,
    val codDepartment: String? = null
)