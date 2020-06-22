import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容</label>
                    <input id="insertArea"
                            className="input"
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}></input>
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    {this.getTodoItem()}
                </ul>
            </Fragment>
        )
    }

    getTodoItem() {
        return (
            this.state.list.map((item, index) => {
                return (
                    <TodoItem key={index} content={item} index={index}
                            deleteItem={this.handleItemDelete}></TodoItem>
                )
            })
        )
    }

    handleInputChange(e) {
        // this.setState({
        //     inputValue: e.target.value
        // });

        // 新版本支持setState的参数为函数，函数会异步调取执行，提前将e.target.value存放到一变量中
        const value = e.target.value;
        this.setState( () => ({
            inputValue: value
        }));
    }

    handleBtnClick() {
        // this.setState({
        //     list: [...this.state.list, this.state.inputValue],
        //     inputValue: ''
        // });

        // setState里支持的函数参数，有一个参数prevState（原有state的值）
        this.setState( (prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }));
    }

    handleItemDelete(index) {
        // const list = [...this.state.list];
        // list.splice(index, 1);
        // this.setState({
        //     list
        // });

        this.setState( (prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {
                list
            };
        });
    }
}

export default TodoList;