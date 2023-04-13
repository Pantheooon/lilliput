package press.pantheon.goods.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import press.pantheon.goods.entity.BroadCast
import press.pantheon.goods.entity.Goods
import press.pantheon.goods.service.BroadCastService
import press.pantheon.goods.service.GoodsService
import javax.annotation.Resource

@RestController
class GoodsController {

    @Resource
    lateinit var goodsService: GoodsService
    @Resource
    lateinit var broadCastService: BroadCastService


    @GetMapping("/goods/topSelling")
    fun topSelling(): ResponseEntity<List<Goods>> = ResponseEntity.ok(goodsService.topSelling())

    @GetMapping("/goods/detail/{id}")
    fun detail(@PathVariable id: Int): ResponseEntity<Goods> = ResponseEntity.ok(goodsService.detail(id))

    @GetMapping("/goods/broadcast")
    fun getBroadcast():ResponseEntity<List<BroadCast>> = ResponseEntity.ok(broadCastService.getBroadCast())


    @PostMapping("/goods/list")
    fun list(@RequestBody ids:List<Int>):ResponseEntity<List<Goods>> = ResponseEntity.ok(goodsService.list(ids))


}