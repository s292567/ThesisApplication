package se2g12.thesisapplication.request

import org.springframework.transaction.annotation.Transactional
import org.springframework.stereotype.Service
import se2g12.thesisapplication.date.Date
import se2g12.thesisapplication.proposal.NotFound
import se2g12.thesisapplication.requestChange.RequestChangeService
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.TeacherRepository
import java.time.LocalDate
import java.util.*

@Service
@Transactional
class RequestServiceImpl(private val requestRepository: RequestRepository,
                         private val studentRepository: StudentRepository,
                         private val teacherRepository: TeacherRepository,
                         private val virtualDate: Date,
                         private val requestChangeService: RequestChangeService
    ): RequestService {

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

    override fun getAllPendingRequestsForProfessor(professorId: String): List<RequestDTO> {
//        returns only requests that have been accepted by the secreatry but pending by the supervisor
        return requestRepository.findBySupervisorIdAndSecretaryStatusLikeAndSupervisorStatusLike(
            professorId, "accepted", "pending"
            ).map { it.toDTO() }
    }

    override fun setRequestSupervisorStatus(requestId: UUID, status: String, professorId: String) {
        val request = requestRepository.findById(requestId).orElseThrow { RequestNotFound("Request $requestId was not found") }
        if (request.supervisor.id != professorId)
            throw UnauthorizedProfessor("You ($professorId) are not the supervisor for this thesis request (${request.supervisor.id})")
        if(request.secretaryStatus != "accepted")
            throw UnmodifiableRequestStatus("Request $requestId has to be accepted by the secreatry before")
        if(request.supervisorStatus != "pending")
            throw UnmodifiableRequestStatus("Request $requestId has already status ${request.supervisorStatus}")

        val newStatus:String = if (status.lowercase().contains("acc")){
            request.startDate = virtualDate.getDate()?:LocalDate.now()
            "accepted"
        } else if (status.lowercase().contains("rej")){
            "rejected"
        } else if (status.lowercase().contains("change")){
            "change requested"
        }else{
            throw InvalidRequestStatus("Request status should be `accepted`, `declined` or `change`")
        }
        request.supervisorStatus = newStatus
        requestRepository.save(request)
    }
    // Updated RequestServiceImpl function
    override fun addNewRequest(newRequest: NewRequestDTO, studentId: String) {
            val student = studentRepository.findById(studentId)
                .orElseThrow { NotFound("Student $studentId not found") }


            // Convert coSupervisors list to a string
            val coSupervisorsString = newRequest.coSupervisors.joinToString(", ")
            // TODO: check coSupervisors are actual teachers
        val supervisor = teacherRepository.findById(newRequest.supervisorId)
            .orElseThrow { NotFound("professor ${newRequest.supervisorId} not found") }

            val request = Request(
                student = student,
                title = newRequest.title,
                description = newRequest.description,
                supervisor = supervisor,
                coSupervisors = coSupervisorsString
            )

            requestRepository.save(request)
        }

    override fun addRequestChangeInfo(info: ChangeInfoDTO, professorId: String) {
        //1. Retrieve request
        val request= requestRepository.findById(info.requestId)
            .orElseThrow { NotFound("Request ${info.requestId} not found") }
        //2. check you are the supervisor
        if (request.supervisor.id != professorId)
            throw UnauthorizedProfessor("You ($professorId) are not the supervisor for this thesis request (${request.supervisor.id})")
        //3. check it's accepted by secretary and still pending
        if(request.secretaryStatus != "accepted")
            throw UnmodifiableRequestStatus("Request ${info.requestId} has to be accepted by the secreatry before")
        if(request.supervisorStatus != "pending")
            throw UnmodifiableRequestStatus("Request ${info.requestId} has already status ${request.supervisorStatus}")

        //4. save info
        requestChangeService.addRequestChange(request, info.info)
    }

}