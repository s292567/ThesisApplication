package se2g12.thesisapplication.Profile
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
@Entity
class Profile (
 var role: String?=null,
 @Id
 var username:String?=null
)