package se2g12.thesisapplication.proposalOld

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ProposalException : ResponseEntityExceptionHandler(){

    @ExceptionHandler(ProposalBodyError::class)
    fun proposalBodyError(e : ProposalBodyError) = ProblemDetail
        .forStatusAndDetail(HttpStatus.BAD_REQUEST, e.message!!)
}

class ProposalBodyError(message: String?) : Throwable(message)