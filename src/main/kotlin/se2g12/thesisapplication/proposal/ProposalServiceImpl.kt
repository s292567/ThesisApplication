package se2g12.thesisapplication.proposal

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.text.SimpleDateFormat
import java.util.*


@Service
class ProposalServiceImpl (
    private val proposalRepository: ProposalRepository,
    private val teacherRepository: TeacherRepository,
    private val degreeRepository: DegreeRepository,
    private val studentRepository: StudentRepository)
    : ProposalService {
    override fun addNewProposal(newProposal: NewProposalDTO, professorId: String) {
        // username=email of the logged in professor
        val supervisor = teacherRepository.findByEmail(professorId).first()
        val newPropGroups = newProposal.groups.map { it.uppercase(Locale.getDefault()) }
        val possibleGroups: MutableList<String?> = mutableListOf(supervisor.group?.id)
        if(! newProposal.coSupervisors.isNullOrEmpty()){
            for (coSup in newProposal.coSupervisors!!){
                try {
//                string as: "name surname"
                    val (name, surname) = coSup.split(" ")
                    val t = teacherRepository.findByNameSurname(name, surname)
                    if (t.isNotEmpty()) {
                        // internal co-supervisor
                        possibleGroups.add(t.first().group?.id)
                    }
                    // else external co-sup
                }catch (_: IndexOutOfBoundsException){
                    // the name was not in the form "name surname"
                }
            }

        }
        // checking the validity of groups
        newProposal.groups.forEach {
            if (!possibleGroups.contains(it)){
                throw ProposalBodyError("Invalid group $it: no supervisor belongs to it")
            }
        }

        val dateFormat = SimpleDateFormat("yyyy-MM-dd")

        val expirationDate: Date = dateFormat.parse(newProposal.expiration)
        val proposal = Proposal(newProposal.title, supervisor,
            newProposal.coSupervisors?.joinToString(", ") { it },
            newProposal.keywords.joinToString(", ") { it },
            newProposal.type,
            newProposal.groups.joinToString(", ") { it },
            newProposal.description,
            newProposal.requiredKnowledge, newProposal.notes,
            expirationDate, newProposal.level,
            newProposal.CdS.joinToString(", ") { it })
        proposalRepository.save(proposal)

    }
    //getAll
    override fun getAllProposals(): List<ProposalDTO> {
        return proposalRepository.findAll().map { it.toDTO(degreeRepository) }
    }

    //getByCds
    override fun getProposalsByCds(cds: String): List<ProposalDTO> {
        return proposalRepository.findByCds(cds).map { it.toDTO(degreeRepository) }
    }

    override fun searchProposals(query: String): List<ProposalDTO> {
        return proposalRepository.searchProposals(query).map { it.toDTO(degreeRepository) }
    }
    override fun searchProposalByStudentCds(studentId: String, query: String? ): List<ProposalDTO> {
        val cdsName = studentRepository.findById(studentId).get().degree!!.titleDegree!!
        if (query.isNullOrBlank())
            return getProposalsByCds(cdsName)
        return proposalRepository.searchProposals(query)
        // filtering if the proposal contains the cdsCode in the field cds (a list of cds codes)
            .filter { it.cds.split(", ", ",").contains(cdsName) }
            .map { it.toDTO(degreeRepository) }
    }

    //searchByAttributes----------------------- search functions of the previous search implementation
    override fun searchProposalsByTitle(title: String): List<Proposal> {
        return proposalRepository.findByTitleContaining(title)
    }
    override fun searchProposalsBySupervisorName(supervisorName: String): List<Proposal> {
        return proposalRepository.findBySupervisorNameContaining(supervisorName)
    }
    override fun searchProposalsBycoSupervisors(coSupervisors: String): List<Proposal> {
        return proposalRepository.findBycoSupervisorsContaining(coSupervisors)
    }
    override fun searchProposalsByKeywords(keyword: String): List<Proposal> {
        return proposalRepository.findByKeywordsContaining(keyword)
    }
    override fun searchProposalsByCds(cds: String): List<Proposal> {
        return proposalRepository.findByCdsContaining(cds)
    }
    override fun searchProposalsByLevel(level: String): List<Proposal> {
        return proposalRepository.findByLevelContaining(level)
    }
    override fun searchProposalsByDescription(description: String): List<Proposal> {
        return proposalRepository.findByDescriptionContaining(description)
    }
    //------------------------------------------
    override fun searchProposalsByTitleIgnoreCase(title: String): List<Proposal> {
        return proposalRepository.findByTitleIgnoreCaseContaining(title)
    }
    override fun searchProposalsBySupervisorNameIgnoreCase(supervisorName: String): List<Proposal> {
        return proposalRepository.findBySupervisorNameIgnoreCaseContaining(supervisorName)
    }
    override fun searchProposalsBycoSupervisorsIgnoreCase(coSupervisors: String): List<Proposal> {
        return proposalRepository.findBycoSupervisorsIgnoreCaseContaining(coSupervisors)
    }
    override fun searchProposalsByKeywordsIgnoreCase(keywords: String): List<Proposal> {
        return proposalRepository.findByKeywordsIgnoreCaseContaining(keywords)
    }
    override fun searchProposalsByCdsIgnoreCase(cds: String): List<Proposal> {
        return proposalRepository.findByCdsIgnoreCaseContaining(cds)
    }
    override fun searchProposalsByLevelIgnoreCase(level: String): List<Proposal> {
        return proposalRepository.findByLevelIgnoreCaseContaining(level)
    }
    override fun searchProposalsByDescriptionIgnoreCase(description: String): List<Proposal> {
        return proposalRepository.findByDescriptionIgnoreCaseContaining(description)
    }

}