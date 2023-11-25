package se2g12.thesisapplication.department

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class Department(
    @Id
    val codDepartment: String? = null,

)