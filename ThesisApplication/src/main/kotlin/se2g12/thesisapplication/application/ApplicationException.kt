package se2g12.thesisapplication.application

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.util.UUID

@RestControllerAdvice
class ApplicationException : ResponseEntityExceptionHandler(){


    @ExceptionHandler(ProposalNotFoundError::class)
    fun proposalNotFound(e : ProposalNotFoundError) = ProblemDetail
        .forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
    @ExceptionHandler(ApplicationNotFoundError::class)
    fun applicationNotFound(e : ApplicationNotFoundError) = ProblemDetail
        .forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
    @ExceptionHandler(UnauthorizedProfessorError::class)
    fun unauthorizedProfessor(e : UnauthorizedProfessorError) = ProblemDetail
        .forStatusAndDetail(HttpStatus.FORBIDDEN, e.message!!)
    @ExceptionHandler(NotModifiableApplicationError::class)
    fun notModifiableApplication(e : NotModifiableApplicationError) = ProblemDetail
        .forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, e.message!!)
}


class ProposalNotFoundError(message: String?) : Throwable(message)
class ApplicationNotFoundError(applicationId: UUID) : Throwable("Application $applicationId not found")
class UnauthorizedProfessorError(message: String?) : Throwable(message)
class NotModifiableApplicationError(applicationId: UUID, status: String) : Throwable("Application $applicationId already $status")