import React, { Component } from "react"
import moment from "moment"
import Moment from "react-moment"



class ChatWindow extends Component {

  
  

  render() {
    console.log(this.props)
    const messages = this.props.arrayOfMessages.map((item, ind) => (
      <div style={{ color: `${item.color}` }} key={ind}>
        <p style={{ fontSize: ".4em", display: "inline" }}>{item.user}-</p>
        <p style={{ fontSize: ".2em", display: "inline" }}>
          {" ["}
          <Moment unix fromNow>
            {item.time}
          </Moment>]
        </p>
        <p style={{ display: "inline" }}>: {item.message}</p>
      </div>
    ))
    return (
      <div className="chatwindowMain">
        <div className="chatBoxWindowSub">
          {messages}
          <div id="content" />
        </div>
        <form
          style={{ width: "100%" }}
          className="submitForm"
          onSubmit={e => this.props.sendMessage(e)}
        >
          <input
            className="submitInput"
            onChange={e => this.props.textHandler(e)}
            type="text"
            placeholder="Type message here."
            autoFocus
          />
          <input type="submit" text="Send" className="submitButton" />
        </form>
      </div>
    )
  }
}
export default ChatWindow
