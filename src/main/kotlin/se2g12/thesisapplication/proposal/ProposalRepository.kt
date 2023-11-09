package se2g12.thesisapplication.proposal

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface ProposalRepository : JpaRepository<Proposal, UUID> {
}