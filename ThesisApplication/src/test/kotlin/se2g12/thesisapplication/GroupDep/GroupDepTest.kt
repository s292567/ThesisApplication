package se2g12.thesisapplication.GroupDep

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import se2g12.thesisapplication.department.Department

class GroupDepTest{

    @Test
    fun `test GroupDepDTO`(){
        val department = Department("DEP01")
        val groupDep = GroupDepDTO("G11", department)

        assertEquals("G11", groupDep.id)
        assertEquals("DEP01", groupDep.department!!.codDepartment)
    }
}