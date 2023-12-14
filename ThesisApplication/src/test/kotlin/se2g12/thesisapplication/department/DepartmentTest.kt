package se2g12.thesisapplication.department

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class DepartmentTest{
    @Test
    fun `test departmentDTO`(){
        val departmentDTO = DepartmentDTO("DEP01")

        assertEquals("DEP01", departmentDTO.codDepartment)
    }
}