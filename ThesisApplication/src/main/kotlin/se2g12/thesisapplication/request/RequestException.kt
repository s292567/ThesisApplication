package se2g12.thesisapplication.request

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import se2g12.thesisapplication.application.ProposalNotFoundError

@RestControllerAdvice
class RequestException {
    @ExceptionHandler(InvalidRequestStatus::class)
    fun invalidRequestStatus(e : InvalidRequestStatus) = ProblemDetail
        .forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, e.message!!)
}

class InvalidRequestStatus(message: String) : Throwable(message)