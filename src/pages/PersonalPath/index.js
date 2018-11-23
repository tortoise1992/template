import React from 'react';
import { Breadcrumb } from 'antd';
import Filter from './Filter';
import PathMap from '../../common/components/Bmap/PathMap';

class PersonalPath extends React.Component{

    constructor(props){
        super(props);
        this.state={
            info: {
                name: '何XX', // 选择的学生
                studentNo: "", // 选择的学生的学号
                date:"2018年8月29日"// 选择的日期
            }
        };
        this.getInfo = this.getInfo.bind(this);
    }

    getInfo(obj){
        this.setState({
            info: obj
        })
    }

    render(){
        const data = [
            { "id": "e7cc29963a524f79acf1586946f01001", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:10:00", "endTime": "2018-08-29 00:11:00", "stayTime": "1", "longitude": 118.88795, "latitude": 31.935234 },
            { "id": "e7cc29963a524f79acf1586946f01002", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:12:00", "endTime": "2018-08-29 00:13:00", "stayTime": "2", "longitude": 118.885255, "latitude": 31.932775 },
            { "id": "e7cc29963a524f79acf1586946f01004", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:16:00", "endTime": "2018-08-29 00:17:00", "stayTime": "4", "longitude": 118.899282, "latitude": 31.932679 },
            { "id": "e7cc29963a524f79acf1586946f01005", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:18:00", "endTime": "2018-08-29 00:19:00", "stayTime": "5", "longitude": 118.886036, "latitude": 31.926738 },
            { "id": "e7cc29963a524f79acf1586946f01006", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:20:00", "endTime": "2018-08-29 00:21:00", "stayTime": "6", "longitude": 118.895352, "latitude": 31.927519 },
            { "id": "e7cc29963a524f79acf1586946f01003", "studentNo": "131594206", "address": "南京工程大学食堂", "startTime": "2018-08-29 00:22:00", "endTime": "2018-08-29 00:23:00", "stayTime": "3", "longitude": 118.891839, "latitude": 31.929151 }
        ]

        let newData = []; // 后端数据有出入， 循环遍历一下
        data.forEach((item) => {
            newData.push(
                {
                    lng: item.longitude,
                    lat: item.latitude,
                    stay: item.stayTime,
                    address: item.address
                }
            )
        })

        return (
            <React.Fragment>

                <Breadcrumb  className="breadcrumb">
                    <Breadcrumb.Item>轨迹分析</Breadcrumb.Item>
                    <Breadcrumb.Item>个人轨迹</Breadcrumb.Item>
                </Breadcrumb>

                <Filter getInfo={this.getInfo} />

                <PathMap data={newData} name={this.state.info.name} />

            </React.Fragment>
        )
    }
}

export default PersonalPath;