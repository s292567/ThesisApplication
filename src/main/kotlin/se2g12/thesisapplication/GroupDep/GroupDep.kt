package se2g12.thesisapplication.GroupDep

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import se2g12.thesisapplication.department.Department

@Entity
data class GroupDep(
    @Id
    val id: String? = null,

    @ManyToOne
    @JoinColumn(name = "codDepartment", referencedColumnName = "codDepartment")
    val department: Department? = null,
)