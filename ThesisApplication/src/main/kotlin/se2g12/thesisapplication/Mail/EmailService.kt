package se2g12.thesisapplication.Mail

import jakarta.mail.MessagingException
import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class EmailService {
    @Autowired
    private val mailSender: JavaMailSender? = null

    fun sendEmail(to: String?, subject: String?, body: String?) {
        val message = SimpleMailMessage()
        message.setTo(to)
        message.subject = subject!!
        message.text = body!!
        mailSender!!.send(message)
    }

    @Throws(MessagingException::class)
    fun sendHtmlEmail(to: String?, status: String) {
        val message: MimeMessage = mailSender!!.createMimeMessage()
        message.setFrom(InternetAddress("noreply.se2g12@gmai.com"))
        if (to!!.split("@")[1].contains("example.com"))
            message.setRecipients(MimeMessage.RecipientType.TO, "mfontana413@gmail.com")
        else
            message.setRecipients(MimeMessage.RecipientType.TO, to)
        message.subject = "Test email from Spring $status"
        val htmlContent = "<h1>This is a test Spring Boot email ${to!!.split("@")[0]}</h1>" +
                "<p>It can contain <strong>HTML</strong> content.</p>"
        message.setContent(htmlContent, "text/html; charset=utf-8")
        mailSender.send(message)
    }
}