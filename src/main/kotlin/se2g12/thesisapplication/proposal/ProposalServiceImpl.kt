package se2g12.thesisapplication.proposal

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.text.SimpleDateFormat
import java.util.*


@Service
class ProposalServiceImpl (
    private val proposalRepository: ProposalRepository,
    private val teacherRepository: TeacherRepository)
    : ProposalService {
    //@PreAuthorize("hasRole('')")
    override fun addNewProposal(newProposal: NewProposalDTO, professorId: String) {
        // username=email of the logged in professor; check if ok
        val supervisor = teacherRepository.findById(professorId).get()
        newProposal.checkBody()

        val possibleGroups: MutableList<String?> = mutableListOf(supervisor.group?.id)
        if(! newProposal.coSupervisors.isNullOrEmpty()){
            for (coSup in newProposal.coSupervisors!!){
//                string as: "name surname"
                val (name, surname) = coSup.split(" ")
                val t = teacherRepository.findByNameSurname(name, surname)
                if (t.isNotEmpty()){
                    // internal co-supervisor
                    possibleGroups.add(t.first().group?.id)
                }
                // else external co-sup
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
    private fun getAuth(): Teacher {
//        authUser == email
        val authUser = SecurityContextHolder.getContext().authentication.name
        return teacherRepository.findByEmail(authUser).first()
    }
}