package se2g12.thesisapplication.proposal

import jakarta.validation.ConstraintViolation
import jakarta.validation.Valid
import jakarta.validation.Validation
import jakarta.validation.Validator
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import org.hibernate.validator.constraints.Length

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
    var type : String,
    var groups : List<String>,
    @NotBlank(message = "A description must be provided")
    var description : String,
    var requiredKnowledge : String?,
    var notes : String?,
    @ValidDate
    var expiration : String,
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