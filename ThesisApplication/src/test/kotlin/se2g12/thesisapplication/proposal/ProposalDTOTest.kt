package se2g12.thesisapplication.proposal

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.degree.Degree
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.teacher.Teacher
import java.text.SimpleDateFormat
import java.util.Optional

class ProposalDTOTest {

    @Test
    fun testToDTO() {
        // Mock data for Proposal
        val proposal = Proposal(
            title = "Sample Proposal",
            supervisor = Teacher("Ferrari", "Luca", "p101@example.com", GroupDep("G13")),
            coSupervisors = "Jane Doe, Bob Smith",
            keywords = "Java, Kotlin, MockK",
            type = "Research",
            groups = "GroupA, GroupB",
            description = "Sample proposal description",
            requiredKnowledge = "Sample required knowledge",
            notes = "Sample notes",
            expiration = SimpleDateFormat("yyyy-MM-dd").parse("2024-04-23"),
            level = "Master",
            cds = "Computer Science, Data Science"
        )

        // Mock data for DegreeRepository
        val degreeRepository: DegreeRepository = mockk()
        every { degreeRepository.findById("CDS123") } returns Optional.of(Degree("ENG1", "Computer Science"))
        every { degreeRepository.findById("CDS456") } returns Optional.of(Degree("ENG2", "Data Science"))

        // Call the toDTO function
        val proposalDTO = proposal.toDTO()

        // Assertions
        //assertEquals(1, proposalDTO.id)
        assertEquals("Sample Proposal", proposalDTO.title)
        assertEquals("Luca", proposalDTO.supervisor!!.name)
        assertEquals("Ferrari", proposalDTO.supervisor!!.surname)
        assertEquals(listOf("Jane Doe", "Bob Smith"), proposalDTO.coSupervisors)
        assertEquals(listOf("Java", "Kotlin", "MockK"), proposalDTO.keywords)
        assertEquals("Research", proposalDTO.type)
        assertEquals(listOf("GroupA", "GroupB"), proposalDTO.groups)
        assertEquals("Sample proposal description", proposalDTO.description)
        assertEquals("Sample required knowledge", proposalDTO.requiredKnowledge)
        assertEquals("Sample notes", proposalDTO.notes)
        assertEquals(
            SimpleDateFormat("yyyy-MM-dd").format(proposal.expiration),
            proposalDTO.expiration
        )
        assertEquals("Master", proposalDTO.level)
        assertEquals(listOf("Computer Science", "Data Science"), proposalDTO.cds)
    }
}