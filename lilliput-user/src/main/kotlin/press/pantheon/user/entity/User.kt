package press.pantheon.user.entity

import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "user")
class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    var userId: Int? = null


    @Column(name = "user_name")
    var userName: String? = null


    @Column(name = "pass_word")
    var password: String? = null

    @Column(name = "avatar")
    var avatar: String? = null

    @Column(name = "created_at")
    var createdAt: Date? = null

    @Column(name = "updated_at")
    var updatedAt: Date? = null

    @Column(name = "active")
    var active: Int? = null


}