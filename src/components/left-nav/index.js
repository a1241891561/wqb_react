import React, { Component } from 'react'
import "./index.less"
import logo from '../../assets/images/1.png'
import {Link, withRouter} from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
const { SubMenu } = Menu;
//左侧导航栏
 class Leftnav extends Component {
    render() {
        //得到当前请求的路由路径
        const path = this.props.location.pathname;
        return (
            <div>
            <Link to='/home' className="left-nav">
                <header className="left-nav-header">
            <img src={logo} alt="logo" />
            <h1>硅谷后台</h1>
            </header>
            </Link>
            <Menu
            defaultSelectedKeys={[path]}
            // defaultOpenKeys={["sub1","sub2"]}
            mode="inline"
            theme="dark"
        >
          <Menu.Item key="/option1">
          <Link to='/option1'>
            <Icon type="pie-chart" />
            <span>Option 1</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/option2">
          <Link to='/option2'>
            <Icon type="desktop" />
            <span>Option 2</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/Category">
            <Link to='/Category'>
            <Icon type="unordered-list" />
            <span>品类管理</span>
                </Link>
                </Menu.Item>
            <Menu.Item key="/product">
            <Link to='/product'>
            <Icon type="taobao" />
            <span>商品管理</span>
                </Link>
                </Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="area-chart" />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key="/bar">
            <Link to='/bar'>
            <Icon type="bar-chart" />
            <span>柱形图</span>
                </Link>
                </Menu.Item>
            <Menu.Item key="/line">
            <Link to='/line'>
            <Icon type="line-chart" />
            <span>折线图</span>
                </Link>
                </Menu.Item>
            <Menu.Item key="/pie">
            <Link to='/pie'>
            <Icon type="pie-chart" />
            <span>圆形图</span>
                </Link>
                </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
            </div>
        )
    }
}
/*
  withRouter高阶组件:
  包装非路由组件，返回一个新的组件
  新的组件向非路由组件传递3个属性：history/location/match
*/
export default withRouter(Leftnav);
