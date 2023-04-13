create database lilliput_goods;
use lilliput_goods;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL primary key AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
  `pic` varchar(128) CHARACTER SET utf8mb4 NOT NULL,
  `price` int(11) NOT NULL,
  `gift` varchar(256) CHARACTER SET utf8mb4 DEFAULT NULL,
  `detail` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL,
  `hot` varchar(256) CHARACTER SET utf8mb4 DEFAULT NULL,
  `inventory` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

create table broad_cast(
    id int not null primary key auto_increment,
    goods_id int not null,
    broad_cast_pic varchar(128)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `goods_comments` (
  `id` int(11) NOT NULL primary key AUTO_INCREMENT,
  `goods_id` int not null,
  `user_id` varchar(64) NOT NULL,
  `comment` varchar(256) NOT NULL,
  `create_time` DATETIME NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO lilliput_goods.goods (name,pic,price,gift,detail,hot,inventory) VALUES
	 ('Redmi 12C','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/18119_3.png',699,'价值169元小米尊享礼盒(化妆镜+梳子)单品x1，赠完即止','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/18119_detail.png','<span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}><p><font color="#ff4a00">「至高优惠200元！购机赠价值169元小米定制礼盒」<br/></font>前置仿生双主摄｜旗舰级后置相机｜第一代骁龙7移动平台｜不锈钢VC液冷散热｜4500mAh大电量｜AMOLED微曲屏</p></span>',100),
	 ('Xiaomi 13','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/小米13.png',4599,'价值169元小米尊享礼盒（化妆镜+梳子） 单品x1，赠完即止','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230310000215.png','<span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}><p><font color="#ff4a00">「购机至高享24期免息，+199得50W立式无线充Pro」<br/></font>第二代骁龙8｜徕卡专业光学镜头｜徕卡原生双画质｜徕卡75mm长焦 | 超窄边屏幕｜67W澎湃秒充</p></span>',100),
	 ('Xiaomi 13 Pro','https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1670747135.2084309.png',5399,NULL,'https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230310234208.png','<span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}><p><font color="#ff4a00">「购机至高享24期免息，+199得50W立式无线充Pro」<br/></font>第二代骁龙8｜2K OLED 屏幕 | 徕卡专业光学镜头｜徕卡原生双画质｜徕卡75mm浮动长焦｜120W澎湃秒充</p></span>',100),
	 ('Xiaomi Civi 2','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/civi2_1.png',2299,'价值169元小米尊享礼盒（化妆镜+梳子） 单品x1，赠完即止','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230310232856.png','<span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}><p><font color="#ff4a00">「至高优惠200元！购机赠价值169元小米定制礼盒」<br/></font>前置仿生双主摄｜旗舰级后置相机｜ 第一代骁龙7移动平台｜不锈钢VC液冷散热｜4500mAh大电量｜AMOLED微曲屏</p></span>',100),
	 ('Xiaomi 12S Ultra','https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1656916095.71929521.png',5999,NULL,'https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230310234533.png','<span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}><p>徕卡专业光学镜头｜骁龙8+ 旗舰处理器｜徕卡原生双画质｜1 英寸大底专业主摄｜小米澎湃 P1 快充芯片｜全场景疾速抓拍｜IP68级防尘防水</p></span>',100),
	 ('Xiaomi MIX Fold 2','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230310234649.png',8999,'价值399元小米首发尊享礼盒 黑色x1，赠完即止','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230310234952.png','<span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}><p><font color="#ff4a00">「买赠尊享礼盒；以旧换新至高补贴880元；买赠180天碎屏保障服务」<br/></font>超轻薄折叠机身｜小米自研微水滴形态转轴｜内外双旗舰屏幕｜徕卡专业光学镜头｜徕卡原生双画质</p></span>',100),
	 ('Redmi K60','https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1672220462.80412519.png',2999,'价值399元小米首发尊享礼盒 黑色x1，赠完即止','https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230310235241.png','<span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}><p><font color="#ff4a00">「享6期免息；12+512GB、16+512GB优惠300元，到手价2999元起」<br/></font>狠快狠强，狠旗舰！2023，第一台梦幻手机</p></span>',100),
	 ('Redmi Note 12 Pro 极速版','https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1672039203.83071726.png',1799,NULL,'https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230310235616.png','<span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}><p><font color="#ff4a00">「至高优惠200元；信用卡支付享优惠」<br/></font>Redmi Note 12 Pro 极速版</p></span>',100);



INSERT INTO lilliput_goods.broad_cast (goods_id,broad_cast_pic) VALUES
	 (2,'https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230312220133.png'),
	 (4,'https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230312220849.png'),
	 (6,'https://pantheon-blog.oss-cn-beijing.aliyuncs.com/20230312221253.png');


INSERT INTO lilliput_goods.goods_comments(goods_id, user_id, comment, create_time)VALUES(2, 1, '性价比：非常高，值得购买。 运行速度：运行速度很快，运行速度很快 拍照效果：拍照效果很好，拍照效果很清晰', now());
INSERT INTO lilliput_goods.goods_comments(goods_id, user_id, comment, create_time)VALUES(2, 1, '小米v587', now());
insert into lilliput_goods.goods_comments(goods_id,user_id,comment,create_time) values(2, 1, '八错八错',now());