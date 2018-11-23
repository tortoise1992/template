import React, { Component } from 'react';
import { Card, Table} from 'antd';
import HandleStateModel from '../HandleStateModel';

let typeLists = [
    {code: 1, name: '失联预警'},
    {code: 2, name: '网络预警'},
    {code: 3, name: '学业预警'},
    {code: 4, name: '消费预警'},
];

let markStyle= {
    display: 'inline-block',
    background: '#e45a5a',
    width:'10px',
    height: '10px',
    borderRadius: '100%',
    position: 'relative'
}

class CurEarlyWarnings extends Component {
    constructor(props) {
        super(props);
        const colors = ['#e45a5a','#f5a623','#f8e71c','#309cff'];
        const columns = [{
            title: '序号',dataIndex: 'rowIndex',align:'center',width: "10%"
        }, {
            title: '预警时间',dataIndex: 'updateTime',align:'center',width: "30%"
        }, {
            title: '预警描述',dataIndex: 'alarmDepict',align:'center',width: "20%",render: (text) => {return (<span title={text}>{text}</span>)}
        }, {
            title: '预警级别',dataIndex: 'alarmLevel',align:'center',
            render:(text, record)=>{
                const backgroundColor = colors[text-1];
                let styles = Object.assign({},markStyle,{backgroundColor})
                return (
                    <span className={'circle-mark'} style={styles}/>
                )
            }
        }, {
            title: '预警类别',dataIndex: 'alarmType',align:'center',
            render:(text, record)=>{
                let val = typeLists[text-1] ? typeLists[text-1].name:'';
                return val
            }
        }, {
            title: '状态',dataIndex: 'status',align:'center',
            render:(text, record)=>{
                let color,val;
                if(parseInt(text,10)===0){
                    color = '#e45a5a';val = '待处理';
                } else {
                    color = '#71cf09';val = '已处理';
                }
                return (<div style={{cursor:'pointer',color}}>{val}</div>);
            },
            onCell:(record)=>{
                return {
                    onClick:(e)=>this.handleClick(e,record)
                }
            }
        }];
        this.state = ({
            columns,
            alarmDetails:[],
            page: 1,
            pageSize: 5,
            total: 0,
            visible: false,
            curRowInfo:undefined
        });
    }
    componentWillMount(){
        this.getData(this.props.studentNo);
    }
    getData(studentNo){
        // let data = {
        //     studentNo,
        //     pageInfo: {
        //         pageNum: this.state.page,
        //         pageSize: this.state.pageSize,
        //     }
        // }
        const obj = {
            "total": 39,
            "list": [
                {
                    "id": "37cc1bbb0eb749b492db9c949973b9b8",
                    "studentNo": "131594206",
                    "alarmType": 1,
                    "alarmLevel": 1,
                    "alarmDepict": "test_2017-11",
                    "createTime": "2017-11-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 0,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "68de60ca179b4a97a548c425265799e9",
                    "studentNo": "131594206",
                    "alarmType": 1,
                    "alarmLevel": 1,
                    "alarmDepict": "test_2018-05",
                    "createTime": "2018-05-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "7d7eb767fcbb40fea27482ee4b2c2e51",
                    "studentNo": "131594206",
                    "alarmType": 1,
                    "alarmLevel": 1,
                    "alarmDepict": "test_2018-03",
                    "createTime": "2018-03-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "8f03ae716ff740529cbb9c39a852d658",
                    "studentNo": "131594206",
                    "alarmType": 1,
                    "alarmLevel": 1,
                    "alarmDepict": "test_2017-12",
                    "createTime": "2017-12-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "978b6a6d26ba4810bc9e219558999a93",
                    "studentNo": "131594206",
                    "alarmType": 1,
                    "alarmLevel": 1,
                    "alarmDepict": "test_2018-07",
                    "createTime": "2018-07-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "9a005411b4154a04a28d5bc05c3117f6",
                    "studentNo": "131594206",
                    "alarmType": 1,
                    "alarmLevel": 1,
                    "alarmDepict": "test_2018-04",
                    "createTime": "2018-04-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "d1a584ac20b2418485065560985c0232",
                    "studentNo": "131594206",
                    "alarmType": 1,
                    "alarmLevel": 1,
                    "alarmDepict": "test_2017-10",
                    "createTime": "2017-10-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "f9e4698a640c477fa7041d4943122884",
                    "studentNo": "131594206",
                    "alarmType": 1,
                    "alarmLevel": 1,
                    "alarmDepict": "test_2018-01",
                    "createTime": "2018-01-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "1912f7263f11423f8c44eed79f82134a",
                    "studentNo": "131594206",
                    "alarmType": 4,
                    "alarmLevel": 2,
                    "alarmDepict": "test_2017-11",
                    "createTime": "2017-11-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                },
                {
                    "id": "1bb08876fa1945eda6beb63e60109940",
                    "studentNo": "131594206",
                    "alarmType": 2,
                    "alarmLevel": 2,
                    "alarmDepict": "test_2018-06",
                    "createTime": "2018-06-05 15:24:33",
                    "updateTime": "2018-09-06 12:54:15",
                    "status": 1,
                    "flag": 1,
                    "alarmMiss": 0,
                    "alarmNetwork": 0,
                    "alarmConsume": 0
                }
            ],
        }
        this.setState({
            alarmDetails:obj.list || [],
            total:obj.total
        })
    }
    handleClick(e,record){
        e.stopPropagation();
        if(record.status===0){
            this.setState({visible:true,curRowInfo:record});
        }
    }
    handleState = ()=> {
        this.setState({visible:false},()=>this.getData(this.props.studentNo))
    }
    changePage = (page) => {
        this.setState({page},()=>this.getData(this.props.studentNo));
    }
    render(){
        const data = this.state.alarmDetails || [];
        data.forEach((item,index)=>{
            data[index].key = index;
            data[index].rowIndex = index+1;
        })
        return (
            <Card>
                <div className="common-title">当前预警事件</div>
                <div style={{marginTop:20}}>
                    <Table
                        columns={this.state.columns}
                        dataSource={data}
                        bordered
                        pagination={
                            {
                                total:this.state.total,
                                pageSize:this.state.pageSize,
                                onChange:this.changePage
                            }
                        }
                    />
                </div>
                {this.state.visible?(
                    <HandleStateModel 
                        alarmTriggerId={this.state.curRowInfo&&this.state.curRowInfo.id}
                        onCancel={()=>this.setState({visible:false})}
                        onOk={this.handleState}
                    />
                ):null}
            </Card>
        )
    }
}

export default CurEarlyWarnings;