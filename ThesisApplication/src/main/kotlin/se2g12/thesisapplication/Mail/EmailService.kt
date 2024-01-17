package se2g12.thesisapplication.Mail

import jakarta.mail.MessagingException
import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import se2g12.thesisapplication.application.ApplicationDTO
import se2g12.thesisapplication.proposal.ProposalRepository

@Service
class EmailService (private val proposalRepository: ProposalRepository){
    @Autowired
    private val mailSender: JavaMailSender? = null


    @Throws(MessagingException::class)
    @Async
    fun sendHtmlEmail(to: String?,application: ApplicationDTO) {
        val status=application.status
        println(status)
        val message: MimeMessage = mailSender!!.createMimeMessage()
        message.setFrom(InternetAddress("noreply.se2g12@gmail.com"))
        if (to != null) {
            if (to.contains("example.com"))
                message.setRecipients(MimeMessage.RecipientType.TO, "mfontana413@gmail.com")
            else
                message.setRecipients(MimeMessage.RecipientType.TO, to)
        }
        val bool=status!!.contains("pending")
        var htmlContent:String=""
        if(bool)
        {
            message.subject="New application on ${proposalRepository.findById(application.proposalId!!).get().title}"
            if (to != null) {
                htmlContent =  "<h1>Dear ${to.split("@")[0]}</h1>" +"<p>Your thesis ${proposalRepository.findById(
                    application.proposalId!!
                ).get().title} has received an application</p>"
            }
        }
        else {
            message.subject = "Your application on  ${application.proposalId?.let { proposalRepository.findById(it).get().title }} has been $status"
            htmlContent =  "<h1> ${to!!.split("@")[0]}</h1>" +"<p>Your application on ${application.proposalId?.let {
                proposalRepository.findById(
                    it
                ).get().title
            }} has been $status check the web page for more information</p>"
        }


        message.setContent(htmlContent, "text/html; charset=utf-8")
    }
}