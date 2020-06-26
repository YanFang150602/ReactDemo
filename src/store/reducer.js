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