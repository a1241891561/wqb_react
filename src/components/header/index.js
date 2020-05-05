import React, { Component } from 'react'
import {formateDate} from '../../utils/dataUtils'
import { Modal } from 'antd';
import { withRouter, Redirect} from 'react-router-dom'
import {reqWeather} from '../../api'
import "./index.less"
import LinkButton from '../link-button'

const { confirm } = Modal;


class Header extends Component {
    state ={
        cuurrentTime: formateDate(Date.now()), //当前时间
        dayPictureUrl: '',
        weather: ''

    }
    getTime = () =>{
        //每隔1s获取当前时间
        this.intervalId = setInterval(()=>{
         const cuurrentTime = formateDate(Date.now())
         this.setState({cuurrentTime});
        },1000)
    }
    logout =() =>{
        confirm({
            content: '确认退出吗',
            onOk:() =>{
            //   console.log('OK');
            sessionStorage.removeItem('userData');
            this.props.history.replace('/login');
            
            }
          });
    }
    // getWeather = async() => {
    //     const {dayPictureUrl, weather} = await reqWeather('郑州');
    //     this.setState({dayPictureUrl, weather});
    // }

     
    /*
    第一次render()之后执行一次
    一般在此执行异步操作：发ajax请求/启动定时器
    */
    componentDidMount(){
      this.getTime();
      //获取当前天气的显示
    //   this.getWeather();
    }
    //当前组件卸载之前调用
    componentWillUnmount(){
      //清除定时器
      clearInterval(this.intervalId);
    }
    render() {
        const {cuurrentTime,dayPictureUrl,weather} =this.state;
        const userData=JSON.parse(sessionStorage.getItem('userData'));
        return (
            <div className="header">             
                <div className="header-top">
                <span>欢迎, {userData.username || '无'}</span>
                <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-buttom">
                   <div className="header-buttom-left">首页</div>
                   <div className="header-buttom-right">
                       <span>{cuurrentTime}</span>
                   </div>
                </div>             
            </div>
            
        )
    }
}
export default withRouter(Header);