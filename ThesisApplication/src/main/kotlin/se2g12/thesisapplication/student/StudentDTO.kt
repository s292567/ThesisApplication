package se2g12.thesisapplication.student


import java.util.*

data class StudentDTO(
    val id: String? = null,
    val surname: String? = null,
    val name: String? = null,
    val gender: String? = null,
    val nationality: String? = null,
    val email: String? = null,
    val codDegree: String? = null,
    val enrollmentYear: Int? = null
)

fun Student.toDTO() : StudentDTO {
    return StudentDTO(
        this.id,
        this.surname,
        this.name,
        this.gender,
        this.nationality,
        this.email,
        this.degree!!.titleDegree,
        this.enrollmentYear
    )
}