package se2g12.thesisapplication.teacher

import jakarta.persistence.*
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.department.Department

@Entity
data class Teacher(
    val surname: String,
    val name: String,
    val email: String? = null,
    @ManyToOne
    @JoinColumn(name = "codGroup", referencedColumnName = "id")
    val group: GroupDep? = null,

    @ManyToOne
    @JoinColumn(name = "codDepartment", referencedColumnName = "codDepartment")
    val department: Department? = null,
    @Id
    val id: String? = null
){

}