package se2g12.thesisapplication.student

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface StudentRepository : JpaRepository<Student, String> {
    @Query("select * from student where email= :email ", nativeQuery = true)
    fun findByEmail(email: String): List<Student>
}