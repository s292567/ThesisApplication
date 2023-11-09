package se2g12.thesisapplication.proposal

import org.springframework.stereotype.Service
import se2g12.thesisapplication.teacher.Teacher
import se2g12.thesisapplication.teacher.TeacherRepository
import java.util.Date

@Service
class ProposalServiceImpl (
    private val proposalRepository: ProposalRepository,
    private val teacherRepository: TeacherRepository)
    : ProposalService {
    override fun addNewProposal(newProposal: NewProposalDTO) {
//      TODO("define how to retrieve supervisor and co-supervisor")
        newProposal.checkBody()
        val supervisor = Teacher()
        val coSupervisors= listOf(Teacher(), Teacher())
        val expiration = Date()
//      TODO("add check of groups")
        val proposal = Proposal(newProposal.title,
            supervisor, coSupervisors, newProposal.keywords, newProposal.type,
            newProposal.groups, newProposal.description, newProposal.requiredKnowledge, newProposal.notes,
            expiration, newProposal.level, newProposal.CdS)
        proposalRepository.save(proposal)

    }
}