package se2g12.thesisapplication.Profile

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class ProfileController(private val profileService: ProfileService) {
    @GetMapping("/API/profiles/{username}")
    @ResponseStatus(HttpStatus.OK)
    fun getProfile(@PathVariable username:String):ProfileDTO?{
        return profileService.getProfileInfo(username)
    }}
