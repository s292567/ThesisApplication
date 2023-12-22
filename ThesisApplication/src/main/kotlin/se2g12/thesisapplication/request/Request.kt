package se2g12.thesisapplication.request

import jakarta.persistence.*
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.teacher.Teacher
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
//  saved as ids separeted by commas
    val coSupervisors: String,
/*//  saved as ids in a separate table; automatically retrieved as teachers
    @ManyToMany
    @JoinTable(
        name = "request_coSuervisors",
        joinColumns = [JoinColumn(name = "request_id")],
        inverseJoinColumns = [JoinColumn(name = "supervisor_id")]
    )
    val coSupervisors: List<Teacher>*/
//    default is pending; can be set to accepted/declined by a secretary
    var secretaryStatus: String?="pending",
//    default is pending;
//    set to "accepted"/"declined"/"request change" by the supervisor, only after secretaryStatus is set
    val supervisorStatus: String?="pending"

) {
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}