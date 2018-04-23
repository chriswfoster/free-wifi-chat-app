import React, { Component } from "react"
import ChatWindow from "./ChatWindow/ChatWindow"
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu"
import { animals, colorWords } from "./WordSelector"
import socketIOClient from "socket.io-client"
import axios from "axios"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      messagetext: "",
      user: "ChRiSwF",
      color: "red",
      arrayOfMessages: [],
      endpoint: "http://chat.chriswf.com",
      userList: []
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
    socket.on("MembersList", data => this.setState({ userList: data }))

    axios
      .post("/api/usercreate", {
        user: word,
        color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`
      })
      .then(response =>
        this.setState({ user: response.data.user, color: response.data.color })
      )
  }

  textHandler = e => {
    this.setState({ messagetext: e.target.value })
  }

  sendMessage = e => {
    var elmnt = document.getElementById("content") /// this keeps my chat at the bottom of the window.
    let date = Date.now() + ""
    date = date.substring(0, date.length - 3)
    e.preventDefault()
    e.target.reset()

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

  render() {
    return (
      <div className="App">
        <HamburgerMenu userList={this.state.userList} />
        <ChatWindow
          arrayOfMessages={this.state.arrayOfMessages}
          user={this.state.user}
          color={this.state.color}
          textHandler={this.textHandler}
          sendMessage={this.sendMessage}
        />
      </div>
    )
  }
}

export default App
