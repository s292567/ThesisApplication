package se2g12.thesisapplication.degree

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class Degree(
    @Id
    val codDegree: String? = null,
    val titleDegree: String? = null
)