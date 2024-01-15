package se2g12.thesisapplication.requestChange

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RequestChangeRepository: JpaRepository<RequestChange, UUID> {
}