package press.pantheon.goods.repository

import org.springframework.data.jpa.repository.JpaRepository
import press.pantheon.goods.entity.GoodsComment

interface GoodsCommentRepository : JpaRepository<GoodsComment,Int> {
}