import React, { Component } from 'react';
import { Breadcrumb, Card, Table, Pagination, message} from 'antd';
import HandleStateModel from './HandleStateModel';
import SearchBox from './SearchBox';
import './style.less'

let typeLists = [
    {code: null, name: '全部'},
    {code: 1, name: '失联预警'},
    {code: 2, name: '网络预警'},
    {code: 3, name: '学业预警'},
    {code: 4, name: '消费预警'},
];

class ComprehensiveWarning extends Component {
    constructor(props) {
        super(props);
        const colors = ['#e45a5a','#f5a623','#f8e71c','#309cff'];
        
        const columns = [{
            title: '',
            dataIndex: 'flag',
            width: "50px",
            align:'center',
            render:(text,record)=>{
                if(text===1){
                    return <span className="iconfont icon-guoqiflag54" style={{fontSize:22,cursor:'pointer',color:'#d0021b'}}></span>
                } else {
                    return <span className="iconfont icon-guoqiflag54" style={{fontSize:22,cursor:'pointer',color:'#8d99b0'}}></span>
                }
            },
            onCell:(record)=>{
                return {
                    onClick:(e)=>{
                        e.stopPropagation();
                        message.success('修改成功！');
                    }
                }
            }
        }, {
            title: '序号',dataIndex: 'rowIndex',align:'center',width: "50px",
        }, {
            title: '学号',dataIndex: 'studentNo',align:'center', render: (text) => {return (<span title={text}>{text}</span>)}
        }, {
            title: '姓名',dataIndex: 'studentName',align:'center',width: "10%", render: (text) => {return (<span title={text}>{text}</span>)}
        }, {
            title: '性别',dataIndex: 'gender',align:'center',width: "6%",
        }, {
            title: '专业',dataIndex: 'majorName',align:'center', render: (text) => {return (<span title={text}>{text}</span>)}
        }, {
            title: '预警类别',dataIndex: 'alarmType',align:'center',width: "10%",
            render:(text, record)=>{
                let val = typeLists[text] ? typeLists[text].name:'';
                return (<span title={val}>{val}</span>)
            }
        }, {
            title: '预警级别',dataIndex: 'alarmLevel',align:'center',width: "10%",
            render:(text, record)=>{
                const backgroundColor = colors[text-1];
                return (
                    <span className={'circle-mark'} style={{width:16,height:16,top:4,backgroundColor}}/>
                )
            }
        }, {
            title: '预警描述',dataIndex: 'alarmDepict',align:'center', render: (text) => {return (<span title={text}>{text}</span>)}
        }, {
            title: '更新时间',dataIndex: 'updateTime',align:'center', render: (text) => {return (<span title={text}>{text}</span>)}
        }, {
            title: '状态',dataIndex: 'status',align:'center',width: "10%",
            render:(text, record)=>{
                let color,val;
                if(parseInt(text,10)===0){
                    color = '#e45a5a';val = '待处理';
                } else {
                    color = '#71cf09';val = '已处理';
                }
                return (<div className={"handleBtn"} style={{color}}>{val}</div>);
            },
            onCell:(record)=>{
                return {
                    onClick:(e)=>this.handleClick(e,record)
                }
            }
        }, {
            title: '处理结果',dataIndex: 'handleResult',align:'center', width: "10%", render: (text) => {return (<span title={text}>{text}</span>)}
        }];
        this.state = ({
            page: 1,
            pageSize: 10,
            total: 0,
            columns,
            levelConfig: [],
            dataLists: [],
            filter: {},
            visible: false,
            curRowInfo: undefined
        });
    }
    componentWillMount(){
        this.getData();
    }
    getData(data={page:this.state.page,pageSize:this.state.pageSize}){
        //let { page, pageSize, year, collegeCode, majorCode, studentNo, alarmType, alarmLevel, startDate, endDate, flag, status } = data;
        
        const res = {"success":true,"msg":"成功","obj":{"pageNum":1,"pageSize":10,"size":10,"startRow":1,"endRow":10,"total":38306,"pages":3831,"list":[{"id":"00076b95c6a241e38b20a812bec4f872","studentNo":"207140326","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":0,"studentName":"王路祺","gender":"男","majorName":"能源与动力工程(卓越工程师计划)","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"0007c155c86448628175b9a47367c4b6","studentNo":"202150636","alarmType":1,"alarmLevel":1,"alarmDepict":"一年级学生，任一学期累计不及格达10学分","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":0,"studentName":"张江儒","gender":"男","majorName":"数字媒体技术","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"000c2b82f0ff49dcb39bb6cb79041ca8","studentNo":"234140339","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":0,"studentName":"周荣华","gender":"男","majorName":"机械设计制造及其自动化(计算机辅助制造与数控加工)","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"000c4b4b4b5e4c41935872ae44245585","studentNo":"234140107","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":0,"studentName":"陈峰","gender":"男","majorName":"机械设计制造及其自动化(数控加工与维修)","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"00234b7a8f1a475e8b4d6ddc426980d3","studentNo":"206140738","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":0,"studentName":"赵明","gender":"男","majorName":"电气工程及其自动化(电力系统继电保护)","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"0023c12dab364121a12477607e42c480","studentNo":"208141036","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":0,"studentName":"徐佳维","gender":"男","majorName":"信息工程","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"0023d2e175394a6ea76a32d66278a668","studentNo":"209140533","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":0,"studentName":"万佳","gender":"男","majorName":"市场营销","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"002583119446434abcf7240c6db3f649","studentNo":"209141240","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":0,"studentName":"王旭超","gender":"男","majorName":"工程造价","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"0025a6b896404b86877b8adbbbc878bb","studentNo":"205140808","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":1,"studentName":"戴鑫","gender":"男","majorName":"焊接技术与工程","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0},{"id":"002690613a1a4d458ac50444f0f32791","studentNo":"206141239","alarmType":1,"alarmLevel":1,"alarmDepict":"毕业班学生，在校最后一个学期仍有不及格课程","createTime":"2018-02-05 15:24:33","updateTime":"2018-09-06 12:54:15","status":0,"flag":1,"studentName":"朱昊卿","gender":"男","majorName":"电气工程及其自动化(中外合作办学)","alarmMiss":0,"alarmNetwork":0,"alarmConsume":0}],"prePage":0,"nextPage":2,"isFirstPage":true,"isLastPage":false,"hasPreviousPage":false,"hasNextPage":true,"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"navigateFirstPage":1,"navigateLastPage":8,"lastPage":8,"firstPage":1},"errorCode":null}
        this.setState({
            total: res.obj.total,
            dataLists: res.obj.list || []
        })
    }
    refreshData(filter,isHandle){
        if(isHandle){
            let data = Object.assign({},{
                page:this.state.page,pageSize:this.state.pageSize
            },this.state.filter)
            this.getData(data)
            return;
        }
        this.setState({filter},()=>{
            let data = Object.assign({},{
                page:this.state.page,pageSize:this.state.pageSize
            },filter)
            console.log(data)
            this.getData(data)
        })
    }
    handleClick(e,record){
        e.stopPropagation();
        if(record.status===0){
            this.setState({visible:true,curRowInfo:record});
        }
    }
    searchAction() {
        const { college, brigade, team, major, year } = this.state;
        let filter = { college, brigade, team, major, year };
        this.setState({
            filter
        })
    }
    changePage(page, pageSize) { //分页
        this.setState({
            page, pageSize
        }, () => {
            let data = Object.assign({},{
                page, pageSize
            },this.state.filter)
            this.getData(data);
        })
    }
    rowClick(record, index){
        // console.log(record, index);
        // console.log(this.props)
        this.props.history.push('/mainframe/comprehensivewarning/detail/'+record.studentNo);
    }
    handleState = ()=> {
        this.setState({visible:false},()=>this.getData())
    }
    render(){
        const data = this.state.dataLists || [];
        data.forEach((item,index)=>{
            data[index].key = index;
            data[index].rowIndex = index+1;
        })
        return (
            <div>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>综合预警</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common-content">
                    <Card title="预警列表">
                        <SearchBox refreshData={(data)=>this.refreshData(data)} typeLists={typeLists} />
                        <div style={{ marginTop: 30 }}>
                            <Table
                                columns={this.state.columns}
                                dataSource={data}
                                bordered
                                size="small"
                                pagination={false}
                                onRow={(record, index) => {
                                    return {
                                      onClick: () => this.rowClick(record, index),// 点击行
                                    };
                                }}
                            />
                            <div className={'tableTip'}>
                                预警级别说明:
                                <span className={'circle-mark'}/> 红色预警
                                <span className={'circle-mark'} style={{backgroundColor:'#f5a623'}}/> 橙色预警
                                <span className={'circle-mark'} style={{backgroundColor:'#f8e71c'}}/> 黄色预警
                                <span className={'circle-mark'} style={{backgroundColor:'#309cff'}}/> 蓝色预警
                            </div>
                            <Pagination style={{marginTop:20}} className="text-center" showSizeChanger showQuickJumper defaultCurrent={1}
                                defaultPageSize={this.state.pageSize}
                                total={this.state.total}
                                onChange={this.changePage.bind(this)}
                                onShowSizeChange={this.changePage.bind(this)} />
                        </div>
                    </Card>
                </div>
                {this.state.visible?(
                    <HandleStateModel 
                        alarmTriggerId={this.state.curRowInfo&&this.state.curRowInfo.id}
                        onCancel={()=>this.setState({visible:false})}
                        onOk={this.handleState}
                    />
                ):null}
            </div>
        );
    }
}

export default ComprehensiveWarning;