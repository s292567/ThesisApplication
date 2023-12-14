package se2g12.thesisapplication.Mail

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.proposal.ProposalService

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@AutoConfigureMockMvc(addFilters = false)
class EmailControllerTest {

    @Autowired
    lateinit var emailService: EmailService
    @Autowired
    private lateinit var mockMvc: MockMvc

    @BeforeAll
    fun init(){
        emailService = mockk()
    }
    @Test
    fun sendEmail() {

        every { emailService.sendHtmlEmail(any(), any()) } returns mockk()

        mockMvc.perform(
            MockMvcRequestBuilders.get("/test"))
            .andExpect(MockMvcResultMatchers.status().isOk)

    }
}