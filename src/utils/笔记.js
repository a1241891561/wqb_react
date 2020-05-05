import { reqAddUser, reqRoles } from "../api"
import { message, Select } from "antd"

//添加更新用户
addOrUpdateUser = async() => {
    //1.收集输入数据
    const user = this.FormData.getFieldsValue()
    this.FormData.resetFields()

    // 2. 提交添加的请求
    const result = await reqAddUser(user)
    //3. 更新列表显示
    if(result.status===0) {
        message.success('添加用户成功');
        this.getUsers();
    }
}

//绑定按下回车
class App extends Component {
        keypress(e) {   
          if (e.which !== 13) return   
          console.log('你按了回车键...')   
        }
     
        render() {  
            return (
                <div>
                   <textarea onKeyPress={this.keypress}></textarea>  
                </div>
     
            )
     
        }
     
    }


    <Select>
        {
            reqRoles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
        }
    </Select>


在所有子item中查找匹配的
const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);
message.success(`${this.user? '修改' : '添加'}用户成功`);


//判断当前用户对item是否有权限
hasAuth = (item) => {
    const key = item.key;
    const menus =memoryUtils.user.role.menus
    const username =memoryUtils.user.username;
    if(username === 'admin' || isPublic || menus.indexOf(key)!== -1){
        return true
    } else if (item.children){
       return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }
    return false;

}

//如果当前更新的是自己角色的权限，强制退出
memoryUtils.user = {}
storageUtils.removeUser();
this.props.history.replace('/login');


//登录的异步action
// export const login = (username, password) => {
//     return async dispatch => {
//         // 1.执行异步Ajax请求
//         const result = await reqLogin(username, password);
//         if(result.status ===0){
//           const  user = result.data;
//           dispatch({type: 'xxx',data: user});
//         }else {

//         }
//     }
// }



var result = [];
var a = 3;
var total = 0;
function foo(a) {
  var i = 0;
  for (; i < 3; i++) {
    result[i] = function() {
      total += i * a;
      console.log(total);
    }
  }
}

foo(1);
result[0]();
result[1]();
result[2]();

 // 原来，宏任务与微任务，都各自有一个调用队列（先进先出）。

  // 遇到宏任务，微任务，则将他们推入各自的调用队列。需要注意的是，同步代码也是宏任务。
  
  // 宏任务执行完一个，则去清空微任务队列，微任务清空后再去执行下一个宏任务。


async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }
  
  async function async2() {
    console.log('async2 start');
    return new Promise((resolve, reject) => {
      resolve();
      console.log('async2 promise');
    })
  }
  
  console.log('script start');
  
  setTimeout(function() {
    console.log('setTimeout');
  }, 0);
  
  async1();
  
  new Promise(function(resolve) {
    console.log('promise1');
    resolve();
  }).then(function() {
    console.log('promise2');
  }).then(function() {
    console.log('promise3');
  });
  
  console.log('script end');
  
  // script start
  // async1 start
  // async2 start
  // async2 promise
  // promise1
  // script end
  // promise2
  // promise3
  // async1 end
  // setTimeout


  function a(){
    var a = 0;
    return function (){
      a++;
      if(a % 2 == 0)
      return 0;
      else 
      return 1;
    }
  }

  let c = a();
  c();


  //清除浮动 父元素添加
  /*
  .clear-fix:after {
    display: table;
    content: '';
    clear: both;
  }
  */

//  子元素 padding和margin的上下左右的数值都是根据父级的宽度算出的，而高度是父级的高度算出的。