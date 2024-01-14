package se2g12.thesisapplication.request

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

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
    @GetMapping("/API/thesis/requests/{professorId}")
    @PreAuthorize("hasRole('Professor')")
    fun getAllPendingRequestsByProfessor(@PathVariable professorId:String):List<RequestDTO>{
        return requestService.getAllPendingRequestsForProfessor(professorId)
    }

    @PatchMapping("/API/thesis/requests/{professorId}")
    @PreAuthorize("hasRole('Professor')")
    fun setProfessorStatus(@PathVariable professorId:String, @RequestBody request: RequestStatusDTO){
        requestService.setRequestSupervisorStatus(request.requestId, request.status, professorId)
    }
    @PostMapping("/API/thesis/request/{studentId}")
    @PreAuthorize("hasRole('Student')")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewRequest(@RequestBody obj: NewRequestDTO, @PathVariable studentId:String){
        println(obj)
        requestService.addNewRequest(obj, studentId)

    }

}