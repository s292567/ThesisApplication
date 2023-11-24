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

    @PostMapping("/API/thesis/proposals/apply")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewProposal(@RequestBody obj: NewApplicationDTO){
        applicationService.addNewApplication(obj)
    }

    @PatchMapping("/API/thesis/applications")
    fun updateApplication(@RequestBody application: ApplicationDTO){

        if (application.status == "accepted") {
            applicationService.acceptApplication(application.id)
        }else if (application.status == "declined") {
            applicationService.declineApplication(application.id)
        }
        // if another status is passed, do nothing
    }
}