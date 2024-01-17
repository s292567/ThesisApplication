package se2g12.thesisapplication.Mail
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import se2g12.thesisapplication.application.ApplicationRepository
import se2g12.thesisapplication.application.toDTO


@RestController
@CrossOrigin
class EmailController(private val emailService: EmailService,private val applicationRepository: ApplicationRepository) {
    @GetMapping("/test")
    fun sendEmail() {
        var app =applicationRepository.findAll().first().toDTO()
        emailService.sendHtmlEmail("mfontana413@gmail.com",
            app)
        app.status="declined"
        emailService.sendHtmlEmail("mfontana413@gmail.com",
            app)
    }
}