import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';
//每个函数的返回值都是promise
const BASE = ''
//登录
export const reqLogin = (username, password) =>
    ajax(BASE + '/login', {username, password}, 'POST');

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/mananger/user/add', user, 'POST');

//json请求的接口请求函数
export const reqWeather = (city) =>{
    return new Promise((resolve,reject) => {
        const url = `http://api.map.baidu.com/weather?location=${city}&&`;
        //发送jsonp请求
        jsonp(url, {}, (err, data)=> {
            console.log('jsonp()',err,data);
            if(!err && data.status==='success'){
                //取出需要的数据
                const {dayPictureUrl, weather} = data.result[0].weather_data[0];
                resolve({dayPictureUrl, weather});
            }else{
            message.error('获取天气信息失败');
            }
        })
    })
}

export const getFirstItem = (parentId) => ajax(BASE + '/data',{ parentId });
//添加一级分类
export const reqAddCategory = (name,parentId,_id) => ajax(BASE + '/data', { name, parentId,_v:0, _id: parentId==="0" ?_id+1:0 } ,'POST');
//更新分类
export const reqUpdateCategory = (name, id,parentId,_id) => ajax(BASE + '/data/'+ id, {name,parentId,_v:0,_id} ,'PUT');
// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update': 'add'), {product},'POST');
// 获取所有角色的列表
export const reqRoles = () => ajax(BASE+ '/manage/role/list')
// 添加角色
export const reqAddRole = () => ajax(BASE+ '/manage/role/list')
//更新角色
export const reqUpdateRole = (role) => ajax(BASE+ '/manage/role/update', role, 'POST');
// 获取用户列表
export const reqUsers = () => ajax(BASE + '/manager/user/list');