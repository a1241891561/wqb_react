import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

class UpdateForm extends Component {
    static propTypes ={
        categoryName: PropTypes.string.isRequired,
        setForm : PropTypes.func.isRequired,

    }

    componentDidUpdate() {
        this.props.setForm(this.props.form);
        console.log("update重新渲染");
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props;
        return (
            <Form>
                <Item>
                {
                  getFieldDecorator('categoryName',{
                    initialValue: categoryName,
                    rules: [
                        {required: true, message: '分类名称必须输入'}
                    ]

                  })( <Input placeholder='请输入修改后分类名称'/>)
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateForm);