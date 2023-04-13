package press.pantheon.goods.entity

import com.fasterxml.jackson.annotation.JsonFormat
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "goods_comments")
class GoodsComment {


    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    @Column(name = "goods_id")
    var goodsId: Int? = null

    @Column(name = "user_id")
    var userId: Int? = null

    @Column(name = "comment")
    var comment: String? = null

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name = "create_time")
    var createTime: Date? = null
}