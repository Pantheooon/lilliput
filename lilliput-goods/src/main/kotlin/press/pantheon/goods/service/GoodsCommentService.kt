package press.pantheon.goods.service

import org.springframework.data.domain.Example
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Service
import press.pantheon.goods.client.UserClient
import press.pantheon.goods.entity.GoodsComment
import press.pantheon.goods.model.GoodsCommentSave
import press.pantheon.goods.model.GoodsCommentVO
import press.pantheon.goods.repository.GoodsCommentRepository
import java.util.*
import javax.annotation.Resource

@Service
class GoodsCommentService {

    @Resource
    lateinit var goodsCommentRepository: GoodsCommentRepository

    @Resource
    lateinit var redisTemplate: RedisTemplate<String, String>

    @Resource
    lateinit var userClient: UserClient

    fun commentNum(productId: Int): Long {
        var g = GoodsComment()
        g.goodsId = productId
        val example: Example<GoodsComment> = Example.of(g)
        return goodsCommentRepository.count(example)
    }

    fun comments(productId: Int): List<GoodsCommentVO> {
        var g = GoodsComment()
        g.goodsId = productId
        val example: Example<GoodsComment> = Example.of(g)
        val comments = goodsCommentRepository.findAll(example)
        val keys = comments.map { "goods_like_${it.id}" }
        val likeNums = redisTemplate.opsForValue().multiGet(keys)
        var ans = mutableListOf<GoodsCommentVO>()
        for (i in 0 until comments.size) {
            val goodsComment = comments[i]
            val likeNum = likeNums?.get(i) ?: "0"
            val findById = userClient.findById(goodsComment.userId!!)
            var goodsCommentVO = GoodsCommentVO(likeNum.toInt(), goodsComment)
            goodsCommentVO.userName = findById.body?.userName?:""
            ans.add(goodsCommentVO)
        }

        return ans
    }

    fun saveComment(goodsCommentSave: GoodsCommentSave): Int? {
        val save = goodsCommentRepository.save(goodsCommentSave.let {
            val goodsComment = GoodsComment()
            goodsComment.comment = it.comment
            goodsComment.goodsId= it.goodsId
            goodsComment.userId = it.userId
            goodsComment.createTime = Date()
            goodsComment
        })

        return save.id
    }

    fun like(commentId: Int) {
        val likeNums = redisTemplate.opsForValue().get("goods_like_${commentId}") ?: "0"
        redisTemplate.opsForValue().set("goods_like_${commentId}",(likeNums.toInt() + 1).toString())
    }
}