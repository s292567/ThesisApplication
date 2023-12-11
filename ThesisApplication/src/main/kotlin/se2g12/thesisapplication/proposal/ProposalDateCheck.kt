package se2g12.thesisapplication.proposal

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveRepository
import se2g12.thesisapplication.date.Date
import java.time.LocalDate


@Component
class ProposalDateCheck (private val date: Date,private val archiveRepository: ArchiveRepository,private val proposalRepository: ProposalRepository){
    @Scheduled(fixedRate = 1000 * 60 * 30) // Run every 30 min
    fun checkForDateChanges() {
        if(date.getDate()==null|| date.getDate()!!.isBefore(LocalDate.now())) {
            var expiredList = proposalRepository.findByExpirationBefore(LocalDate.now())
            if (expiredList.isNotEmpty())
                expiredList.forEach {
                    if (archiveRepository.findByProposalId(it.id!!).isNotEmpty())
                        archiveRepository.save(Archive(it))
                }
        }

    }
    fun checkForMyDateChanges(date: LocalDate){
        var expiredList = proposalRepository.findByExpirationBefore(date)
        if (expiredList.isNotEmpty())
            expiredList.forEach {
                if (archiveRepository.findByProposalId(it.id!!).isNotEmpty())
                    archiveRepository.save(Archive(it))
            }
    }
}