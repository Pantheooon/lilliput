package press.pantheon.goods.model

import press.pantheon.goods.entity.GoodsComment

data class GoodsCommentVO(val likeNum: Int, val comment: GoodsComment) {

    var userName: String? = null
}


data class GoodsCommentSave(val goodsId: Int, var comment: String, var userId: Int);