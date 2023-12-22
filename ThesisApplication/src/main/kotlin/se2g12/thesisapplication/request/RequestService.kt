package se2g12.thesisapplication.request

import java.util.UUID

interface RequestService {

    fun getAllPendingRequestsForSecretary():List<RequestDTO>
    fun setRequestSecretaryStatus(requestId:UUID, status: String)
}