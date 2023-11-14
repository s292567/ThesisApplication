package se2g12.thesisapplication.Profile

data class ProfileDTO (
    val role:String,
    val username:String

)
fun Profile.toDTO():ProfileDTO{
    return ProfileDTO(this.role!!,this.username!!)
}

fun ProfileDTO.toProfile():Profile{
    return Profile(this.role,this.username)
}