package se2g12.thesisapplication.teacher

import jakarta.validation.constraints.Email
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class TeacherTest{
    @Test
    fun `test TeacherDTO`(){
        val teacher = TeacherDTO(id="p101", surname = "Ferrari", name="Luca", codGroup = "G13", codDepartment = "DEP01")

        assertEquals("p101", teacher.id)
        assertEquals("Ferrari", teacher.surname)
        assertEquals("Luca", teacher.name)
        assertEquals("G13", teacher.codGroup)
        assertEquals("DEP01", teacher.codDepartment)
    }
}