package se2g12.thesisapplication.proposal

import java.time.LocalDate


data class ProposalFilterCriteria(
    val supervisor: String?,
    val coSupervisors: List<String>?,
    val keywords: List<String>?,
    val types: List<String>?,
    val groups: List<String>?,
    val cds: List<String>?,
    val queryString: String?,
    val startDate: LocalDate = LocalDate.now(),
    val endDate: LocalDate?
)