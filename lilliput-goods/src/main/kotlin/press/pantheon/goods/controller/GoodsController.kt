package press.pantheon.goods.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import press.pantheon.goods.model.GoodsVO
import press.pantheon.goods.service.GoodsService
import javax.annotation.Resource

@RestController
class GoodsController {

    @Resource
    lateinit var goodsService: GoodsService


    @GetMapping("/goods/topSellings")
    fun topSellings(): ResponseEntity<List<GoodsVO>> = ResponseEntity.ok(goodsService.topSellings())

    @GetMapping("/goods/detail/{id}")
    fun detail(@PathVariable id: Int): ResponseEntity<GoodsVO> = ResponseEntity.ok(goodsService.detail(id))

    @GetMapping("/goods/related")
    fun related(@PathVariable id:Int):ResponseEntity<List<GoodsVO>> {
        val detail = goodsService.detail(id) ?: return ResponseEntity.ok(mutableListOf())
        val goods = goodsService.getByTag(detail.tag)
        return ResponseEntity.ok(goods)

    }
}