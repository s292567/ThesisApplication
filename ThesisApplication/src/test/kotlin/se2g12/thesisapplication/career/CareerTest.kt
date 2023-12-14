package se2g12.thesisapplication.career

import org.junit.jupiter.api.Test
import se2g12.thesisapplication.student.Student
import java.text.SimpleDateFormat
import org.junit.jupiter.api.Assertions.*


class CareerTest {

    @Test
    fun `test Career`() {
        val student = Student()
        val date = SimpleDateFormat("YYYY-mm-DD").parse("2020-01-10")
        val career = Career(student, "ICCS01", "Introduction to Computer Systems", 6, 30, date)

        assertEquals(student, career.student)
        assertEquals("ICCS01", career.codCourse)
        assertEquals("Introduction to Computer Systems", career.titleCourse)
        assertEquals(6, career.cfu)
        assertEquals(30, career.grade)
    }
    @Test
    fun `test CareerDTO`() {
        val student = Student()
        val careerDTO = CareerDTO(student, "ICCS01", "Introduction to Computer Systems", 6, 30, "2020-01-10")

        assertEquals(student, careerDTO.student)
        assertEquals("ICCS01", careerDTO.codCourse)
        assertEquals("Introduction to Computer Systems", careerDTO.titleCourse)
        assertEquals(6, careerDTO.cfu)
        assertEquals(30, careerDTO.grade)
        assertEquals("2020-01-10", careerDTO.date)
    }
}