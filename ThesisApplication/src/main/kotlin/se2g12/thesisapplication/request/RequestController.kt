package se2g12.thesisapplication.request

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
class RequestController(private val requestService: RequestService) {

    @GetMapping("/API/thesis/requests")
    @PreAuthorize("hasRole('Secretary')")
    fun getAllPendingRequests():List<RequestDTO>{
        return requestService.getAllPendingRequestsForSecretary()
    }

    @PatchMapping("/API/thesis/requests")
    @PreAuthorize("hasRole('Secretary')")
    fun setSecretaryStatus(@RequestBody request: RequestStatusDTO){
        requestService.setRequestSecretaryStatus(request.requestId, request.status)
    }

}