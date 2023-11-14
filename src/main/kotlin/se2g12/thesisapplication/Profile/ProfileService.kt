package se2g12.thesisapplication.Profile

interface ProfileService {
    fun addProfile(profile:ProfileDTO):ProfileDTO
    fun removeProfile(username: String)
    fun getProfileInfo(username:String):ProfileDTO
    fun updateProfile(username: String,profile: ProfileDTO):ProfileDTO
    fun getAllProfiles(): List<ProfileDTO>
}