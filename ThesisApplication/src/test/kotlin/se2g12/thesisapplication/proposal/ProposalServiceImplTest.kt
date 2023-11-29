package se2g12.thesisapplication.proposal
import io.mockk.*
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.extension.ExtendWith
import se2g12.thesisapplication.GroupDep.GroupDep
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.degree.Degree
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.department.Department
import se2g12.thesisapplication.student.Student
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

@ExtendWith(MockKExtension::class)
class ProposalServiceImplTest {

    private lateinit var proposalRepository: ProposalRepository
    private lateinit var teacherRepository: TeacherRepository
    private lateinit var studentRepository: StudentRepository
    private lateinit var groupDepRepository: GroupDepRepository
    private lateinit var proposalService: ProposalServiceImpl


    @BeforeEach
    fun setUp() {
        proposalRepository = mockk()
        teacherRepository = mockk()
        studentRepository = mockk()
        groupDepRepository = mockk()
        proposalService = ProposalServiceImpl(proposalRepository, teacherRepository, studentRepository, groupDepRepository)
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
        every { teacherRepository.findByEmail(professorId) } returns listOf(Teacher("Ferrari", "Luca", "p101@example.com", gr13))
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
    fun testGetAllProposals() {
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
}