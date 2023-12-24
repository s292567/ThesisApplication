package se2g12.thesisapplication.request

import se2g12.thesisapplication.student.StudentDTO
import se2g12.thesisapplication.student.toDTO
import se2g12.thesisapplication.teacher.Teacher
import java.util.UUID

class RequestDTO (
    val id: UUID,
    val student: StudentDTO,
    val title: String,
    val description: String,
    val supervisor: Teacher,
    //  saved as ids separeted by commas
    val coSupervisors: List<String>,

)
fun Request.toDTO():RequestDTO{
    val coSups: List<String> = if (this.coSupervisors.isBlank()){
        emptyList()
    }else{
        this.coSupervisors.split(", ",",")
    }
    return RequestDTO(
        this.id!!,
        this.student.toDTO(),
        this.title,
        this.description,
        this.supervisor,
        coSups
    )
}