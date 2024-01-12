package se2g12.thesisapplication.archive

import java.util.UUID

interface ArchiveService {
    fun findByPropId(proposalId:UUID):List<Archive>
    fun getAll():List<Archive>
}