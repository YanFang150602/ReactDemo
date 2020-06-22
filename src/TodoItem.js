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