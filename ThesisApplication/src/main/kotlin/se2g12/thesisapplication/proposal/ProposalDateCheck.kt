package se2g12.thesisapplication.proposal

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import se2g12.thesisapplication.archive.Archive
import se2g12.thesisapplication.archive.ArchiveRepository
import java.time.LocalDate


@Component
class ProposalDateCheck (private val archiveRepository: ArchiveRepository,private val proposalRepository: ProposalRepository){
    @Scheduled(fixedRate = 1000 * 60 * 60 * 24) // Run every 24 hours
    fun checkForDateChanges() {
        var expiredList=proposalRepository.findByExpirationBefore(LocalDate.now())
        if (expiredList.isNotEmpty())
            expiredList.forEach {
                if(archiveRepository.findByProposalId(it.id!!).isNotEmpty())
                archiveRepository.save(Archive(it)) }
    }
}