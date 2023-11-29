package se2g12.thesisapplication.application

import se2g12.thesisapplication.student.StudentDTO
import java.util.UUID


interface ApplicationService {
    fun addNewApplication(newApplication: NewApplicationDTO)
    fun declineApplication(applicationId: UUID)
    fun acceptApplication(applicationId: UUID)
    fun getApplicationProposalSupervisorId(applicationId: UUID) : String
    fun getAllApplyingStudentsForProposalById(proposalId: UUID) : List<StudentDTO>

    fun getAllApplicationsForProposalById(proposalId: UUID) : List<ApplicationDTO>
    fun getApplicationsForStudent(studentId: String): List<ApplicationDTO>
}