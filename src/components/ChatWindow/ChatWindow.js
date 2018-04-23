import React, { Component } from "react"
import axios from "axios"
import moment from "moment"
import Moment from "react-moment"
import socketIOClient from "socket.io-client"
import { nouns, adjectives, animals, colorWords } from "./WordSelector"

class ChatWindow extends Component {
  constructor() {
    super()
    this.state = {
      messagetext: "",
      user: "ChRiSwF",
      color: "red",
      arrayOfMessages: [],
      endpoint: "http://127.0.0.1:1738"
    }
  }

  componentDidMount() {
    let firstword = colorWords[Math.floor(Math.random() * Math.floor(186))]
    let secondword = animals[Math.floor(Math.random() * Math.floor(150))]

    const word =
      firstword[0].toUpperCase() +
      firstword.slice(1) +
      secondword[0].toUpperCase() +
      secondword.slice(1)

    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on("FromServer", data => this.setState({ arrayOfMessages: data }))

    this.setState({
      color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)})`,
      user: word
    })
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

    {
      this.state.messagetext.length > 0
        ? axios
            .post("/api/sendmessage", {
              user: this.state.user,
              color: this.state.color,
              time: date,
              message: this.state.messagetext
            })
            .then(response =>
              this.setState(
                { arrayOfMessages: response.data, messagetext: "" },
                () => elmnt.scrollIntoView()
              )
            )
        : alert("Please type a message first!")
    }
  }

  render() {
    console.log(this.state)
    const messages = this.state.arrayOfMessages.map((item, ind) => (
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
          onSubmit={e => this.sendMessage(e)}
        >
          <input
            className="submitInput"
            onChange={e => this.textHandler(e)}
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
