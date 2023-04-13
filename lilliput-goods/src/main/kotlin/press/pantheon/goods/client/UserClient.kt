package press.pantheon.goods.client

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(url = "localhost:8091", name = "lilliput-user")
interface UserClient {

    @GetMapping("/user/getById")
    fun findById(@RequestParam userId: Int): ResponseEntity<UserVo>
}