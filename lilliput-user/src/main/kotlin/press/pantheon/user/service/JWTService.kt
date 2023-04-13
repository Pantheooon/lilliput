package press.pantheon.user.service

import io.fusionauth.jwt.domain.JWT
import io.fusionauth.jwt.rsa.RSASigner
import io.fusionauth.jwt.rsa.RSAVerifier
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Service
import java.nio.file.Files
import java.nio.file.Paths
import java.time.ZonedDateTime
import java.util.*
import java.util.concurrent.TimeUnit
import javax.annotation.Resource


@Service
class JWTService {


    @Resource
    private lateinit var redisTemplate: RedisTemplate<String, String>

    private var issuer = "mall.pantheon.press"

    private val signer = RSASigner.newSHA256Signer(String(Files.readAllBytes(Paths.get("src/main/resources/jwt.key"))))

    private var verifier = RSAVerifier.newVerifier(Paths.get("src/main/resources/jwt.pub"))

    //token默认60分钟失效
    private val tokenExpire: Long = 60

    //refresh token默认一周
    private val refreshTokenExpire: Long = 7 * 24 * 60

    fun createToken(userId: Int?): String {
        var jti = UUID.randomUUID().toString()
        val jwt = JWT().setIssuer(issuer)
            .setIssuedAt(ZonedDateTime.now())
            .setAudience(if (userId == null) "system" else "user")
            .setUniqueId(jti)
            .setExpiration(ZonedDateTime.now().plusMinutes(tokenExpire))
            .addClaim("userId", userId)
        val encodedJWT = JWT.getEncoder().encode(jwt, signer)
        redisTemplate.opsForValue()
            .set("refresh_token_$jti", userId?.toString() ?: "", refreshTokenExpire, TimeUnit.MINUTES)
        return encodedJWT
    }


    fun refreshToken(token: String): String {
        val jwt = decode(token)
        val userId = redisTemplate.opsForValue().get("refresh_token_${jwt.uniqueId}") ?: throw IllegalArgumentException("refresh key has expired")
        redisTemplate.delete("refresh_token_${jwt.uniqueId}")
        return createToken(jwt.getInteger("userId"))

    }


    fun verifyToken(token: String): Boolean {
        return try {
            val jwt = JWT.getDecoder().decode(token, verifier)
            val expiration = jwt.expiration
            if (ZonedDateTime.now() >= expiration){
                false
            }
            true
        } catch (ex: Exception) {
            false;
        }
    }


    fun decode(token: String): JWT = JWT.getDecoder().decode(token, verifier)

}