package se2g12.thesisapplication.application

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import se2g12.thesisapplication.student.Student
import java.util.*


@Repository
interface ApplicationRepository : JpaRepository<Application, UUID> {

    @Modifying
    @Query("update application set status= :newStatus where id= :applicationId", nativeQuery = true)
    fun updateStatusById(applicationId:UUID, newStatus:String)
    @Query ("SELECT * FROM application WHERE proposal_id = :proposalId AND student_id = :studentId", nativeQuery = true)
    fun findByProposalIdAndStudentId(proposalId:UUID, studentId:String): List<Application>
    @Modifying
    @Query("update application set status= :newStatus where student_id= :studentId and status='pending'", nativeQuery = true)
    fun updateStatusByStudentId(studentId:String, newStatus:String)
    @Modifying
    @Query("update application set status= :newStatus where proposal_id= :proposalId and status='pending'", nativeQuery = true)
    fun updateStatusByProposalId(proposalId:UUID, newStatus:String)

    @Query("SELECT * FROM application WHERE proposal_id = :proposalId", nativeQuery = true)
    fun getAllApplicationsByProposalId(proposalId: UUID): List<Application>

    fun findByStudentId(studentId: String): List<Application>
    fun findByProposalId(proposalId: UUID): List<Application>
}