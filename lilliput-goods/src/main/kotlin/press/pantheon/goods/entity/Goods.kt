package press.pantheon.goods.entity

import javax.persistence.*

@Entity
@Table(name = "goods")
class Goods {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null


    @Column(name = "name")
    var name: String? = null

    @Column(name = "pic")
    var pic: String? = null

    @Column(name = "price")
    var price: Int? = null


    @Column(name = "gift")
    var gift: String? = null

    @Column(name = "detail")
    var detail: String? = null

    @Column(name = "hot")
    var hot: String? = null

    @Column(name = "inventory")
    var inventory: Int? = null
}