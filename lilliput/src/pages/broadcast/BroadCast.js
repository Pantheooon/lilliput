import React from 'react';
import {Carousel, Image} from 'antd';
import './broadcast.css'
export default function BroadCast() {
    return (
        <div className="base-content broadcast">
            <Carousel autoplay>
                <div>
                   <Image className="broadcast-img" src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/lunbo2.jpg"/>
                </div>
                <div>
                    <Image className="broadcast-img" src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/lunbo2.jpg"/>
                </div>
                <div>
                    <Image className="broadcast-img" src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/lunbo2.jpg"/>
                </div>
                <div>
                    <Image className="broadcast-img" src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/lunbo2.jpg"/>
                </div>
            </Carousel>
        </div>
    )

}