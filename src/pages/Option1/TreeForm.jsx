import React, { Component } from 'react'
import {
    Form,
    Tree,
    Input
} from 'antd'
import menuList from './menuConfig';

const Item = Form.Item;
const { TreeNode } = Tree;

export default class TreeForm extends Component {
    constructor(props) {
        super(props)
        const { menus } = this.props.role;
        this.state = {
            checkedKeys: menus,
        }

    }

    componentWillMount() {
        this.tressNodes = this.getTreeNodes(menuList)
    }

    // 根据新传入的role更新checkedKeys状态
    UNSAFE_componentWillReceiveProps (nextProps){
        //当组件接受到新的属性时调用 在render之前 初次接受props不会调用,更新时调用
        const  menus = nextProps.role.menus;
        // this.setState({
        //     checkedKeys:menus,
        // })
        console.log('UNSAFE_componentWillReceiveProps');
        this.state.checkedKeys = menus;
    }

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }

    getMenus = () => this.state.checkedKeys; //为父组件提交获取最新menus数据的方法

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }
    render() {
        const { role } = this.props;
        const { checkedKeys } = this.state;
        console.log('checkedKeys', checkedKeys);
        const formItemLayout = {
            labelCol: { span: 4 }, //左侧label宽度
            wrapperCol: { span: 8 },  //指定右侧包裹的宽度
        };
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                    <Input value={role.name} disabled />
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.tressNodes}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
