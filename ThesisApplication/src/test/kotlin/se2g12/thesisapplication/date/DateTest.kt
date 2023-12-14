package se2g12.thesisapplication.date

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@AutoConfigureMockMvc(addFilters = false)
class DateTest {
    @Autowired
    private lateinit var mockMvc: MockMvc
    @Test
    fun `test virtualDateAdd endpoint`() {
        mockMvc.perform(
            post("/API/thesis/date/set/{dateString}", "2024-12-31")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isCreated)

        mockMvc.perform(
            get("/API/thesis/date/get/")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
    }


}