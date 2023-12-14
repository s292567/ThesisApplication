package se2g12.thesisapplication.Mail

import jakarta.mail.MessagingException
import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.scheduling.annotation.Async
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
    @Async
    fun sendHtmlEmail(to: String?, status: String) {
        val message: MimeMessage = mailSender!!.createMimeMessage()
        message.setFrom(InternetAddress("noreply.se2g12@gmail.com"))
        if (to!!.contains("example.com"))
            message.setRecipients(MimeMessage.RecipientType.TO, "mfontana413@gmail.com")
        else
            message.setRecipients(MimeMessage.RecipientType.TO, to)
        val bool=status.contains("added new application")
        var htmlContent:String
        if(bool)
        {
            message.subject=status
            htmlContent =  "<h1>Dear ${to!!.split("@")[0]}</h1>" +"<p>One of your thesis proposal has received an application</p>"
        }
        else {
            message.subject = "Your application has been $status"
            htmlContent =  "<h1> ${to!!.split("@")[0]}</h1>" +"<p>One of your application status has been updated check the web page for more information</p>"
        }


        message.setContent(htmlContent, "text/html; charset=utf-8")
        mailSender.send(message)
    }
}