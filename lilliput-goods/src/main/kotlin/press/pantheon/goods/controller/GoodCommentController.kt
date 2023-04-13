package press.pantheon.goods.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import press.pantheon.goods.model.GoodsCommentSave
import press.pantheon.goods.model.GoodsCommentVO
import press.pantheon.goods.service.GoodsCommentService
import java.util.*
import javax.annotation.Resource

@RestController
class GoodCommentController {


    @Resource
    private lateinit var commentService: GoodsCommentService


    @GetMapping("/goods/comment/num/{productId}")
    fun commentNum(@PathVariable productId: Int): ResponseEntity<Long> {
        return ResponseEntity.ok(commentService.commentNum(productId))
    }

    @GetMapping("/goods/comments/{productId}")
    fun comments(@PathVariable productId: Int): ResponseEntity<List<GoodsCommentVO>> {
        return ResponseEntity.ok(commentService.comments(productId))
    }


    @PostMapping("/goods/comment/save")
    fun saveComment(@RequestBody goodsCommentSave: GoodsCommentSave): ResponseEntity<Int> {

        return ResponseEntity.ok(commentService.saveComment(goodsCommentSave))
    }

    @PostMapping("/goods/comment/like/{commentId}")
    fun like(@PathVariable commentId: Int):ResponseEntity<Boolean> {
        commentService.like(commentId)
        return ResponseEntity.ok(true)
    }
}