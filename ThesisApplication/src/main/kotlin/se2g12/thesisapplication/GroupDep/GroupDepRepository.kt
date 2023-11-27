package se2g12.thesisapplication.GroupDep

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import se2g12.thesisapplication.proposal.Proposal
import java.util.*

@Repository
interface GroupDepRepository :JpaRepository<GroupDep, String> {
}