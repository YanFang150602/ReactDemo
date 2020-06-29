import React, { Component } from 'react';
import store from './store';
import TodoListUI from './TodoListUI';
import 'antd/dist/antd.css';

/**
 * 容器组件，主要负责业务逻辑的处理
 */
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        // 监听store.state的变化
        store.subscribe(this.handleStoreChange);
    }

    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                list={this.state.list}
                handleInputChange={this.handleInputChange}
                handleBtnClick={this.handleBtnClick}
                handleItemDelete={this.handleItemDelete}
            />
        )
    }

    handleInputChange(e) {
        console.log(e.target.value);
        // this.setState({
        //     inputValue: e.target.value
        // });

        // 新版本支持setState的参数为函数，函数会异步调取执行，提前将e.target.value存放到一变量中
        // const value = e.target.value;
        // this.setState( () => ({
        //     inputValue: value
        // }));
        
        const action = {
            type: 'CHANGE_INPUT_VALUE',
            value: e.target.value
        }
        store.dispatch(action);
    }

    handleBtnClick() {
        // this.setState({
        //     list: [...this.state.list, this.state.inputValue],
        //     inputValue: ''
        // });

        // setState里支持的函数参数，有一个参数prevState（原有state的值）
        // this.setState( (prevState) => ({
        //     list: [...prevState.list, prevState.inputValue],
        //     inputValue: ''
        // }));

        const action = {
            type: 'COMMIT_INPUT_VALUE'
        }
        store.dispatch(action);
    }

    handleItemDelete(index) {
        // const list = [...this.state.list];
        // list.splice(index, 1);
        // this.setState({
        //     list
        // });

        // this.setState( (prevState) => {
        //     const list = [...prevState.list];
        //     list.splice(index, 1);
        //     return {
        //         list
        //     };
        // });

        const action = {
            type: 'DELETE_ITEM_VALUE',
            index
        }
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }
}

export default TodoList;