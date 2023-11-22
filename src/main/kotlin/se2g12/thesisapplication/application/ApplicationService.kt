package se2g12.thesisapplication.application

import java.util.UUID


interface ApplicationService {
    fun addNewApplication(newApplication: NewApplicationDTO)
    fun declineApplication(applicationId: UUID)
    fun acceptApplication(applicationId: UUID)
}