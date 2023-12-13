package se2g12.thesisapplication.date

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.proposal.NewProposalDTO
import se2g12.thesisapplication.proposal.ProposalDateCheck
import java.time.LocalDate

@RestController
@CrossOrigin
class DateController (private val date: Date,private val proposalDateCheck: ProposalDateCheck){
    @PostMapping("/API/thesis/date/set/{dateString}")
    @ResponseStatus(HttpStatus.CREATED)
    fun virtualDateAdd( @PathVariable dateString: String){

        if(date.setDate(dateString))
        date.getDate()?.let { proposalDateCheck.checkForMyDateChanges(it) }

    }
    @GetMapping("/API/thesis/date/get/")
    fun virtualDateGet():LocalDate?{
        return date.getDate()
    }
}