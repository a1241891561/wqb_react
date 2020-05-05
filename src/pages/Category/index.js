import React, { Component } from 'react'
import { Card, Table, Icon, Button, Modal } from 'antd';
import { getFirstItem, reqUpdateCategory, reqAddCategory } from './../../api'
import axios from 'axios';
import AddForm from './addCategorys'
import UpdateForm from './updateCategorys'
import LinkButton from '../../components/link-button';


export default class Category extends Component {
    state = {
        loading: false,
        categorys: [], //1级分类列表
        parentId: '0',
        parentName: '',
        subcategorys: [],
        showStatus: 0  //标识添加

    }
    //异步获取一级/二级列表
    getCategorys = async (parentId) => {
        this.setState({
            loading: true
        })
        parentId = parentId || this.state.parentId;
        const result = await getFirstItem(parentId);
        if (parentId === '0') {
            this.setState({
                loading: false,
                categorys: result,
            })
        } else {
            this.setState({
                loading: false,
                subcategorys: result,
            })
        }

    }
    //显示指定一级分类对象的二级列表
    showSubCategorys = (category) => {
        //更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name,
        }, () => {
            this.getCategorys();
        })

    }
    //显示一级对象
    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subcategorys: [],
        })
    }
    //响应点击取消
    handleCancel = () => {
        if (this.form) {
            this.form.resetFields();
        }
        this.setState({
            showStatus: 0
        })
    }
    showadd = () => {
        this.setState({
            showStatus: 1
        })
    }
    showupdate = (category) => {
        this.category = category;
        this.setState({
            showStatus: 2
        })
    }
    //添加分类
    addCategory = () => {
        //隐藏确认框
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    showStatus: 0
                })
                //收集数据，并提交添加分类的请求
                const { categorys } = this.state;
                const _id = categorys.length;
                console.log("_id=>", _id);
                const { categoryName, parentId } = values
                const result = await reqAddCategory(categoryName, parentId, _id);
                if (parentId === this.state.parentId) {
                    //重新获取当前分类列表显示
                    this.getCategorys();
                } else if (parentId === '0') {  //在二级列表下添加一级分类
                    this.getCategorys('0');
                }
                this.form.resetFields();
            }
        }
        )
    }



    //更新分类
    updateCategory = () => {
        //进行表单验证，通过了才处理
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //隐藏确认框
                this.setState({
                    showStatus: 0
                })
                const { id, parentId, _id } = this.category;
                const { categoryName } = values
                //发请求
                const result = await reqUpdateCategory(categoryName, id, parentId, _id);
                //重新显示列表
                this.getCategorys();
                this.form.resetFields();
            }
        })

    }




    //为第一次render准备数据
    componentWillMount() {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                width: 300,
                render: (category) => (<span>
                    <LinkButton onClick={() => this.showupdate(category)}>修改分类</LinkButton>
                    {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}

                </span>)
            },
        ]
    }
    //发请求
    componentDidMount() {
        this.getCategorys();
    }
    render() {
        const { categorys, loading, parentId, subcategorys, parentName, showStatus } = this.state;
        const category = this.category || {};
        // card的右侧
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={this.showadd}><Icon type="plus" />添加</Button>
        )
        // const result = await getFirstItem();
        // console.log("result"+result);
        // axios.get('http://localhost:53000/data').then((res) =>{
        //     const datas =res.data;
        //     console.log(datas);
        // })
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table bordered size="middle" columns={this.columns} dataSource={parentId === '0' ? categorys : subcategorys}
                        rowKey='id'
                        loading={loading}
                        pagination={{ defaultPageSize: 8, showQuickJumper: true }}
                    />
                </Card>
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm categorys={categorys} parentId={parentId} setForm={(form) => { this.form = form }} />
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={category.name} setForm={(form) => { this.form = form }} />
                </Modal>
            </div>
        )
    }
}
