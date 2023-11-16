package se2g12.thesisapplication.student

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.application.ApplicationService
import se2g12.thesisapplication.application.NewApplicationDTO

@RestController
@CrossOrigin
class StudentController(private val applicationService: ApplicationService) {

    @PreAuthorize("hasRole('Student')")
    @PostMapping("/API/thesis/proposals/apply")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewProposal(@RequestBody obj: NewApplicationDTO){
        applicationService.addNewApplication(obj)
    }
}