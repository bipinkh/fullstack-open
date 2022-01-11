
import React from 'react'
import {connect} from "react-redux";

const Notification = ({notification}) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.display){
    return <div style={style}>{notification.message}</div>
  }
  return <div></div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification