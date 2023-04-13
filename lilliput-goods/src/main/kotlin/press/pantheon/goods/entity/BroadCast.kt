package press.pantheon.goods.entity

import javax.persistence.*

@Entity
@Table(name = "broad_cast")
class BroadCast {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int? = null

    @Column(name = "goods_id")
    val goodsId: Int? = null

    @Column(name = "broad_cast_pic")
    val broadCastPic: String? = null
}
