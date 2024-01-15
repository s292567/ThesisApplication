package se2g12.thesisapplication.proposal

import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.application.ApplicationRepository
import se2g12.thesisapplication.application.ProposalNotFoundError
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.TeacherRepository
import java.time.LocalDate
import java.util.*


@Service
class ProposalServiceImpl(
    private val proposalRepository: ProposalRepository,
    private val teacherRepository: TeacherRepository,
    private val studentRepository: StudentRepository,
    private val groupDepRepository: GroupDepRepository,
    private val applicationRepository: ApplicationRepository,
    private val degreeRepository: DegreeRepository
)
    :ProposalService {
    override fun getProposalByProfessorId(supervisorId: String): List<ProposalDTO> {
        val prop = proposalRepository.findAllBySupervisorId(supervisorId)
        return prop.map{it.toDTO()}
    }

    override fun updateProposal(newProposal: NewProposalDTO, professorId: String,oldName:String,old: Proposal):ProposalDTO {
        if (professorId != old.supervisor.id)
            throw ForbiddenError("You ($professorId) cannot update a proposal of which you are not the supervisor (${old.supervisor.id})")
        println(proposalRepository.findAll().filter{it.title==oldName})
        val message=checkProposal(newProposal)
        if(message=="") {
            old.title=newProposal.title!!
            old.supervisor=teacherRepository.findById(professorId).get()
            old.coSupervisors=newProposal.coSupervisors!!.joinToString(separator = ",")
            old.keywords=newProposal.keywords!!.joinToString(separator = ",")
            old.type=newProposal.type!!.joinToString(separator = ",")
            old.groups=newProposal.groups!!.joinToString(separator = ",")
            old.description=newProposal.description!!
            old.requiredKnowledge=newProposal.requiredKnowledge
            old.notes=newProposal.notes
            old.expiration=newProposal.expiration
            old.level=newProposal.level!!
            old.cds= newProposal.cds!!.joinToString(separator = ",")
            return proposalRepository.save(old).toDTO()
        }
        else
            throw ProposalBodyError(message)
        //add custom exception
        return old.toDTO()
    }
    private fun checkProposal(newProposal: NewProposalDTO):String{
        var message=""
        //date check
        val currentDate=LocalDate.now()
        if(currentDate.isAfter(newProposal.expiration))
            message= "$message expire date is before now"
        //check list of string
        if(newProposal.coSupervisors.isNullOrEmpty()||newProposal.keywords.isNullOrEmpty())
            message += " coSupervisors or keyword is empty"
        //check type and level and cds
        //if(newProposal.type)
        newProposal.groups!!.forEach{if(groupDepRepository.findById(it).isEmpty)
            message += " Group $it not present"
        }
        if(newProposal.description.isNullOrBlank())
            message +=" description is empty"
        return message

    }
    @Transactional
    override fun addNewProposal(newProposal: NewProposalDTO, professorId: String) {
        val supervisor = teacherRepository.findById(professorId).orElseThrow { NotFound("Professor $professorId not found") }
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
            newProposal.cds.joinToString(", ") { it })
        proposalRepository.save(proposal)

    }

    override fun deleteProposalById(proposalId: UUID) {
        // Proposal is deletable only if active (not archived)
        // associated applications not deleted but with status 'cancelled'
        // Delete associated applications
        val applications = applicationRepository.findByProposalId(proposalId)
        applications.forEach { applicationRepository.delete(it) }

        // Delete the proposal itself
        proposalRepository.deleteById(proposalId)
    }

    override fun copyProposal(proposalId: UUID): Proposal {
        val originalProposal = proposalRepository.findById(proposalId).orElseThrow {
            throw ProposalNotFoundError("Proposal not found!")
        }

        // Create a new proposal with the same attributes, excluding the ID
        val copiedProposal = Proposal(
            title = originalProposal.title,
            supervisor = originalProposal.supervisor,
            coSupervisors = originalProposal.coSupervisors,
            keywords = originalProposal.keywords,
            type = originalProposal.type,
            groups = originalProposal.groups,
            description = originalProposal.description,
            requiredKnowledge = originalProposal.requiredKnowledge,
            notes = originalProposal.notes,
            expiration = originalProposal.expiration,
            level = originalProposal.level,
            cds = originalProposal.cds
        )

        // Save the copied proposal
        val savedCopiedProposal = proposalRepository.save(copiedProposal)

        return savedCopiedProposal
    }

    //getAll

    override fun getAllProposals(): List<ProposalDTO> {
        return proposalRepository.findAll().map { it.toDTO() }
    }
    override fun getProposalById(proposalId: UUID): Proposal {
        return proposalRepository.findById(proposalId)
            .orElseThrow { ProposalNotFoundException("Proposal with ID $proposalId not found") }
    }
    class ProposalNotFoundException(message: String) : RuntimeException(message)

    //getByCds
    override fun getProposalsByCds(cds: String): List<ProposalDTO> {
        return proposalRepository.findByCdsContaining(cds)
            .map { it.toDTO() }
    }

    override fun searchProposals(query: String): List<ProposalDTO> {
        return proposalRepository.searchProposals(query).map { it.toDTO() }
    }
    override fun searchProposalByStudentCds(studentId: String, query: String? ): List<ProposalDTO> {
        val cdsName = studentRepository.findById(studentId).orElseThrow { NotFound("Student $studentId not found") }
            .degree!!.titleDegree!!
        if (query.isNullOrBlank())
            return getProposalsByCds(cdsName)
        return proposalRepository.searchProposals(query)
        // filtering if the proposal contains the cdsCode in the field cds (a list of cds codes)
            .filter { it.cds.split(", ", ",").contains(cdsName) }
            .map { it.toDTO() }
    }
    override fun getDistinctSupervisors(): List<String> {
        return proposalRepository.findDistinctSupervisors()
    }

    override fun findDistinctSupervisors(): List<String> {
        return proposalRepository.findDistinctSupervisors()
    }

    override fun findDistinctCoSupervisors(): List<String> {
        return getAllProposals().flatMap { it.coSupervisors.orEmpty() }.distinct()
    }

    override fun findDistinctProposalTypes(): List<String> {
        return getAllProposals().flatMap { it.type.orEmpty() }.distinct()
    }

    override fun findDistinctProposalLevels(): List<String> {
        return getAllProposals().mapNotNull { it.level }.distinct()
    }

    override fun findDistinctProposalKeywords(): List<String> {
        return getAllProposals().flatMap { it.keywords.orEmpty() }.distinct()
    }

    override fun findDistinctProposalGroups(): List<String> {
        return getAllProposals().flatMap { it.groups.orEmpty() }.distinct()
    }

    override fun findDistinctProposalCds(): List<String> {
        return getAllProposals().flatMap { it.cds.orEmpty() }.distinct()
    }

}