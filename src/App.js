import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import NotFound from './pages/not-found'

// HashRouter: 锚点链接
// BrowserRouter: H5新特性 / history.push 上线之后，需要后台做一些处理：重定向



export default class app extends Component {
  render() {
    const userData=JSON.parse(sessionStorage.getItem('userData'));
    return (
      <Router>
        <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
        </Switch>
        {/* <Switch>
        <Route exact path='/' render= {userData ? ()=> <Admin /> :
        () => <Redirect to="/login" push />}></Route> 
        <Route path='/login' component={Login}></Route>
        <Route  component={NotFound}></Route>
        </Switch> */}
      </Router>
    )
  }
};



