package se2g12.thesisapplication.professor

import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.proposal.NewProposalDTO
import se2g12.thesisapplication.proposal.ProposalService

@RestController
@CrossOrigin
class ProfessorController(private val proposalService: ProposalService) {

    @PostMapping("/API/thesis/proposals/{professorId}")
    @ResponseStatus(HttpStatus.CREATED)
    fun addNewProposal(@RequestBody obj: NewProposalDTO, @PathVariable professorId:String){
        proposalService.addNewProposal(obj, professorId)
    }
    @PutMapping("/API/thesis/proposals/update/{path}")
    @PreAuthorize("hasRole('Professor')")
    @ResponseStatus(HttpStatus.CREATED)
    fun updateProposal(@PathVariable path: String, @RequestBody proposal: NewProposalDTO?) {
        var professorId:String
        var oldName:String
        var array =path.split("-")
        professorId=array.first()
        oldName=array.last()
        proposalService.updateProposal(proposal!!,professorId,oldName)
    }
}