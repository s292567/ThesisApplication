package se2g12.thesisapplication.teacher

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface TeacherRepository : JpaRepository<Teacher, UUID> {
}