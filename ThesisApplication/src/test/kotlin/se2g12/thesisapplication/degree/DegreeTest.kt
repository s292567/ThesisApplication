package se2g12.thesisapplication.degree

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class DegreeTest{
    @Test
    fun `test DegreeDTO`(){
        val degree = DegreeDTO("ENG1", "Computer Engineering")

        assertEquals("ENG1", degree.codDegree)
        assertEquals("Computer Engineering", degree.titleDegree)
    }
}