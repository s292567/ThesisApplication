package se2g12.thesisapplication.career

import se2g12.thesisapplication.student.Student
import java.util.*

data class CareerDTO(
    val student: Student? = null,  // Reference to the associated student
    val codCourse: String? = null,
    val titleCourse: String? = null,
    val cfu: Int? = null,
    val grade: Int? = null,
    val date: String? = null
)
