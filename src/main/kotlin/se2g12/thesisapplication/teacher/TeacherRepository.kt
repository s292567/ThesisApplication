package se2g12.thesisapplication.teacher

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface TeacherRepository : JpaRepository<Teacher, String> {
    @Query("select * from teacher where email= :email ", nativeQuery = true)
    fun findByEmail(email: String): List<Teacher>
    @Query("select * from teacher where name= :name AND surname= :surname ", nativeQuery = true)
    fun findByNameSurname(name: String, surname: String): List<Teacher>
}