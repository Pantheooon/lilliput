package press.pantheon.goods.service

import org.springframework.stereotype.Service
import press.pantheon.goods.entity.BroadCast
import press.pantheon.goods.repository.BroadCastRepository
import javax.annotation.Resource

@Service
class BroadCastService {

    @Resource
    lateinit var broadCastRepository: BroadCastRepository


    fun getBroadCast():List<BroadCast> = broadCastRepository.findAll()
}