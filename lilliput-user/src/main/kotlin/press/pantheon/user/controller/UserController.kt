package press.pantheon.user.controller

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import press.pantheon.user.config.PasswordEncode
import press.pantheon.user.service.JWTService
import press.pantheon.user.service.UserService
import press.pantheon.user.vo.SignUpResult
import press.pantheon.user.vo.UserNamePassword
import press.pantheon.user.vo.UserVo
import java.util.*
import javax.annotation.Resource


@RestController
class UserController {


    private val log = LoggerFactory.getLogger(UserController::class.java)

    @Resource
    lateinit var userService: UserService


    @Resource
    lateinit var passwordEncode: PasswordEncode

    @Resource
    lateinit var jwtService: JWTService


    @PostMapping(value = ["/user/signup"])
    fun signup(@RequestBody userNamePassword: UserNamePassword): ResponseEntity<SignUpResult> {
        try {
            println(userNamePassword)
            var user = userService.signup(userNamePassword)
            return ResponseEntity.ok(
                    SignUpResult(
                            success = true,
                            token = jwtService.createToken(user.userId)
                    )
            )
        } catch (ex: Exception) {
            return ResponseEntity.ok(
                    SignUpResult(
                            success = false,
                            errorMsg = ex.message
                    )
            )
        }

    }


    @PostMapping("/user/login")
    fun login(@RequestBody userNamePassword: UserNamePassword): ResponseEntity<String> {
        println("--------------------")
        val user = userService.getByUserName(userNamePassword.username)
                ?: return ResponseEntity.notFound().build()

        val encode = passwordEncode.encode(userNamePassword.password)
        if (!Objects.equals(encode, user.password))
            return ResponseEntity.notFound().build()

        return ResponseEntity.ok(jwtService.createToken(user.userId))

    }


    @GetMapping("/user/profile/me")
    fun me(@RequestHeader(value = "Authorization") bearer: String): ResponseEntity<UserVo> {
        try {
            var token = bearer.removePrefix("Bearer ")
            if (!jwtService.verifyToken(token)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
            val decode = jwtService.decode(token)
            val userId = decode.getInteger("userId")
            val user = userService.getById(userId) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
            return ResponseEntity.ok(
                    UserVo(
                            userId = userId,
                            userName = user.userName!!,
                            avatar = user.avatar
                    )
            )
        } catch (ex: Exception) {
            log.error("profile me 接口异常，error", ex)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }


    @GetMapping("/user/refreshToken")
    fun refresh(@RequestHeader(value = "Authorization") bearer: String?): ResponseEntity<String> {
        try {
            if (bearer == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
            var token = bearer.removePrefix("Bearer ")
            return ResponseEntity.ok(jwtService.refreshToken(token))
        } catch (ex: Exception) {
            log.error("refresh 接口异常，error", ex)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }


    }

    @GetMapping("/user/verify")
    fun verifyToken(@RequestHeader(value = "Authorization") bearer: String): ResponseEntity<Any> {
        var token = bearer.removePrefix("Bearer ")
        if (!jwtService.verifyToken(token)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        return ResponseEntity.ok().build()
    }

    @GetMapping("/user/getById")
    fun getById(@RequestParam userId: Int): ResponseEntity<UserVo> {
        val user = userService.getById(userId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(UserVo(userId = user.userId!!, avatar = user.avatar, userName = user.userName ?: ""))
    }

}