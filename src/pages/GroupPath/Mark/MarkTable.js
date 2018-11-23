import React from 'react';
import { Table, Card, Button, message } from 'antd';
import TagModal from './TagModal';
// import { postAction } from './../../../axios';

class MarkTable extends React.Component{
    constructor (props) {
        super(props);
        this.state={
            columns: [
                {
                    title: '序号',
                    dataIndex: 'sortIndex',
                    width: '6%'
                }, {
                    title: '学号',
                    dataIndex: 'studentNo',
                    width: '15%'
                }, {
                    title: '姓名',
                    dataIndex: 'name',
                    width: '15%'
                }, {
                    title: '院系',
                    dataIndex: 'collegeName',
			        render: (text) => {
			        	return (
			        		<span title={text}>{text}</span>
			        	)
			        }
                }, {
                    title: '专业',
                    dataIndex: 'majorName',
			        render: (text) => {
			        	return (
			        		<span title={text}>{text}</span>
			        	)
			        }
                }, {
                    title: '班级',
                    dataIndex: 'className',
			        render: (text) => {
			        	return (
			        		<span title={text}>{text}</span>
			        	)
			        }
                }, {
                    title: '标签类型',
                    dataIndex: 'tagName',
                    width: "15%"
                }
            ],
            data: [ // table数据结构形式
                // {
                //     key: '131594206',
                //     sortIndex: "1",
                //     studentNo: "U20136789",
                //     name: '胡彦斌',
                //     collegeName: "机械工程学院",
                //     majorName: "动力学",
                //     className: "机电1514",
                //     tagName: "疑似失联"
                // }
            ],
            pagination: {
                current: 1,
                pageSize: 10,
                total: null
            },
            selectedRowKeys:[],
            selectedRows:[],
            showModal: false
        };
        this.handleTableChange = this.handleTableChange.bind(this); // table分页等等操作
        this.getData = this.getData.bind(this); // 获取表格数据
        this.showModal = this.showModal.bind(this); // 显示加入标签弹出框
        this.hideModal = this.hideModal.bind(this); // 隐藏显示加入标签弹出框
        this.handleModleSuccess = this.handleModleSuccess.bind(this); // 弹出框中加入标签成功后的操作
    }

	// table分页等等操作
    handleTableChange(page) {
        const {current, pageSize, total} = page;
        this.setState(
            ()=>{
                return {
                    pagination: {
                        current,
                        pageSize,
                        total
                    }
                }
            },
            () => {
                this.getData()
            }
        )
    }

	// 获取表格数据
    getData(){
        // const {year, college, major, classes, nameOrCode, mark} = this.props;
        const data = [
            {
                "studentNo": "210180121",
                "name": "熊冬瑞",
                "collegeName": "人文与社会科学学院",
                "majorName": "劳动与社会保障",
                "className": "社保181",
                "tagName": "重疾患者"
            },
            {
                "studentNo": "210180121",
                "name": "熊冬瑞",
                "collegeName": "人文与社会科学学院",
                "majorName": "劳动与社会保障",
                "className": "社保181",
                "tagName": "政治错误"
            },
            {
                "studentNo": "202180110",
                "name": "樊起康",
                "collegeName": "计算机工程学院",
                "majorName": "计算机科学与技术(嵌入式培养)(卓越计划)",
                "className": "计算机(嵌入)181",
                "tagName": "政治错误"
            },
            {
                "studentNo": "210180309",
                "name": "李仲",
                "collegeName": "人文与社会科学学院",
                "majorName": "社会工作",
                "className": "社工182",
                "tagName": "重疾患者"
            },
            {
                "studentNo": "210180309",
                "name": "李仲",
                "collegeName": "人文与社会科学学院",
                "majorName": "社会工作",
                "className": "社工182",
                "tagName": "政治错误"
            },
            {
                "studentNo": "202180110",
                "name": "樊起康",
                "collegeName": "计算机工程学院",
                "majorName": "计算机科学与技术(嵌入式培养)(卓越计划)",
                "className": "计算机(嵌入)181",
                "tagName": "重疾患者"
            },
            {
                "studentNo": "202180111",
                "name": "高铭",
                "collegeName": "计算机工程学院",
                "majorName": "计算机科学与技术(嵌入式培养)(卓越计划)",
                "className": "计算机(嵌入)181",
                "tagName": "成绩较好学生"
            },
            {
                "studentNo": "205180211",
                "name": "敖林",
                "collegeName": "材料工程学院",
                "majorName": "材料科学与工程",
                "className": "材料工程182",
                "tagName": "重点关注"
            },
            {
                "studentNo": "204180204",
                "name": "邓昱欣",
                "collegeName": "外国语学院",
                "majorName": "商务英语",
                "className": "商务英语181",
                "tagName": "疑似藏独"
            },
            {
                "studentNo": "215180312",
                "name": "耿浩楠",
                "collegeName": "汽车与轨道交通学院",
                "majorName": "车辆工程",
                "className": "车辆183",
                "tagName": "重点关注"
            }
        ]
        
        data.forEach(
            (item, index) => {
                // 注意： 这里使用学号作为key， 但是后端给的数据中， 同一个学生，不同的标签可以重复多条， 所以这里用学号+下标做区别
                // 在后边“加入标签”，中需要向后端提交选中的学生的学号，需要去掉后面的下标
                item.key= item.studentNo + "&&" + ( index - 0 ) + 1;
                item.sortIndex = (index - 0) + 1;
            }
        );
        this.setState({
            data: data,
            pagination: {
                total: 50
            }
        })
    }
    
    // 显示加入标签弹出框
    showModal(){
    	if (this.state.selectedRowKeys.length <= 0 || this.state.selectedRows.length <= 0) {
    		message.warn("请选择要加入标签的学生")
    	} else {
    		this.setState({
    			showModal: true
    		})
    	}
    }
    
    // 隐藏显示加入标签弹出框
    hideModal(){
    	this.setState({
			showModal: false
		})
    }
    
    //  弹出框中加入标签成功后的操作
    handleModleSuccess () {
    	// step1: 清空选中的学生
    	this.setState(
    		() => {
    			return {
    				selectedRowKeys:[],
        			selectedRows:[]
    			}
    		},
    		()=>{ 
    			// step2: 重新加载页面
    			const page = {
					current: 0,
					pageSize: 10,
					total: null
				};
				this.handleTableChange(page);
    		}
    	)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.setState(
                () => {
                    return {
                        data:[],
                        pagination: {
                            current: 1,
                            pageSize: 10,
                            total: null
                        },
                        selectedRowKeys:[],
                        selectedRows:[]
                    }
                },
                () => {
                    this.getData()
                }
            )
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true
        } else {
            return false            
        }
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            type: 'checkbox',
            columnWidth: "60px",
            onChange: (selectedRowKeys, selectedRows)=>{
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                })
            }
        }
        return(
        	<React.Fragment>
        	<Card>
        		<Button type="primary" style={{marginBottom: 20}} onClick={this.showModal}>加入标签</Button>
	            <Table
	                columns={this.state.columns}
	                dataSource={this.state.data}
	                pagination={this.state.pagination}
	                onChange={this.handleTableChange}
	                bordered={true}
	                rowSelection = {rowSelection}
	                onRow={
	                	(record) => {// 点击行, 获取行信息
		                    return {
		                        onClick: () => {
		                        	let clkRowKey = record.key;
		                        	let clkRowIndex;
		                        	let bool = false;
		                        	this.state.selectedRowKeys.forEach(
		                        		(item, index) => {
		                        			if (item === clkRowKey) { // 已经选中
												bool = true;
												clkRowIndex = index;
		                        			}
		                        		}
		                        	);
		                        	if (bool) { // 点击行已经选中,取消选中
		                        		let newSelectedRowKeys = this.state.selectedRowKeys;
		                        		let newSelectedRows=this.state.selectedRows;
		                        		newSelectedRowKeys.splice(clkRowIndex, 1);
		                        		newSelectedRows.splice(clkRowIndex, 1);
		                        		this.setState({
			                                selectedRowKeys: newSelectedRowKeys,
			                                selectedRows: newSelectedRows
			                            })
		                        	} else{ // 点击行未选中， 增加选中
		                        		let newSelectedRowKeys = this.state.selectedRowKeys;
		                        		let newSelectedRows=this.state.selectedRows;
		                        		newSelectedRowKeys.push(clkRowKey);
		                        		newSelectedRows.push(record);
		                        		this.setState({
			                                selectedRowKeys: newSelectedRowKeys,
			                                selectedRows: newSelectedRows
			                            })
		                        	}
		                        }
		                    };
		                }
	                }
	            />
            </Card>
            {
            	this.state.showModal ? 
            	<TagModal 
            		hideModal={this.hideModal} 
            		selectedRowKeys={this.state.selectedRowKeys} 
            		handleModleSuccess={this.handleModleSuccess}
            	/>
            	: 
            	null
            }
            </React.Fragment>
        );
    }
}

export default MarkTable;



