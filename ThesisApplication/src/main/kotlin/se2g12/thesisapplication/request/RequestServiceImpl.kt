package se2g12.thesisapplication.request

import org.springframework.transaction.annotation.Transactional
import org.springframework.stereotype.Service
import java.util.*

@Service
@Transactional
class RequestServiceImpl(private val requestRepository: RequestRepository): RequestService {

    override fun getAllPendingRequestsForSecretary(): List<RequestDTO> {
        return requestRepository.findBySecretaryStatusLike("pending")
            .map { it.toDTO() }
    }

    override fun setRequestSecretaryStatus(requestId: UUID, status: String) {
        val request = requestRepository.findById(requestId).orElseThrow { RequestNotFound("Request $requestId was not found") }
        if(request.secretaryStatus != "pending")
            throw UnmodifiableRequestStatus("Request $requestId has already status ${request.secretaryStatus}")
        // handle some possible errors, but at least first 3 letters have to be correct
        // this way it's ok both "accept" and "accepted"
        val newStatus:String = if (status.lowercase().contains("acc")){
            "accepted"
        } else if (status.lowercase().contains("rej")){
            "rejected"
        } else{
            throw InvalidRequestStatus("Request status should be `accepted` or `declined`")
        }
        request.secretaryStatus = newStatus
        requestRepository.save(request)
    }
}