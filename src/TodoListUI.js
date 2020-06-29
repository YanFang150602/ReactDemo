import React, { Fragment } from 'react';
import { Input, Button, List } from 'antd';

/**
 * 无状态组件，比UI组件、容器组件性能高，是UI组件的简写
 */
const TodoListUI = (props) => {
    return (
        <Fragment>
            <div>
                <label htmlFor="insertArea">输入内容</label>
                <Input placeholder="todo..." style={{width: '300px', marginRight: '10px'}}
                    onChange={props.handleInputChange} value={props.inputValue}></Input>
                <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
            </div>
            <List style={{marginTop: '10px',width: '300px'}}
                bordered
                dataSource={props.list}
                renderItem={ (item, index) => (<List.Item onClick={() => {props.handleItemDelete(index)}}>{item}</List.Item>)}
            />
        </Fragment>
    )
}

export default TodoListUI;