const initialFilter = ''

const reducer = (state = initialFilter, action) => {
    switch (action.type){
        case 'FILTER':
            return action.data
        default:
            return state
    }
}

export const filterAction = query => {
    return {
        type: 'FILTER',
        data: query
    }
}

export default reducer