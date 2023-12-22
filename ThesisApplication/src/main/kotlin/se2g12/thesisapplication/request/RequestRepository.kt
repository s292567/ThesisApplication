package se2g12.thesisapplication.request

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import se2g12.thesisapplication.proposal.Proposal
import java.util.*

@Repository
interface RequestRepository : JpaRepository<Request, UUID> {

    fun findBySecretaryStatusLike(secretaryStatus: String): List<Request>

}