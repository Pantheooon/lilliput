package press.pantheon.goods.model

data class GoodsVO(
        val id: Int,
        val name: String,
        val price: Int,
        val quantity: Int,
        val pic: String,
        val description: String,
        val tag: String,
        val extends: Map<String, Any>
)
