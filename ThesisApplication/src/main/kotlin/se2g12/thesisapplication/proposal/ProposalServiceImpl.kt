package se2g12.thesisapplication.proposal

import jakarta.transaction.Transactional
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
    private val studentRepository: StudentRepository)
    : ProposalService {
    @Transactional
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

        val expirationDate = newProposal.expiration
        val proposal = Proposal(newProposal.title, supervisor,
            newProposal.coSupervisors?.joinToString(", ") { it },
            newProposal.keywords.joinToString(", ") { it },
            newProposal.type.joinToString(", ") { it },
            newProposal.groups.joinToString(", ") { it },
            newProposal.description,
            newProposal.requiredKnowledge, newProposal.notes,
            expirationDate, newProposal.level,
            newProposal.CdS.joinToString(", ") { it })
        proposalRepository.save(proposal)

    }
    //getAll

    override fun getAllProposals(): List<ProposalDTO> {
        return proposalRepository.findAll().map { it.toDTO() }
    }

    //getByCds
    override fun getProposalsByCds(cds: String): List<ProposalDTO> {
        return proposalRepository.findByCds(cds).map { it.toDTO() }
    }

    override fun searchProposals(query: String): List<ProposalDTO> {
        return proposalRepository.searchProposals(query).map { it.toDTO() }
    }
    override fun searchProposalByStudentCds(studentId: String, query: String? ): List<ProposalDTO> {
        val cdsName = studentRepository.findById(studentId).get().degree!!.titleDegree!!
        if (query.isNullOrBlank())
            return getProposalsByCds(cdsName)
        return proposalRepository.searchProposals(query)
        // filtering if the proposal contains the cdsCode in the field cds (a list of cds codes)
            .filter { it.cds.split(", ", ",").contains(cdsName) }
            .map { it.toDTO() }
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
    override fun searchProposalsWithFilters(
        supervisorName: String?,
        coSupervisors: String?,
        keywords: String?,
        types: String?,
        groups: String?,
        cds: String?,
        query: String?,
        startDate: Date?,
        endDate: Date?
    ): List<ProposalDTO> {
        return proposalRepository.searchProposalsWithFilters(
            supervisorName,
            coSupervisors,
            keywords,
            types,
            groups,
            cds,
            query,
            startDate,
            endDate
        ).map { it.toDTO() }
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

    override fun getDistinctSupervisors(): List<String> {
        return proposalRepository.findDistinctSupervisors()
    }

    override fun getDistinctCoSupervisors(): List<String> {
        return proposalRepository.findDistinctCoSupervisors()
    }

    override fun getDistinctProposalTypes(): List<String> {
        return proposalRepository.findDistinctProposalTypes()
    }

    override fun getDistinctProposalLevels(): List<String> {
        return proposalRepository.findDistinctProposalLevels()
    }

    override fun getDistinctProposalKeywords(): List<String> {
        return proposalRepository.findDistinctProposalKeywords()
    }

    override fun getDistinctProposalGroups(): List<String> {
        return proposalRepository.findDistinctProposalGroups()
    }

    override fun getDistinctProposalCds(): List<String> {
        return proposalRepository.findDistinctProposalCds()
    }

}