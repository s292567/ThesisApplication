package se2g12.thesisapplication.application

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface ApplicationRepository : JpaRepository<Application, UUID> {

    @Modifying
    @Query("update application set status= :newStatus where id= :applicationId", nativeQuery = true)
    fun updateStatusById(applicationId:UUID, newStatus:String)
    @Modifying
    @Query("update application set status= :newStatus where student_id= :studentId and status='pending'", nativeQuery = true)
    fun updateStatusByStudentId(studentId:String, newStatus:String)
    @Modifying
    @Query("update application set status= :newStatus where proposal_id= :proposalId and status='pending'", nativeQuery = true)
    fun updateStatusByProposalId(proposalId:UUID, newStatus:String)
}