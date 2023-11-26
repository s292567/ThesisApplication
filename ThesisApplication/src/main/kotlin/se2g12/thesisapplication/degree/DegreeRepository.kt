package se2g12.thesisapplication.degree

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface DegreeRepository : JpaRepository<Degree, String> {
}