        package se2g12.thesisapplication.proposal

        import jakarta.persistence.Temporal
        import jakarta.persistence.TemporalType
        import se2g12.thesisapplication.teacher.Teacher
        import java.time.LocalDate
        import java.util.*

        data class ProposalDTO(
            val id: UUID?= null,
            val title: String,
            val supervisor: Teacher,
            val coSupervisors: List<String>? = null,
            val keywords: List<String>,
            val type: List<String>,
            val groups: List<String>,
            val description: String,
            val requiredKnowledge: String? = null,
            val notes: String? = null,
            @Temporal(TemporalType.DATE)
            var expiration : LocalDate,
            val level: String,
            val cds: List<String>
        )

        fun Proposal.toDTO(): ProposalDTO {
            val coSup = if (this.coSupervisors.isNullOrBlank())
                emptyList<String>()
            else
                this.coSupervisors.split(", ", ",")

            val key = if (this.keywords.isBlank())
                emptyList<String>()
            else
                this.keywords.split(", ", ",")

            val gr = if (this.groups.isBlank())
                emptyList<String>()
            else
                this.groups.split(", ", ",")

            val proposalTypes = if (this.type.isBlank())
                emptyList<String>()
            else
                this.type.split(", ", ",")

            val cdsNames = if (this.cds.isBlank())
                emptyList<String>()
            else
                this.cds.split(", ", ",")

            return ProposalDTO(
                this.id,
                this.title,
                this.supervisor,
                coSup,
                key,
                proposalTypes,
                gr,
                this.description,
                this.requiredKnowledge,
                this.notes,
                this.expiration,
                this.level,
                cdsNames // cdsNames is converted to List<String>
            )
        }