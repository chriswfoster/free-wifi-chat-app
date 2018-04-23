import React, { Component } from "react"
import axios from "axios"
import Moment from "react-moment"
const moment = require("moment")

class ChatWindow extends Component {
  constructor() {
    super()
    this.state = {
      messagetext: "",
      user: "ChRiSwF",
      arrayOfMessages: []
    }
  }

  textHandler(e) {
    this.setState({ messagetext: e.target.value })
  }

  sendMessage(e) {
    var elmnt = document.getElementById("content") /// this keeps my chat at the bottom of the window.
    let date = Date.now() + ""
    date = date.substring(0, date.length - 3)
    e.preventDefault()
    e.target.reset()
    axios
      .post("/api/sendmessage", {
        user: this.state.user,
        time: date,
        message: this.state.messagetext
      })
      .then(response =>
        this.setState({ arrayOfMessages: response.data }, () =>
          elmnt.scrollIntoView()
        )
      )
  }

  render() {
    console.log(this.state)
    const messages = this.state.arrayOfMessages.map((item, ind) => (
      <div key={ind}>
        <p>
          {item.user}
          {" {"}
          <Moment unix fromNow style={{ fontSize: ".2em" }}>
            {item.time}
          </Moment>
          {"}: "}
          {item.message}
        </p>
      </div>
    ))
    return (
      <div className="chatwindowMain">
        <div className="chatBoxWindowSub">
          {messages}
          <div id="content" />
        </div>
        <form className="submitForm" onSubmit={e => this.sendMessage(e)}>
          <input onChange={e => this.textHandler(e)} type="text" />
          <input type="submit" text="Send" />
        </form>
      </div>
    )
  }
}
export default ChatWindow
