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

export const notificationAction = message => {
    return {
        type: 'NOTIFY',
        data: { message: message }
    }
}

export default reducer