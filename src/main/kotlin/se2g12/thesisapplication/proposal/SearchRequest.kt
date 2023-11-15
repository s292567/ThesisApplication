package se2g12.thesisapplication.proposal

data class SearchRequest(
    val title: String?,
    val supervisorName: String?,
    val coSupervisors: String?,
    val keywords: String?,
    val cds: String?,
    val level: String?,
    val description: String?
)