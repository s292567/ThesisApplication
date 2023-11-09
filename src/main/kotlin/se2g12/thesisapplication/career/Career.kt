package se2g12.thesisapplication.career

import jakarta.persistence.*
import se2g12.thesisapplication.student.Student
import java.io.Serializable
import java.util.*

data class CareerId(
    val student: UUID? = null,
    val codCourse: String? = null
) : Serializable

@Entity
@IdClass(CareerId::class)
data class Career(
    @Id
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    val student: Student? = null,

    @Id
    val codCourse: String? = null,
    val titleCourse: String? = null,
    val cfu: Int? = null,
    val grade: Int? = null,
    val date: Date? = null
)