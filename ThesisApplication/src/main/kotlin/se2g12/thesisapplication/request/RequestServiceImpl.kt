package se2g12.thesisapplication.request

import org.springframework.stereotype.Service
import java.util.*

@Service
class RequestServiceImpl(private val requestRepository: RequestRepository): RequestService {

    override fun getAllRequests():List<RequestDTO> {
        return requestRepository.findAll().map { it.toDTO() }
    }

    override fun getAllPendingRequestsForSecretary(): List<RequestDTO> {
        return requestRepository.findBySecretaryStatusLike("pending")
            .map { it.toDTO() }
    }

    override fun setRequestSecretaryStatus(requestId: UUID, status: String) {
        // handle some possible errors, but at least first 3 letters have to be correct
        // this way it's ok both "accept" and "accepted"
        val newStatus:String = if (status.lowercase().contains("acc")){
            "accepted"
        } else if (status.lowercase().contains("rej")){
            "rejected"
        } else{
            throw InvalidRequestStatus("Request status should be `accepted` or `declined`")
        }
        requestRepository.updateSecretaryStatusById(requestId, newStatus)
    }
}