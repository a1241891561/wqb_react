import React, { Component } from 'react'
import './login.less'
import logo from '../../assets/images/1.png'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { reqLogin } from '../../api';


class Login extends Component {
    handleSubmit = (event) => {
        //阻止事件的默认行为
        event.preventDefault();
        const form = this.props.form;
        // const values = form.getFieldsValue();
        // console.log(values.username);
        form.validateFields(async (err, values) => {
          // if (!err) {
           const {username,password} = values;
          //  const result = await reqLogin(username, password);
           if(username==='1234'&& password==='1234'){
            console.log('请求成功',values);
            sessionStorage.setItem('userData',JSON.stringify(values));
            // const user=result.data;
            this.props.history.replace('/');
           }else{
             console.log('请求失败')};
          // }else {
          //   console.log('校验失败');
          // }
        });

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名必须输入！' },
            { min: 4, message: '用户名至少4位' },
            { max: 12, message: '用户名最多12位' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或者下划线组成' },
          ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
                </section>
            </div>
        )
    }
}
/*
1.高阶函数
  1).一类特别的函数
    a.接受函数类型的参数
    b.返回值是函数
2.高阶组件
   1。本质是一个函数
   2. 接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性。
   3. 用来扩展组件的功能
*/
const WrapLogin = Form.create()(Login);
export default WrapLogin;