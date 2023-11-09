package se2g12.thesisapplication.proposal

import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import java.util.*

data class NewProposalDTO (
    var title : String,
    var supervisor : String,
    var coSupervisors : List<String>?,
    var keywords : List<String>,
    var type : String,
    var groups : String,
    var description : String,
    var requiredKnowledge : String?,
    var notes : String?,
    var expiration : String,
    var level: String,
    var CdS: List<String>
){
    fun checkBody(){
        if (title.trim() == "")
            throw ProposalBodyError("Title cannot be empty")
        if (supervisor.trim() == "")
            throw ProposalBodyError("Supervisor cannot be empty")
        if (description.trim() == "")
            throw ProposalBodyError("A description has to be given")
        if (level != "Bachelor" && level != "Master" )
            throw ProposalBodyError("Level should be Bachelor or Master")
        try {
            LocalDate.parse(expiration,DateTimeFormatter.ofPattern("YYYY-MM-DD"))
        } catch (e: DateTimeParseException){
            throw ProposalBodyError("Expiration should be in the format YYYY-MM-DD")
        }
        if(CdS.isEmpty()){
            throw ProposalBodyError("The proposal should belong to at least 1 CdS")
        }
    }
    fun toProposal():Proposal{
        return Proposal(title,supervisor, coSupervisors?: listOf(), keywords, type,
            groups, description, requiredKnowledge?:"", notes?:"", Date(expiration), level, CdS)
    }
}
