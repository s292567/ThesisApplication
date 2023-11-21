package se2g12.thesisapplication.application

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface ApplicationRepository : JpaRepository<Application, UUID> {

    @Query("update application set status= :newStatus where id= :applicationId", nativeQuery = true)
    fun updateStatusById(applicationId:UUID, newStatus:String)
    @Query("update application set status= :newStatus where student_id= :studentId", nativeQuery = true)
    fun updateStatusByStudentId(studentId:String, newStatus:String)
    @Query("update application set status= :newStatus where proposal_id= :proposalId", nativeQuery = true)
    fun updateStatusByProposalId(proposalId:UUID, newStatus:String)
}