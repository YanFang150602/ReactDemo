# React起步

安装

```shell
# 安装react的脚手架工具
npm install create-react-app -g
# 通过脚手架工具创建项目，项目名不可以大写
create-react-app reactdemo 
```

# prop-types

校验组件属性

1、引入：import PropTypes from 'prop-types'

2、给组件定义propTypes：TodoItem.propTypes = {...}

3、当存在父组件不传递某属性时，可以给该属性配置默认值TodoItem.defaultProps = {属性名: 属性默认值}

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { content } = this.props;
        return (
            <div onClick={this.handleClick}>
                {content}
            </div>
        )
    }

    handleClick() {
        const { deleteItem, index } = this.props;
        deleteItem(index);
    }
}

// 校验TodoItem属性类型
TodoItem.propTypes = {
    content: PropTypes.string,
    index: PropTypes.number,
    deleteItem: PropTypes.func,
    test: PropTypes.string.isRequired
}

// 父组件没有传递下面属性时，使用属性默认值
TodoItem.defaultProps = {
    test: 'Hello'
}

export default TodoItem;
```

# redux

1、安装redux

```shell
npm install redux --save
```

2、新建store/index.js，创建store，将全局的状态数据存到store里（store里的state）

```js
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;
```

3、新建store/reducer.js，接收业务js里的action，更改且返回全局状态数据（store里的state），

```js
const defaultState = {
    inputValue: '',
    list: []
}

export default (state = defaultState, action) => {
    if(action.type === 'CHANGE_INPUT_VALUE') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    else if(action.type === 'COMMIT_INPUT_VALUE') {
        const newState = {
            inputValue: '',
            list: [...state.list, state.inputValue]
        }
        return newState;
    }
    else if(action.type === 'DELETE_ITEM_VALUE') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1);
        return newState;
    }

    return state;
}
```

4、业务js里触发更改store里的state数据：store.dispatch(action)，这个会调用执行reducer.js里的方法；

且监听store.state的变化：store.subscribe(需要执行的函数名)，将更改的store里的state数据更新到业务js里

```js
import React, { Component, Fragment } from 'react';
import store from './store';
// import TodoItem from './TodoItem';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css';

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
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容</label>
                    <Input placeholder="todo..." style={{width: '300px', marginRight: '10px'}}
                        onChange={this.handleInputChange} value={this.state.inputValue}></Input>
                    <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
                </div>
                <List style={{marginTop: '10px',width: '300px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={ (item, index) => (<List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>)}
                />
            </Fragment>
        )
    }

    handleInputChange(e) {
        const action = {
            type: 'CHANGE_INPUT_VALUE',
            value: e.target.value
        }
        // 触发更改store里的state数据
        store.dispatch(action);
    }

    handleBtnClick() {
        const action = {
            type: 'COMMIT_INPUT_VALUE'
        }
        store.dispatch(action);
    }

    handleItemDelete(index) {
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
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
