import React, { Component } from 'react'
import {Switch, Route,Redirect} from 'react-router-dom'
import  ProductAddUpdate from './addupdate'
import  ProductDetail from './detail'
import  ProductHome from './home'
import './product.less'
//Product的默认子路由组件
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/product' component={ProductHome}/>
                <Route path='/product/addupdate' component={ProductAddUpdate}/>
                <Route path='/product/detail' component={ProductDetail}/>
                <Redirect to='/product' />

            </Switch>
        )
    }
}
