package se2g12.thesisapplication.application

import se2g12.thesisapplication.student.StudentDTO
import java.util.UUID


interface ApplicationService {
    fun addNewApplication(newApplication: NewApplicationDTO)
    fun declineApplication(applicationId: UUID)
    fun acceptApplication(applicationId: UUID)
    fun getAllApplyingStudentsForProposalById(proposalId: UUID) : List<StudentDTO>
}