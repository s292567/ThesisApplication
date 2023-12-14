package se2g12.thesisapplication.professor

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.archive.ArchiveServiceImpl
import se2g12.thesisapplication.proposal.*
import se2g12.thesisapplication.teacher.TeacherRepository
import java.util.*

@RestController
@CrossOrigin
class ProfessorController(
    private val proposalService: ProposalService,
    private val proposalRepository: ProposalRepository,
    private val teacherRepository: TeacherRepository,
    private val archiveService: ArchiveServiceImpl
) {

    @PostMapping("/API/thesis/proposals/{professorId}")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewProposal(@RequestBody obj: NewProposalDTO, @PathVariable professorId:String){
        println(obj)
        proposalService.addNewProposal(obj, professorId)
    }
    @PutMapping("/API/thesis/proposals/update/{path}")
    //@PreAuthorize("hasRole('Professor')")
    @ResponseStatus(HttpStatus.CREATED)
    fun updateProposal(@PathVariable path: String, @RequestBody proposal: NewProposalDTO?) {
        val old=proposalRepository.findById(UUID.fromString(path)).get()
        val oldName:String=old.title
        val professorId:String = old.supervisor.id!!

        proposalService.updateProposal(proposal!!,professorId,oldName,old)
    }
    @GetMapping("/API/thesis/proposals/getProfessorProposals/{professorId}")
    fun getProposalByProfessorId(@PathVariable professorId:String):List<ProposalDTO> {
        return proposalService.getProposalByProfessorId( professorId ).filter{archiveService.findByPropId(it.id!!).isEmpty()}
    }
}