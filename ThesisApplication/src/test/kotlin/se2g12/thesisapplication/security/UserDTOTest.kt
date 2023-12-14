package se2g12.thesisapplication.security

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

class UserDTOTest {

    @Test
    fun `test UserDTO`(){
        val user = UserDTO("p101@example.com", "Test.101")

        assertEquals("p101@example.com", user.username)
        assertEquals("Test.101", user.password)
    }
    @Test
    fun testToString() {
        val user = UserDTO("p101@example.com", "Test.101")
        val stringUser = user.toString()

        assertEquals("Username: p101@example.com Password: Test.101", stringUser)
    }
}