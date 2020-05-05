import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Upload,
    Icon,
    Button,
    Select
} from 'antd';
import LinkButton from '../../components/link-button';
import PicturesWall from './picturesWall';
import RichTextEditor from './rich-text-editor'
import {getFirstItem} from '../../api'
const {Item} = Form
const {TextArea} =Input
const {Option } = Select
const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      isLeaf: false,
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      isLeaf: false,
    },
  ];

class ProductAddUpdate extends Component {
    //创建用来保存ref标识的标签对象的容器
    constructor(props) {
        super(props)
        this.state = {
            options:[],
        };
        this.pw = React.createRef();
    }
    
    initOptions = (categorys) => {
        // 根据categorys生成options数组
        const options= categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }))
        this.setState({
            options,
        })
    }
    /* 获取一级/二级分类列表，并显示
    async函数的返回值是一个新的promise对象，promise的结果和值有async的结果来决定
    */
    getCategorys = async(parentId) => {
        const result = await getFirstItem(parentId);
        //如果是一级
        if(parentId==='0') {
          this.initOptions(result);
        }else {  //二级列表
          return result;  //返回二级列表==>当前async函数返回的promise就会成功且value为result

        }

        

    }
    submit = () =>{
        //进行表单验证，如果通过了，才发送请求
        const imgs = this.pw.current.getImgs();

        console.log('submit()',imgs);

    }

    loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[0];
        //显示loading
        targetOption.loading = true;

        //根据选中的分类，请求获取二级列表
        const subCategorys = await this.getCategorys(targetOption.value);
        targetOption.loading = false;
        //二级分类数组有数据
        if(subCategorys && subCategorys.length >0) {
            //生成一个二级列表的options
           const childOptions = subCategorys.map(c =>({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            //关联到当前options
            targetOption.children = childOptions;
        }else {
            //当前选中的分类没有二级分类
            targetOption.isLeaf = true;
        }

    
        // load options lazily
        
          //更新optipns状态
          this.setState({
            options: [...this.state.options],
          });
      };
    
    
    componentWillMount() {
        //取出携带的state
        const product = this.props.location.state;
        this.isUpdate =!!product;  // 保存一个是否是更新的标识
        this.product = product || {}  //保存商品，如果没有，保存是{}
    }

    
    componentDidMount() {
        this.getCategorys('0');
    }
    
    

    render() {
        const formItemLayout = {
            labelCol: { span: 2 }, //左侧label宽度
            wrapperCol: { span: 8 },  //指定右侧包裹的宽度
          }; 
        const {isUpdate, product} = this;

        const title = (
            <span><LinkButton>
            <Icon type= 'arrow-left' style={{fontSize:20}} />
            </LinkButton>
            <span>{isUpdate ? '修改商品' : '添加商品'}</span></span>
        )
        
        return (
            <Card title={title}>
              <Form {...formItemLayout}>
                  <Item label="商品名称">
                      <Input placeholder='请输入商品名称'/>
                  </Item>
                  <Item label="商品描述">
                      <TextArea placeholder='请输入商品描述' autosize={ {minRows:2, maxRows: 6}}/>
                  </Item>
                  <Item label="商品价格">
                     <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
                  </Item>
                  <Item label="商品分类">
                  <Cascader
                    options={this.state.options}   //需要显示的列表数据
                    loadData={this.loadData}  //加载下一级的数据
                  />
                  </Item>
                  <Item label="角色">
                     <Select>
                       <Option value='1'>A</Option>
                       <Option value='2'>B</Option>
                       
                     </Select>
                  </Item>
                  <Item label="商品图片">
                    <PicturesWall  ref={this.pw}/>
                  </Item>
                  <Item label="商品详情" labelCol={ {span: 2} }  wrapperCol={ {span: 20} }>
                    <RichTextEditor />
                  </Item>
                  <Item>
                     <Button type="primary" onClick={this.submit} style={{marginLeft: 150}}>提交</Button>
                  </Item>
              </Form>


            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate);

//子组件调用父组件的方法：将父组件的方法以函数属性传递给子组件，子组件就可以调用
//父组件调用子组件的方法：在父组件中通过ref得到子组件标签对象（也就是组件对象），调用方法
/*使用ref容器
1. 创建ref容器：this.pw = React.createRef();
2. 将ref容器交给需要获取的标签元素：  <PicturesWall  ref={this.pw}/>


*/