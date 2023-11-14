package se2g12.thesisapplication.professor

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
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
}