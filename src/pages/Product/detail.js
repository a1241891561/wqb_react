import React, { Component } from 'react'
import {
    Card,
    Icon,
    List
} from 'antd';
const Item = List.Item

//Product的详情子路由组件


export default class ProductDetail extends Component {
    render() {
        const title = (
            <span>
                <Icon type='arrow-left'/>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>联想电脑</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>年度重量级新品，更加轻薄机身设计</span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span>年度重量级新品，更加轻薄机身设计</span>
                    </Item>
                </List>
            </Card>
        )
    }
}
