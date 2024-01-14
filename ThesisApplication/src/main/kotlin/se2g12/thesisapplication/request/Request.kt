package se2g12.thesisapplication.request

import jakarta.persistence.*
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.teacher.Teacher
import java.time.LocalDate
import java.util.*

@Entity
data class Request(
    @ManyToOne
    @JoinColumn(name = "student_id")
    val student: Student,
    val title: String,
    val description: String,
    @ManyToOne
    @JoinColumn(name = "supervisor_id", referencedColumnName = "id")
    val supervisor: Teacher,
//  saved as name and surname separeted by commas
    val coSupervisors: String,

//    default is pending; can be set to accepted/declined by a secretary
    var secretaryStatus: String?="pending",
//    default is pending;
//    set to "accepted"/"declined"/"change requested" by the supervisor, only after secretaryStatus is set
    var supervisorStatus: String?="pending",
    @Temporal(TemporalType.DATE)
    var startDate: LocalDate?=null

) {
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}