package press.pantheon.goods.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import press.pantheon.goods.entity.BroadCast
import press.pantheon.goods.entity.Goods

@Repository
interface BroadCastRepository : JpaRepository<BroadCast, Int> {



}