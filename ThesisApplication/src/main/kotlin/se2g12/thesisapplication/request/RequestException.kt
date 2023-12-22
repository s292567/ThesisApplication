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
    @ExceptionHandler(UnmodifiableRequestStatus::class)
    fun unmodifiableRequestStatus(e : UnmodifiableRequestStatus) = ProblemDetail
        .forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, e.message!!)
    @ExceptionHandler(RequestNotFound::class)
    fun requestNotFound(e : RequestNotFound) = ProblemDetail
        .forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
}

class InvalidRequestStatus(message: String) : Throwable(message)
class UnmodifiableRequestStatus(message: String) : Throwable(message)
class RequestNotFound(message: String): Throwable(message)