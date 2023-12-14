package se2g12.thesisapplication.department

import org.springframework.data.jpa.repository.JpaRepository

interface DepartmentRepository : JpaRepository<Department,String> {
}