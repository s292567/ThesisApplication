package se2g12.thesisapplication.requestChange

import jakarta.persistence.*
import se2g12.thesisapplication.request.Request
import java.util.*

@Entity
data class RequestChange(
    @OneToOne
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    val request: Request,
    val info: String
    // or different strings for each value: title, description, co-sup
) {
    @Id
    @GeneratedValue(generator = "uuid2")
    val id: UUID?=null
}