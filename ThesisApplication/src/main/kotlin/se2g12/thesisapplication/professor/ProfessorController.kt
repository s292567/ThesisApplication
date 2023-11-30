package se2g12.thesisapplication.professor

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.proposal.*
import se2g12.thesisapplication.teacher.TeacherRepository
import java.util.*

@RestController
@CrossOrigin
class ProfessorController(private val proposalService: ProposalService,private val proposalRepository: ProposalRepository,private val teacherRepository: TeacherRepository) {

    @PostMapping("/API/thesis/proposals/{professorId}")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewProposal(@RequestBody obj: NewProposalDTO, @PathVariable professorId:String){
        proposalService.addNewProposal(obj, professorId)
    }
    @PutMapping("/API/thesis/proposals/update/{path}")
    //@PreAuthorize("hasRole('Professor')")
    @ResponseStatus(HttpStatus.CREATED)
    fun updateProposal(@PathVariable path: String, @RequestBody proposal: NewProposalDTO?) {
        var old=proposalRepository.findById(UUID.fromString(path)).get()
        var professorId:String
        var oldName:String=old.toDTO().title
        professorId=old.toDTO().supervisor.id!!

        proposalService.updateProposal(proposal!!,professorId,oldName,old)
    }
    @GetMapping("/API/thesis/proposals/getProfessorProposals/{professorId}")
    fun getProposalByProfessorId(@PathVariable professorId:String):List<ProposalDTO> {
        return proposalService.getProposalByProfessorId( professorId );
    }
}