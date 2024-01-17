package se2g12.thesisapplication.security

import org.keycloak.admin.client.Keycloak
import org.keycloak.representations.idm.RoleRepresentation
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@Service
class   UserService(
    private val keycloak: Keycloak,
    @Value("\${keycloak.realm}")
    private val realm: String
) {

    fun findByUsername(username: String): List<UserRepresentation> =
        keycloak
            .realm(realm)
            .users()
            .search(username)
    fun findRoleByName(roleName: String): RoleRepresentation =
        keycloak
            .realm(realm)
            .roles()
            .get(roleName)
            .toRepresentation()
    fun assignRoleWithUsername(username: String, roleRepresentation: RoleRepresentation) {
        var resultSearch= findByUsername(username)
        if (resultSearch.isEmpty()){
            throw UsernameNotFoundException("Cannot find the username")
        }

        val user=resultSearch.first()

        keycloak
            .realm(realm)
            .users()
            .get(user.id)
            .roles()
            .realmLevel()
            .add(listOf(roleRepresentation))
    }
}
