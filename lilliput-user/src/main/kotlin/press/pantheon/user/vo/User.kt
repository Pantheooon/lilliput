package press.pantheon.user.vo


class UserNamePassword(



){
    var username: String = ""

    var password: String = ""
}


data class SignUpResult(

    var success: Boolean,

    var errorMsg: String? = null,

    var token: String? = null
)


data class UserVo(

    var userId: Int,

    var userName: String,

    var avatar: String?
)
