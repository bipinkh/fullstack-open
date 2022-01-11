const initialNotification = {
    message: null,
    display: false
}


const reducer = (state = initialNotification, action) => {
    switch (action.type){
        case 'NOTIFY':
            return { message: action.data.message, display: true}
        case 'CLEAR':
            return { message: null, display: false}
        default:
            return state
    }
}

export const clearNotificationAction = () => {
    return {
        type: 'CLEAR',
        data: null
    }
}


let clearNotificationReference = null

export const setNotificationAction = (message, timeout = 5) => {
    return async dispatch => {
        dispatch( {type: 'NOTIFY', data: { message: message }} )
        if (clearNotificationReference) clearTimeout(clearNotificationReference)
        clearNotificationReference = setTimeout(() => dispatch(clearNotificationAction()), timeout*1000)
    }
}

export default reducer