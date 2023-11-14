package se2g12.thesisapplication.Profile

data class ProfileDTO (
    val username:String,
    val role:String
)
fun Profile.toDTO():ProfileDTO{
    return ProfileDTO(this.username!!,this.role!!)
}

fun ProfileDTO.toProfile():Profile{
    return Profile(this.username,this.role)
}