package se2g12.thesisapplication.security



import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import se2g12.thesisapplication.Profile.PrimaryKeyNotFoundException
import se2g12.thesisapplication.Profile.ProfileDTO
import se2g12.thesisapplication.Profile.ProfileService
import java.net.URI
import java.net.URLEncoder
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse.BodyHandlers


@RestController
@CrossOrigin
class SecurityController (private val userService: UserService, private val profileService: ProfileService){
    @Value("\${KEYCLOAK_IP}")
    lateinit var ip :String

    @PostMapping("/user/validate/")
    @ResponseStatus(HttpStatus.OK)
    fun userValidate(@RequestBody userDTO: UserDTO):String{
        val url = "http://${ip}:8080/realms/ThesisRealm/protocol/openid-connect/token"

        val bodyMap=mapOf(
            "grant_type" to "password",
            "client_id" to "springboot-keycloak-client",
            "username" to userDTO.username,
            "password" to userDTO.password
        )
        val body =bodyMap.map { (key, value) -> "$key=${URLEncoder.encode(value, "UTF-8")}" }.joinToString("&")
        val client = HttpClient.newBuilder().build()
        val request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build()

        val response = client.send(request, BodyHandlers.ofString())
        if(!response.body().contains("access_token")){
            throw WrongCredentialsExceptions("credential not found")
        }
        try{

            profileService.getProfileInfo(userDTO.username)
        }
            catch(ex: PrimaryKeyNotFoundException){

                var profileinfo=userService.findByUsername(userDTO.username).first()
                profileService.addProfile(ProfileDTO(userService.getRoleById(profileinfo.id).find { it=="Student" || it=="Professor" ||it=="Admin"}.toString(),profileinfo.username))
            }
        return response.body()

    }

    @PostMapping("/user/signup")
    @ResponseStatus(HttpStatus.CREATED)
    fun userSignup(@RequestBody userDTO: UserDTO): ResponseEntity<URI>{
       return userCreationByDTOAndRole(userDTO,"Student")

    }

    @PostMapping("/user/createUser/{roleName}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_Admin')")
    fun createUser(@RequestBody userDTO: UserDTO, @PathVariable roleName: String): ResponseEntity<URI> {

       return userCreationByDTOAndRole(userDTO,roleName)

    }

    @GetMapping("/user/getUsersByRole")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_Admin')")
    fun getUsersByRole(@RequestParam(required = true, defaultValue = "Client") roleName:String):List<UserDTO>{
        return userService.getListUserByRole(roleName);
    }
    private fun userCreationByDTOAndRole(userDTO: UserDTO, roleName:String) :ResponseEntity<URI> {
        val role = userService.findRoleByName(roleName)
        profileService.addProfile(ProfileDTO(role.name,userDTO.username))

        val response = userService.create(userDTO)

        if (response.status != 201) {
            profileService.removeProfile(userDTO.username)
            if (response.status == 409) {

                throw UsernameAlreadyExistException("Username already exists, cannot create")
            } else throw RuntimeException("User was not created")
        } else {

            userService.assignRoleWithUsername(userDTO.username, role)

            return ResponseEntity.created(response.location).build()
        }
    }
}
