package press.pantheon.goods.service

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import press.pantheon.goods.entity.Goods
import press.pantheon.goods.model.GoodsVO
import press.pantheon.goods.repository.GoodsRepository
import javax.annotation.Resource

@Service
class GoodsService {

    @Resource
    lateinit var goodsRepository: GoodsRepository


    fun topSellings():List<GoodsVO>{
        val tag = goodsRepository.getByTag("top")
        return tag.map { convert(it) }
    }



    fun convert(goods: Goods?):GoodsVO{
        if (goods == null) throw NotFoundException()
        return GoodsVO(
                id = goods.id!!,
                name = goods.name!!,
                price = goods.price!!,
                quantity = goods.quantity!!,
                pic = goods.pic!!,
                description = goods.description!!,
                tag = goods.tag!!,
                extends = if (goods.extends == null) mutableMapOf<String,Any>() else Gson().fromJson(goods.extends, object : TypeToken<Map<String, Any>>() {}.type)
        )
    }
    fun detail(id: Int): GoodsVO? = convert(goodsRepository.getById(id))
    fun getByTag(tag:String):List<GoodsVO> = goodsRepository.getByTag(tag).map { convert(it) }
}