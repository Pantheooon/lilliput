package press.pantheon.user.config

import org.springframework.stereotype.Component
import java.security.MessageDigest
import java.util.*
import javax.xml.bind.DatatypeConverter


@Component
class PasswordEncode {


    fun encode(password: String): String {
        val md: MessageDigest = MessageDigest.getInstance("MD5")
        md.update(password.toByteArray())
        val digest: ByteArray = md.digest()
        return DatatypeConverter.printHexBinary(digest).uppercase(Locale.getDefault())
    }
}