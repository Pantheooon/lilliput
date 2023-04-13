package press.pantheon.goods

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients

@SpringBootApplication
@EnableFeignClients
class LilliputGoodsApplication

fun main(args: Array<String>) {
    runApplication<LilliputGoodsApplication>(*args)
}
