package se2g12.thesisapplication.Mail

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import se2g12.thesisapplication.proposal.ProposalDTO
@RestController
@CrossOrigin
class EmailController (private val emailService: EmailService){
    @GetMapping("/test")
    fun sendEmail() {
        return emailService.sendHtmlEmail("mfontana413@gmail.com", status = "accepted")
    }
}