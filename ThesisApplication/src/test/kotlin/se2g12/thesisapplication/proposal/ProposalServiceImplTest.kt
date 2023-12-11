package se2g12.thesisapplication.proposal
import io.mockk.*
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.extension.ExtendWith
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.application.Application
import se2g12.thesisapplication.application.ApplicationRepository
import se2g12.thesisapplication.degree.Degree
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

@ExtendWith(MockKExtension::class)
class ProposalServiceImplTest {

    private lateinit var proposalRepository: ProposalRepository
    private lateinit var teacherRepository: TeacherRepository
    private lateinit var studentRepository: StudentRepository
    private lateinit var groupDepRepository: GroupDepRepository
    private lateinit var applicationRepository: ApplicationRepository
    private lateinit var proposalService: ProposalServiceImpl


    @BeforeEach
    fun setUp() {
        proposalRepository = mockk()
        teacherRepository = mockk()
        studentRepository = mockk()
        groupDepRepository = mockk()
        applicationRepository = mockk()
        proposalService = ProposalServiceImpl(proposalRepository, teacherRepository, studentRepository, groupDepRepository, applicationRepository)
    }

    @Test
    fun testAddNewProposal() {
        // Mock data
        val professorId = "p101"
        val localDate: LocalDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val newProposalDTO = NewProposalDTO("Advanced algorithms for image processing",
            listOf( "Paolo Ricci", "Mario Rossi" ),
            listOf("image processing"),
            listOf("in external company"),
            listOf("G13","G21"),
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            listOf("ENG1", "ENG3")
        )

        val gr13 = GroupDep("G13")
        val gr21 = GroupDep("G21")
        // Mock behavior
        every { teacherRepository.findById(professorId) } returns Optional.of(Teacher("Ferrari", "Luca", "p101@example.com", gr13))
        every { teacherRepository.findByNameSurname("Paolo", "Ricci") } returns listOf(Teacher("Ricci", "Paolo", "paolo.ricci@example.com", gr21))
        every { teacherRepository.findByNameSurname("Mario", "Rossi") } returns emptyList()
        every { proposalRepository.save(any()) } returns mockk()

        // Call the method
        proposalService.addNewProposal(newProposalDTO, professorId)

        // Add assertions as needed
        // For example, you can verify that save method was called on proposalRepository
        verify(exactly = 1) { proposalRepository.save(any()) }
    }
    @Test
    fun `addNewProposal throws error if invalid group present`() {
        // Mock data
        val professorId = "p101"
        val localDate: LocalDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val newProposalDTO = NewProposalDTO("Advanced algorithms for image processing",
            listOf( "Paolo Ricci", "Mario Rossi" ),
            listOf("image processing"),
            listOf("in external company"),
            listOf("G13","G21", "G1"),
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            listOf("ENG1", "ENG3")
        )

        val gr13 = GroupDep("G13")
        val gr21 = GroupDep("G21")
        // Mock behavior
        every { teacherRepository.findById(professorId) } returns Optional.of(Teacher("Ferrari", "Luca", "p101@example.com", gr13))
        every { teacherRepository.findByNameSurname("Paolo", "Ricci") } returns listOf(Teacher("Ricci", "Paolo", "paolo.ricci@example.com", gr21))
        every { teacherRepository.findByNameSurname("Mario", "Rossi") } returns emptyList()
        every { proposalRepository.save(any()) } returns mockk()

        assertThrows<ProposalBodyError> {
            proposalService.addNewProposal(newProposalDTO, professorId)
        }

        verify(exactly = 0) { proposalRepository.save(any()) }
    }
    @Test
    fun `addNewProposal throws error if professor is not found`() {
        // Mock data
        val professorId = "p202"
        val newProposalDTO = mockk<NewProposalDTO>()

        // Mock behavior
        every { teacherRepository.findById(professorId) } returns Optional.empty()

        assertThrows<NotFound> {
            proposalService.addNewProposal(newProposalDTO, professorId)
        }

        verify(exactly = 0) { proposalRepository.save(any()) }
    }
    @Test
    fun `test getAllProposals`() {
        val teacher = Teacher("Ferrari", "Luca")
        val localDate: LocalDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        // Mock data
        val proposals = listOf(Proposal("Advanced algorithms for image processing",
            teacher,
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "in external company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            "Computer Engineering, Civil Engineering"))
        val proposalsDTO = listOf(ProposalDTO(
            UUID.randomUUID(),
            "Advanced algorithms for image processing",
            teacher,
            listOf("Paolo Ricci", "Mario Rossi"),
            listOf("image processing"),
            listOf("in external company"),
            listOf("G13","G21"),
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            listOf("Computer Engineering", "Electrical Engineering")
        ))

        every { proposalRepository.findAll() } returns proposals

        // Call the method
        val result = proposalService.getAllProposals()

        // Add assertions as needed
        assertEquals(proposals.size, result.size)
        assertEquals(proposalsDTO.first().expiration, result.first().expiration)
        // Add more specific assertions based on your application's logic
    }
    @Test
    fun `test getProposalsByCds`() {
        val localDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val localDate2 = LocalDate.parse("2026-07-21", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        // Arrange
        val cds = "Computer Engineering"
        val proposalList = listOf(Proposal("Advanced algorithms for image processing",
            Teacher("Luca", "Ferrari"),
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "in external company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            "Computer Engineering, Civil Engineering"),
            Proposal("Proposal 2",
                Teacher("Paolo", "Ricci"),
                "" ,
                "image processing",
                "research",
                "G21",
                "The description of the proposal",
                "Basics knowledge",
                "Collaboration with company equipe. Reimbursement of expenses",
                localDate2,
                "MSc",
                "Computer Engineering"))
        every { proposalRepository.findByCds(cds) } returns proposalList

        // Act
        val result = proposalService.getProposalsByCds(cds)

        // Assert
        assertEquals(proposalList.map { it.toDTO() }, result)
    }

    @Test
    fun `test searchProposals`() {
        val localDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        // Arrange
        val query = "image"
        val proposalList = listOf(Proposal("Advanced algorithms for image processing",
            Teacher("Luca", "Ferrari"),
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "in external company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            "Computer Engineering, Civil Engineering"))
        every { proposalRepository.searchProposals(query) } returns proposalList

        // Act
        val result = proposalService.searchProposals(query)

        // Assert
        assertEquals(proposalList.map { it.toDTO() }, result)
    }

    @Test
    fun `test searchProposalByStudentCds`() {
        // Arrange
        val studentId = "s123456"
        val query = "something"
        val cdsName = "Computer Engineering"
        val student = Student(degree = Degree(titleDegree = cdsName))
        val localDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val localDate2 = LocalDate.parse("2026-07-21", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val proposalList = listOf(Proposal("Advanced algorithms for image processing",
            Teacher("Luca", "Ferrari"),
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "in external company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            "Computer Engineering, Civil Engineering"),
            Proposal("Proposal 2",
                Teacher("Paolo", "Ricci"),
                "" ,
                "image processing",
                "research",
                "G21",
                "The description of the proposal",
                "Basics knowledge",
                "Collaboration with company equipe. Reimbursement of expenses",
                localDate2,
                "MSc",
                "Computer Engineering"))
        every { studentRepository.findById(studentId) } returns Optional.of(student)
        every { proposalRepository.searchProposals(query) } returns proposalList

        // Act
        val result = proposalService.searchProposalByStudentCds(studentId, query)

        // Assert
        assertEquals(proposalList.map { it.toDTO() }, result)
        verify (exactly = 1) { proposalRepository.searchProposals(query) }
        verify (exactly = 0) { proposalRepository.findByCds(any()) }
    }
    @Test
    fun `test searchProposalByStudentCds without query`() {
        // Arrange
        val studentId = "s123456"
        val query = ""
        val cdsName = "Computer Engineering"
        val student = Student(degree = Degree(titleDegree = cdsName))
        val localDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val localDate2 = LocalDate.parse("2026-07-21", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val proposalList = listOf(Proposal("Advanced algorithms for image processing",
            Teacher("Luca", "Ferrari"),
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "in external company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            "Computer Engineering, Civil Engineering"),
            Proposal("Proposal 2",
                Teacher("Paolo", "Ricci"),
                "" ,
                "image processing",
                "research",
                "G21",
                "The description of the proposal",
                "Basics knowledge",
                "Collaboration with company equipe. Reimbursement of expenses",
                localDate2,
                "MSc",
                "Computer Engineering"))
        every { studentRepository.findById(studentId) } returns Optional.of(student)
        every { proposalRepository.searchProposals(query) } returns proposalList
        every { proposalRepository.findByCds(cdsName) } returns proposalList

        // Act
        val result = proposalService.searchProposalByStudentCds(studentId, query)


        verify (exactly = 0) { proposalRepository.searchProposals(query) }
        verify (exactly = 1) { proposalRepository.findByCds(cdsName) }
        // Assert
        assertEquals(proposalList.map { it.toDTO() }, result)
    }
    @Test
    fun `searchProposalByStudentCds throws error if student not found`() {
        val studentId = "s000000"
        val query = "something"

        every { studentRepository.findById(studentId) } returns Optional.empty()

        assertThrows<NotFound> {
            proposalService.searchProposalByStudentCds(studentId, query)
        }

        verify (exactly = 0) { proposalRepository.findByCds(any()) }
        verify (exactly = 0) { proposalRepository.searchProposals(any()) }
    }
    @Test
    fun `test getDistinctSupervisors`(){
        val listSupervisors = listOf("Luca Ferrari", "Sofìa Garcìa")
        every { proposalRepository.findDistinctSupervisors() } returns listSupervisors

        val supervisors = proposalService.getDistinctSupervisors()

        assertEquals(listSupervisors.size, supervisors.size)
        assertEquals(listSupervisors.first(), supervisors.first())
        assertEquals(listSupervisors.last(), supervisors.last())
    }
    @Test
    fun `test getDistinctCoSupervisors`(){
        val listCoSupervisors = listOf("Ji-Sung Park", "Mario Rossi", "Sofìa Garcìa")
        every { proposalRepository.findDistinctCoSupervisors() } returns listCoSupervisors

        val coSupervisors = proposalService.getDistinctCoSupervisors()

        assertEquals(listCoSupervisors.size, coSupervisors.size)
        assertEquals(listCoSupervisors.first(), coSupervisors.first())
        assertEquals(listCoSupervisors.last(), coSupervisors.last())
    }
    @Test
    fun `test getDistinctProposalTypes`(){
        val listTypes = listOf("Research", "Development")
        every { proposalRepository.findDistinctProposalTypes() } returns listTypes

        val types = proposalService.getDistinctProposalTypes()

        assertEquals(listTypes.size, types.size)
        assertEquals(listTypes.first(), types.first())
        assertEquals(listTypes.last(), types.last())
    }
    @Test
    fun `test getDistinctProposalLevels`(){
        val listLevels = listOf("BSc", "MSc")
        every { proposalRepository.findDistinctProposalLevels() } returns listLevels

        val levels = proposalService.getDistinctProposalLevels()

        assertEquals(listLevels.size, levels.size)
        assertEquals(listLevels.first(), levels.first())
        assertEquals(listLevels.last(), levels.last())
    }
    @Test
    fun `test getDistinctProposalKeywords`(){
        val listKeywords = listOf("key1", "key2", "key3")
        every { proposalRepository.findDistinctProposalKeywords() } returns listKeywords

        val keywords = proposalService.getDistinctProposalKeywords()

        assertEquals(listKeywords.size, keywords.size)
        assertEquals(listKeywords.first(), keywords.first())
        assertEquals(listKeywords.last(), keywords.last())
    }
    @Test
    fun `test getDistinctProposalGroups`(){
        val listGroups = listOf("G13", "G21")
        every { proposalRepository.findDistinctProposalGroups() } returns listGroups

        val groups = proposalService.getDistinctProposalGroups()

        assertEquals(listGroups.size, groups.size)
        assertEquals(listGroups.first(), groups.first())
        assertEquals(listGroups.last(), groups.last())
    }
    @Test
    fun `test getDistinctProposalCds`(){
        val listCdS = listOf("Computer Engineering", "Civil Engineering")
        every { proposalRepository.findDistinctProposalCds() } returns listCdS

        val cds = proposalService.getDistinctProposalCds()

        assertEquals(listCdS.size, cds.size)
        assertEquals(listCdS.first(), cds.first())
        assertEquals(listCdS.last(), cds.last())
    }

    @Test
    fun testDeleteProposalById() {
        // Mock data
        val proposalId = UUID.randomUUID()

        val application = Application(
            student = Student(name = "John", surname = "Doe", email = "john.doe@example.com"),
            proposal = Proposal(
                title = "Test Proposal",
                supervisor = mockk(),
                coSupervisors = "CoSupervisor1, CoSupervisor2",
                keywords = "Keyword1, Keyword2",
                type = "Type1",
                groups = "Group1, Group2",
                description = "Test Description",
                requiredKnowledge = "Required Knowledge",
                notes = "Test Notes",
                expiration = LocalDate.now(),
                level = "Level1",
                cds = "CDS1"
            ),
            status = "pending"
        )

        // Mock behavior
        every { applicationRepository.findByProposalId(proposalId) } returns listOf(application)
        every { applicationRepository.delete(application) } just Runs
        every { proposalRepository.deleteById(proposalId) } just Runs

        // Call the method
        proposalService.deleteProposalById(proposalId)

        // Verify that findByProposalId method was called
        verify(exactly = 1) { applicationRepository.findByProposalId(proposalId) }

        // Verify that delete method was called for each application
        verify(exactly = 1) { applicationRepository.delete(application) }

        // Verify that deleteById method was called for the proposal
        verify(exactly = 1) { proposalRepository.deleteById(proposalId) }
    }
    @Test
    fun testCopyProposal() {
        // Mock data
        val proposalId = UUID.randomUUID()
        val originalProposal = Proposal(
            title = "Test Proposal",
            supervisor = mockk(),
            coSupervisors = "CoSupervisor1, CoSupervisor2",
            keywords = "Keyword1, Keyword2",
            type = "Type1",
            groups = "Group1, Group2",
            description = "Test Description",
            requiredKnowledge = "Required Knowledge",
            notes = "Test Notes",
            expiration = LocalDate.now(),
            level = "Level1",
            cds = "CDS1"
        )

        // Mock behavior
        every { proposalRepository.findById(proposalId) } returns Optional.of(originalProposal)
        // Capture the argument passed to the save function
        val savedProposalSlot = slot<Proposal>()
        every { proposalRepository.save(capture(savedProposalSlot)) } answers { savedProposalSlot.captured }
        // Call the method
        val copiedProposal = proposalService.copyProposal(proposalId)

        // Verify that findById method was called for the original proposal
        verify(exactly = 1) { proposalRepository.findById(proposalId) }

        // Verify that save method was called for the copied proposal
        verify(exactly = 1) { proposalRepository.save(any()) }

        // Assertions
        // Compare fields of the original and copied proposals
        assertEquals(originalProposal.title, copiedProposal.title)
        assertEquals(originalProposal.supervisor, copiedProposal.supervisor)
        assertEquals(originalProposal.coSupervisors, copiedProposal.coSupervisors)
        assertEquals(originalProposal.keywords, copiedProposal.keywords)
        assertEquals(originalProposal.type, copiedProposal.type)
        assertEquals(originalProposal.groups, copiedProposal.groups)
        assertEquals(originalProposal.description, copiedProposal.description)
        assertEquals(originalProposal.requiredKnowledge, copiedProposal.requiredKnowledge)
        assertEquals(originalProposal.notes, copiedProposal.notes)
        assertEquals(originalProposal.expiration, copiedProposal.expiration)
        assertEquals(originalProposal.level, copiedProposal.level)
        assertEquals(originalProposal.cds, copiedProposal.cds)
    }

    @Test
    fun `test getting the proposals of a professor`(){
        val professorId = "p101"
        val teacher = Teacher("Ferrari", "Luca")
        val localDate: LocalDate = LocalDate.parse("2024-04-23", DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        val proposalsList = listOf(Proposal("Advanced algorithms for image processing",
            teacher,
            "Paolo Ricci, Mario Rossi" ,
            "image processing",
            "in external company",
            "G13,G21",
            "Work in a company to develop new algorithms for image processing",
            "Basics of machine learning and image processing",
            "Collaboration with company equipe. Reimbursement of expenses",
            localDate,
            "MSc",
            "Computer Engineering, Civil Engineering"))

        every { proposalRepository.findAllBySupervisorId(any()) } returns proposalsList

        val proposals = proposalService.getProposalByProfessorId(professorId)

        assertEquals(proposalsList.size, proposals.size)
        assertEquals(proposalsList.first().title, proposals.first().title)
    }

}