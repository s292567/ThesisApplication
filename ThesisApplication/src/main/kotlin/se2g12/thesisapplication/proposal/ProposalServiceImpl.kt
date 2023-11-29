package se2g12.thesisapplication.proposal

import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import se2g12.thesisapplication.GroupDep.GroupDepRepository
import se2g12.thesisapplication.degree.DegreeRepository
import se2g12.thesisapplication.student.StudentRepository
import se2g12.thesisapplication.teacher.TeacherRepository
import java.text.SimpleDateFormat
import java.time.Instant
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*


@Service
class ProposalServiceImpl (
    private val proposalRepository: ProposalRepository,
    private val teacherRepository: TeacherRepository,
    private val studentRepository: StudentRepository,
    private val groupDepRepository: GroupDepRepository)
    : ProposalService {
    override fun updateProposal(newProposal: NewProposalDTO, professorId: String,oldName:String):ProposalDTO {
        println(proposalRepository.findAll().filter{it.title==oldName})
        println(professorId)
        println(oldName)
        val old= proposalRepository.findAll().filter{it.title==oldName}.first()
        val message=checkProposal(newProposal)
        if(message=="") {
            old.title=newProposal.title!!
            old.supervisor=teacherRepository.findByEmail("$professorId@example.com").first()
            old.coSupervisors=newProposal.coSupervisors!!.joinToString(separator = ",")
            old.keywords=newProposal.keywords!!.joinToString(separator = ",")
            old.type=newProposal.type!!
            old.groups=newProposal.groups!!.joinToString(separator = ",")
            old.description=newProposal.description!!
            old.requiredKnowledge=newProposal.requiredKnowledge
            old.notes=newProposal.notes
            val dateFormat = SimpleDateFormat("yyyy-MM-dd")

            val expirationDate: Date = dateFormat.parse(newProposal.expiration)
            old.expiration=expirationDate
            old.level=newProposal.level!!
            old.cds= newProposal.CdS!!.joinToString(separator = ",")
            return proposalRepository.save(old).toDTO()
        }
        //add custom exception
        println(message)
        return old.toDTO()
    }
    private fun checkProposal(newProposal: NewProposalDTO):String{
        var message:String=""
        //date check
        val simpleDate=SimpleDateFormat("yyyy-MM-dd")
        val expirationDate=simpleDate.parse(newProposal.expiration)
        val currentDate=Date.from(Instant.now())
        if(currentDate.after(expirationDate))
            message= "$message expire date is before now"
        //check list of string
        if(newProposal.coSupervisors==null||newProposal.keywords==null)
            message += " coSupervisors or keyword is empty"
        //check type and level and cds
        //if(newProposal.type)
        newProposal.groups!!.forEach{if(groupDepRepository.findById(it).isEmpty)
            message +=" Group"+it+"not present"
        }
        if(newProposal.description!!.isEmpty())
            message +=" description is empty"
        return message

    }
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