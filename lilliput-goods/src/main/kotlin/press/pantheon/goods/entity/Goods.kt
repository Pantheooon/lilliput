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


    @Column(name = "price")
    var price: Int? = null

    @Column(name = "quantity")
    var quantity: Int? = null

    @Column(name = "pic")
    var pic: String? = null

    @Column(name = "description")
    var description: String? = null

    @Column(name = "tag")
    var tag: String? = null

    @Column(name = "extends")
    var extends: String? = null
}