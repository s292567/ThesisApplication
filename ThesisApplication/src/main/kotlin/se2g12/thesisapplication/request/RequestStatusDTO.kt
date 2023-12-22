package se2g12.thesisapplication.request

import se2g12.thesisapplication.student.StudentDTO
import se2g12.thesisapplication.student.toDTO
import se2g12.thesisapplication.teacher.Teacher
import java.util.UUID

class RequestStatusDTO (
    val requestId: UUID,
    val status: String
)