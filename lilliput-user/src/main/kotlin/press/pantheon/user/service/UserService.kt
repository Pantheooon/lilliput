package press.pantheon.user.service

import org.springframework.stereotype.Service
import press.pantheon.user.config.PasswordEncode
import press.pantheon.user.entity.User
import press.pantheon.user.repository.UserRepository
import press.pantheon.user.vo.UserNamePassword
import java.util.*
import javax.annotation.Resource

@Service
class UserService {

    @Resource
    private lateinit var repository: UserRepository

    @Resource
    private lateinit var passwordEncode: PasswordEncode


    fun getById(id: Int): User? = repository.findById(id).orElse(null)

    fun getByUserName(name: String): User? = repository.getByUserName(name)

    fun signup(namePassword: UserNamePassword): User {
        val countByUserName = repository.countByUserName(namePassword.username)
        if (countByUserName != 0) {
            throw IllegalArgumentException("user:${namePassword.username} has already register")
        }
        return repository.save(User().also {
            it.userName = namePassword.username
            it.password = passwordEncode.encode(namePassword.password)
            it.avatar = ""
            it.active = 0
            it.createdAt = Date()
            it.updatedAt = Date()
        })
    }

//    fun signup(signUp: SignUp): SignUpResult {
//        val countByUserName = repository.countByUserName(signUp.username)
//        if (countByUserName != 0) {
//            return SignUpResult(success = false, errorMsg = "用户名已存在")
//        }
//
//        var user: User = repository.saveAndFlush()
//
//        return SignUpResult(success = true, token = genToken(user.userId!!))
//    }

//    private fun genToken(userId: Int): String {
//        val option = repository.findById(userId)
//        if (!option.isPresent) return ""
//
//        val user = option.get()
//
//
//    }
}