import React, { Component } from 'react'
import {
    Form,
    Tree,
    Input
} from 'antd'

const Item = Form.Item

class AuthForm extends Component {


  componentWillMount() {
    this.props.setForm(this.props.form);
}
    render() {
        const { role } = this.props;
        const formItemLayout = {
            labelCol: { span: 4 }, //左侧label宽度
            wrapperCol: { span: 8 },  //指定右侧包裹的宽度
          }; 
          const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Item label='角色名称' {...formItemLayout}>
                {
                  getFieldDecorator('categoryName',{
                    initialValue: '',
                    rules: [
                        {required: true, message: '分类名称必须输入'}
                    ]
                  })( <Input placeholder='请输入分类名称'/>)
                }
                </Item>
                
            </Form>
        )
    }
}
export default Form.create()(AuthForm);