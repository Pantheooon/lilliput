package press.pantheon.goods.service

import org.springframework.stereotype.Service
import press.pantheon.goods.entity.Goods
import press.pantheon.goods.repository.GoodsRepository
import javax.annotation.Resource

@Service
class GoodsService {

    @Resource
    lateinit var goodsRepository: GoodsRepository


    fun topSelling(): List<Goods> {
        return goodsRepository.findAll();
    }


    fun detail(id: Int): Goods? = goodsRepository.getById(id)
    fun list(ids: List<Int>): List<Goods>?  =  goodsRepository.findAllById(ids)
}