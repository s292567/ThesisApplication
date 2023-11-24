package se2g12.thesisapplication.security

import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkObject
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.keycloak.admin.client.Keycloak
import org.keycloak.admin.client.resource.*
import org.keycloak.representations.idm.CredentialRepresentation
import org.keycloak.representations.idm.RoleRepresentation
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.security.core.userdetails.UsernameNotFoundException
import javax.ws.rs.core.Response

class UserServiceTest {

    private val keycloak = mockk<Keycloak>()
    private val realm = "testRealm"
    private val userService = UserService(keycloak, realm)

    @Test
    fun `test findByUsername`() {
        // Arrange
        val username = "testUser"
        val userRepresentation = mockk<UserRepresentation>()

        every { keycloak.realm(realm).users().search(username) } returns listOf(userRepresentation)

        // Act
        val result = userService.findByUsername(username)

        // Assert
        assert(result.contains(userRepresentation))
    }

    @Test
    fun `test findRoleByName`() {
        // Arrange
        val roleName = "testRole"
        val roleRepresentation = mockk<RoleRepresentation>()

        every { keycloak.realm(realm).roles().get(roleName).toRepresentation() } returns roleRepresentation

        // Act
        val result = userService.findRoleByName(roleName)

        // Assert
        assert(result == roleRepresentation)
    }

    @Test
    fun `test assignRoleWithUsername`() {
        // Arrange
        val username = "testUser"
        val roleRepresentation = RoleRepresentation()
        val realmResource = mockk<RealmResource>()
        val usersResource = mockk<UsersResource>()
        val userResource = mockk<UserResource>()
        val rmr = mockk<RoleMappingResource>()
        val rsr = mockk<RoleScopeResource>()
        val user = mockk<UserRepresentation>()
        every { userService.findByUsername(any()) } returns listOf(user)
        every { user.id } returns "userID"
        every {keycloak.realm(realm)} returns realmResource
        every {realmResource.users()} returns usersResource
        every {usersResource.get(any())} returns userResource
        every {usersResource.search(any())} returns listOf(user)
        every {userResource.roles()} returns rmr
        every {rmr.realmLevel()} returns rsr
        every {rsr.add(any())} returns mockk()


        // Act
        userService.assignRoleWithUsername(username, roleRepresentation)

        // twice, first in findbyusername -> not correctly mocked
        verify(exactly = 2) {
            keycloak.realm(realm)
        }
    }

    @Test
    fun `test assignRoleWithUsername usernameNotFound`() {
        // Arrange
        val username = "nonExistentUser"
        val roleRepresentation = mockk<RoleRepresentation>()

        every { userService.findByUsername(username) } returns emptyList()

        // Act and Assert
        assertThrows<UsernameNotFoundException> {
            userService.assignRoleWithUsername(username, roleRepresentation)
        }
    }

    // Add similar tests for other functions in UserService

}