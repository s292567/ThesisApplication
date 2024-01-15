package se2g12.thesisapplication.request

import java.util.UUID

interface RequestService {

    fun getAllPendingRequestsForSecretary():List<RequestDTO>
    fun setRequestSecretaryStatus(requestId:UUID, status: String)
    fun getAllPendingRequestsForProfessor(professorId: String):List<RequestDTO>
    fun setRequestSupervisorStatus(requestId:UUID, status: String, professorId: String)
    fun addNewRequest(newRequest: NewRequestDTO, studentId: String)

    fun addRequestChangeInfo(info: ChangeInfoDTO, professorId: String)
}