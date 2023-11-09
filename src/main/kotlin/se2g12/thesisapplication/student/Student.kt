package se2g12.thesisapplication.student
import se2g12.thesisapplication.degree.Degree
import jakarta.persistence.*
import java.util.*

@Entity
data class Student (
    val surname:String?=null,
    val name:String?=null,
    val gender:String?=null,
    val nationality:String?=null,
    val email: String?=null,
    @ManyToOne
    @JoinColumn(name = "codDegree", referencedColumnName = "codDegree", insertable = false, updatable = false)
    val degree: Degree? = null,
    val enrollmentYear:String?=null
){
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}