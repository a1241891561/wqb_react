import React, { Component } from 'react'
import  {Layout} from 'antd'
import  './admin.css'
import LeftNav from "../../components/left-nav";
import HeaderNav from "../../components/header";
import Option1 from '../Option1'
import Option2 from '../Option2'
import Category from '../Category'
import Bar from '../Charts/bar'
import Line from '../Charts/line'
import Pie from '../Charts/pie'
import Home from '../Home'
import Product from '../Product'
import Role from '../Role'
import {
    Redirect,
    Route,
    Switch
  } from 'react-router-dom'
import NotFound from '../not-found';


const {Header, Footer, Sider, Content} = Layout;
export default class Admin extends Component {
    render() {
        const userData=JSON.parse(sessionStorage.getItem('userData'));
        if(!userData)
           return <Redirect to ="/login" />
        return (            
            <Layout className="l1">
                <Sider><LeftNav/></Sider>
                <Layout>
                    <HeaderNav/>
                    <Content style={{margin: 20}}>
                    <Switch>
                    <Redirect exact={true} from='/' to='/home'/>
                    <Route path='/option1' component={Option1}></Route>
                    <Route path='/option2' component={Option2}></Route>
                    <Route path='/Category' component={Category}></Route>
                    <Route path='/product' component={Product}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/role' component={Role}></Route>
                    <Route path='/bar' component={Bar}></Route>
                    <Route path='/line' component={Line}></Route>
                    <Route path='/pie' component={Pie}></Route>
                    <Route  component={NotFound}></Route>
                    </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout> 
            
        )
    }
}
