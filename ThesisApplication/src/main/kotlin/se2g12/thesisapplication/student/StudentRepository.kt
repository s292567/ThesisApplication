package se2g12.thesisapplication.student

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StudentRepository : JpaRepository<Student, String> {
    @Query("select * from student where email= :email ", nativeQuery = true)
    fun findByEmail(email: String): List<Student>

    @Query("SELECT student.* FROM student LEFT JOIN application on student.id = application.student_id WHERE application.proposal_id = :proposalId", nativeQuery = true)
    fun getApplyingStudentsByProposalId(proposalId: UUID): List<Student>
}