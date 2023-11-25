package se2g12.thesisapplication.proposal

import jakarta.persistence.Temporal
import jakarta.persistence.TemporalType
import jakarta.validation.ConstraintViolation
import jakarta.validation.Validation
import jakarta.validation.Validator
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import org.hibernate.validator.constraints.Length
import java.time.LocalDate
import java.util.*

@Target(AnnotationTarget.FIELD, AnnotationTarget.PROPERTY)
@Retention(AnnotationRetention.RUNTIME)
@NotBlank
@Length(min = 10, max = 10)
@Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Invalid date format, must be YYYY-MM-DD")
annotation class ValidDate

data class NewProposalDTO (
    @NotBlank(message = "A title must be provided")
    var title : String,
    var coSupervisors : List<String>? = listOf(),
    var keywords : List<String>,
    var type : List<String>,
    var groups : List<String>,
    @NotBlank(message = "A description must be provided")
    var description : String,
    var requiredKnowledge : String?,
    var notes : String?,
    @ValidDate
    @Temporal(TemporalType.DATE)
    var expiration : LocalDate,
    var level: String,
    var CdS: List<String>
){
    fun checkBody(){
        val validator: Validator = Validation.buildDefaultValidatorFactory().validator
        val violations : Set<ConstraintViolation<NewProposalDTO>> = validator.validate(this)
        if (violations.isNotEmpty()){
            val message = violations.joinToString("\n") { it.message }
            throw ProposalBodyError(message)
        }
    }
}