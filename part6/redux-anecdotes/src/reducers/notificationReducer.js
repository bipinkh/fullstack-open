const initialNotification = 'notification example!'


const reducer = (state = initialNotification, action) => {
    switch (action.type){
        case 'NOTIFY':
            return action.data.message
        default:
            return state
    }
}

export const notificationAction = message => {
    return {
        type: 'NOTIFY',
        data: { message: message }
    }
}

export default reducer