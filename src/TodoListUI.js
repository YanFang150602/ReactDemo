import React, { Component, Fragment } from 'react';
import { Input, Button, List } from 'antd';

/**
 * UI组件，主要负责界面的渲染
 */
class TodoListUI extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容</label>
                    <Input placeholder="todo..." style={{width: '300px', marginRight: '10px'}}
                        onChange={this.props.handleInputChange} value={this.props.inputValue}></Input>
                    <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>
                </div>
                <List style={{marginTop: '10px',width: '300px'}}
                    bordered
                    dataSource={this.props.list}
                    renderItem={ (item, index) => (<List.Item onClick={() => {this.props.handleItemDelete(index)}}>{item}</List.Item>)}
                />
            </Fragment>
        )
    }
}

export default TodoListUI;