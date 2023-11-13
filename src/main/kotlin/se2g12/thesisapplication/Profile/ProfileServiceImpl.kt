package se2g12.thesisapplication.Profile


import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ProfileServiceImpl(private val profileRepository: ProfileRepository):ProfileService {
    override fun addProfile(profile: ProfileDTO): ProfileDTO {

        if(profileRepository.findByIdOrNull(profile.username)==null) {
            profileRepository.save(profile.toProfile())
            return profile
        }
        else
            throw UsernameConflictException("Username already used")
    }

    override fun removeProfile(username: String) {
        profileRepository.deleteById(username)
    }

    override fun getProfileInfo(username: String): ProfileDTO {
        return profileRepository.findByIdOrNull(username)?.toDTO() ?: throw PrimaryKeyNotFoundException("username not found in DB")
    }

    override fun updateProfile(username: String, profile: ProfileDTO): ProfileDTO {

        if(profileRepository.findByIdOrNull(username)==null)           //se non esisteva vecchia mail
            throw PrimaryKeyNotFoundException("Email not found in DB")
        if(profileRepository.findByIdOrNull(profile.username)!=null && username!=profile.username)   //se email nuova esiste già
            throw UsernameConflictException("New Username is already used")
        profileRepository.deleteById(username)
        val profileToADD=profile.toProfile()
        profileRepository.save(profileToADD)
        return profile;
    }

    override fun getAllProfiles() : List<ProfileDTO>{
        return profileRepository.findAll().map { it.toDTO() }
    }

}