package se2g12.thesisapplication.student


import java.util.*

data class StudentDTO(
    val id: UUID? = null,
    val surname: String? = null,
    val name: String? = null,
    val gender: String? = null,
    val nationality: String? = null,
    val email: String? = null,
    val codDegree: String? = null,
    val enrollmentYear: Int? = null
)