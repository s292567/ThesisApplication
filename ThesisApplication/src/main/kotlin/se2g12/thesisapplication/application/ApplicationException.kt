package se2g12.thesisapplication.application

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ApplicationException : ResponseEntityExceptionHandler(){


    @ExceptionHandler(ProposalNotFoundError::class)
    fun proposalNotFound(e : ProposalNotFoundError) = ProblemDetail
        .forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
}


class ProposalNotFoundError(message: String?) : Throwable(message)