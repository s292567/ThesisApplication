package se2g12.thesisapplication.request

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RequestRepository : JpaRepository<Request, UUID> {

    fun findBySecretaryStatusLike(secretaryStatus: String): List<Request>

    fun findBySupervisorId(supervisorId: String): List<Request>
    fun findBySupervisorIdAndSecretaryStatusLikeAndSupervisorStatusLike(supervisorId: String,
                                                                        secretaryStatus: String,
                                                                        supervisorStatus: String): List<Request>

}