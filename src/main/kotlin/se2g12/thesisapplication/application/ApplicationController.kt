package se2g12.thesisapplication.application

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.application.ApplicationService
import se2g12.thesisapplication.application.NewApplicationDTO
import java.util.UUID

@RestController
@CrossOrigin
class ApplicationController(private val applicationService: ApplicationService) {

    //@PreAuthorize("hasRole('Professor')")
    @PatchMapping("/API/thesis/applications/{applicationId}")
    fun updateApplication(@RequestBody status: String, @PathVariable applicationId: UUID){
        if (status.lowercase() === "accepted")
            applicationService.acceptApplication(applicationId)
        else if (status.lowercase() === "declided")
            applicationService.declineApplication(applicationId)
        // if another status is passed, do nothing
    }
}