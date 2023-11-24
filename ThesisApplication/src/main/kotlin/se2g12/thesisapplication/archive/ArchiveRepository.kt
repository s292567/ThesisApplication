package se2g12.thesisapplication.archive

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface ArchiveRepository : JpaRepository<Archive, UUID> {
}