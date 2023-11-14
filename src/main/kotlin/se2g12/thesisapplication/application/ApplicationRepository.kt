package se2g12.thesisapplication.application

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface ApplicationRepository : JpaRepository<Application, UUID> {
}