import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table
} from 'antd'
import LinkButton from '../../components/link-button';
import memoryUtils from '../../utils/memoryUtils'
const Option = Select.Option

export default class ProductHome extends Component {
    state = {
        products : [
            {
            name: "联想笔记本",
            desc: "老年机，英雄联盟都没法玩",
            price: 2500,
            status: 1
            }

        ]
    }
    componentWillMount(){
      this.columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => '￥'+ price,
            width: 100,
        },
        {
            title: '状态',
            width: 100,
            dataIndex: 'status',
            render: (status) => {
                return <span>
                    <Button type="primary">下架</Button>
                    <span>在售</span>
                </span>
            }
        },
        {
            title: '操作',
            width: 100,
            render: (product) => {
                return (
                    <span>
                        <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            }
        },
      ]
    
    }

    showDetail = (product) => {
        //缓存对象给detail组件使用
      memoryUtils.product = product;
      this.props.history.push('/product/detail')
    }
    render() {
        const {products} = this.state;
        const title =(
            <div>
                <Select value="1" style={{width: 150}}>
                    <Option value="1">按名称搜索</Option>
                    <Option value="2">按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width: 200, margin: '0 15px'}}/>
                <Button type="primary">搜索</Button>
            </div>
        )
        const extra1 = (
            <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}><Icon type="plus"/>添加商品</Button>
        )

        return (
           <Card title={title} extra={extra1}>
             <Table 
              columns={this.columns} dataSource={products}
              rowKey= '_id'
              bordered

              />
           </Card>
        )
    }
}
