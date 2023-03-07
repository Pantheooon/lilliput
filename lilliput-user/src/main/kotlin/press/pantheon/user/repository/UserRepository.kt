package press.pantheon.user.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import press.pantheon.user.entity.User
import javax.print.attribute.standard.RequestingUserName

@Repository
interface UserRepository : JpaRepository<User, Int> {


    fun countByUserName(userName: String): Int


    fun getByUserName(userName: String): User?


}