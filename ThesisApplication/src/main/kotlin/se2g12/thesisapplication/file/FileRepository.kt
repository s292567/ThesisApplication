package se2g12.thesisapplication.file

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*
@Repository
interface FileRepository: JpaRepository<File, UUID> {

}