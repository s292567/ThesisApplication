package se2g12.thesisapplication.proposal

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
    @ExceptionHandler(ProfessorNotFound::class)
    fun professorNotFound(e : ProfessorNotFound) = ProblemDetail
        .forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
    @ExceptionHandler(ForbiddenError::class)
    fun forbiddenError(e : ForbiddenError) = ProblemDetail
        .forStatusAndDetail(HttpStatus.FORBIDDEN, e.message!!)
}

class ProposalBodyError(message: String?) : Throwable(message)
class ProfessorNotFound(id:String) : Throwable("Professor $id not found")
class ForbiddenError(message: String?) : Throwable(message)