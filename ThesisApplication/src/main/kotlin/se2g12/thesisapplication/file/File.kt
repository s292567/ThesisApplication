package se2g12.thesisapplication.file

import jakarta.persistence.*
import java.util.*

@Entity
class File(
        @Lob
        @Basic(fetch = FetchType.LAZY)
        var file: ByteArray? = null,
        var contentType: String,
        var fileName: String,
) {
    @Id
    @GeneratedValue(generator = "uuid2")
    var fileId: UUID? = null

}