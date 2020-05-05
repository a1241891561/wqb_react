import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
}from 'antd';
import AuthForm from './AuthForm';
import TreeForm from './TreeForm';
import {reqAddRole, reqUpdateRole}  from '../../api';
import {formateDate} from '../../utils/dataUtils';
 
export default class Option1 extends Component {
    state ={
        roles:[
            {
                menus: [
                    "/category",
                    "/product",
                    "/role"
                ],
                _id: 1,
                name: "角色1",
                create_time: 1554639552758,
                _v: 0,
                auth_time: 1557630307021,
                auth_name: "admin",
            },
            {
                menus: [
                    "/home",
                    "/product",
                ],
                _id: 2,
                name: "角色2",
                create_time: 1554639552758,
                _v: 0,
                auth_time: 1557630307021,
                auth_name: "admin2",
            }
        ],  //所有角色的列表
        role: {}, //选中的role
        showStatus: false, //是否显示设置角色页面
        isShowAdd: false,
    }
    constructor (props) {
        super(props)
        this.auth = React.createRef();
    }
    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render:  (create_time) => formateDate(create_time),
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:  formateDate,
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ]
    }

    onRow =(role) => {
        return {
            onClick: event=>{ //点击了行
                this.setState({
                    role,
                })
            }
        }
    }

    updateRole = async () => {
        const {role} = this.state;
        this.setState({
            showStatus: false,
        })
       const menus = this.auth.current.getMenus()
       console.log('menus',menus);
       role.menus =  menus;
       //取出用户信息   
       const userData = JSON.parse(sessionStorage.getItem('userData'));
       console.log('userData',userData);
       role.auth_name = userData.username;
       role.auth_time = Date.now();
       //请求更新
       const result = await reqUpdateRole(role);
       if(result.status === 0)
       {
          message.success("设置权限成功");
          this.setState({
              roles: [...this.state.roles]
          })
       }
    }

    addRole = () => {
        this.form.validateFields(async (err, values) => {
            if(!err){
                this.setState({
                    isShowAdd: false,
                })
                this.form.resetFields();
                //收集数据，并提交添加分类的请求
                const { roleName } = values
                const result = await reqAddRole(roleName);
                if(result.status === 0){
                    //重新获取当前分类列表显示
                  message.success('添加角色成功');
                  // 新产生的角色
                  const role = result.data;
                  // 更新roles状态
                //   const roles = this.state.roles;
                //   const roles = [...this.state.roles];
                //   roles.push(role);
                //   this.setState({
                //       roles
                //   })
                
                //更新roles状态，基于原本的状态数据更新
                this.setState(state => ({
                    roles:[...state.roles, role],
                })
                )
                } else{  //在二级列表下添加一级分类
                    message.success('添加角色失败');
                }
                
            }
        }
        )     
    }

    componentWillMount () {
        this.initColumn();
    }
    render() {
        const {roles, role,showStatus, isShowAdd} = this.state;
        const title = (
            <span>
                <Button type="primary" onClick={()=> {
                    this.setState({
                        isShowAdd: true,
                    })
                }
                }>创建角色</Button> &nbsp;&nbsp;
                <Button type="primary" disabled={! role._id} onClick={()=> {
                    this.setState({
                        showStatus: true,
                    })
                }
                }>设置角色权限</Button>
            </span>
        )
        let key = 0;
        return (
            <div>
            <Card title={title}>
               <Table bordered size="middle" columns={this.columns} dataSource={roles} 
                rowKey= "_id"
                // loading={loading}
                pagination={ {defaultPageSize: 3} }
                rowSelection= {{type:'radio', selectedRowKeys: [role._id],
                onSelect: (role) => {
                    this.setState({
                        role,
                    })
                }
            
            }}
                onRow = {this.onRow}
                />
            </Card>
            <Modal
                title="设置角色权限"
                visible={showStatus}
                onOk={this.updateRole}
                onCancel={()=> {
                    this.setState({
                        showStatus: false,
                    })
                }
                }
                >
                <TreeForm role={role} ref={this.auth}/>
                </Modal>




                <Modal
                title="添加角色"
                visible={isShowAdd}
                onOk={this.addRole}
                onCancel={()=> {
                    this.setState({
                        isShowAdd: false,
                    })
                    this.form.resetFields();
                }
                }
                >
                <AuthForm  role={ role }  setForm = {(form)=> {this.form = form}}
                
                />
                </Modal>
            </div>
        )
    }
}
