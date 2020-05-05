import React, { Component } from 'react'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {


  componentDidUpdate() {
    this.props.setForm(this.props.form);
    console.log("add重新渲染");
}
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categorys, parentId } = this.props;
        return (
            <Form>
                <Item>
                {
                  getFieldDecorator('parentId',{
                   initialValue: parentId
                  }
                  )( <Select>
                    <Option value='0'>一级分类</Option>
                    {
                      categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                    }
                </Select>)
                }
                </Item>
                <Item>
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
export default Form.create()(AddForm);