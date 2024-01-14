package se2g12.thesisapplication.request


class NewRequestDTO (
    val title: String,
    val description: String,
    val supervisorId: String,
    //  saved as name and surname separeted by commas
    val coSupervisors: List<String>,
)
