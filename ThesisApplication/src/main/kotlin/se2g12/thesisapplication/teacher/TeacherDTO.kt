package se2g12.thesisapplication.teacher

import jakarta.validation.constraints.Email
import java.util.*

data class TeacherDTO (
    val id: String? = null,
    val surname: String? = null,
    val name: String? = null,
    val email: Email? = null,
    val codGroup: String? = null,
    val codDepartment: String? = null
)


//fun Counter.toDTO(): CounterDTO {
//    return CounterDTO(this.counterId!!,this.number!!,this.listOfServices!!.map(){it.toDTO()},this.description!!)
//}
