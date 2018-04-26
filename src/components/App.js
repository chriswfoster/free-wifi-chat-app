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
      endpoint: "/",
      userList: []
    }
    this.socket = socketIOClient("/")
  }

  componentDidMount() {
    var elmnt = document.getElementById("content") /// this keeps my chat at the bottom of the window.
    let firstword = colorWords[Math.floor(Math.random() * Math.floor(186))]
    let secondword = animals[Math.floor(Math.random() * Math.floor(150))]

    const word =
      firstword[0].toUpperCase() +
      firstword.slice(1) +
      secondword[0].toUpperCase() +
      secondword.slice(1)

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

    this.socket.on("Messages", data => {
      console.log(data)
      // let placeholder = this.state.arrayOfMessages
      // placeholder.push(data)
      this.setState({ arrayOfMessages: data }, () => elmnt.scrollIntoView())
    })

    this.socket.on("delete message", data => {
      console.log(data)
      // this.setState({ arrayOfMessages: data })
    })
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

    let sendObj = {
      user: this.state.user,
      color: this.state.color,
      time: date,
      message: this.state.messagetext
    }

    this.state.messagetext.length > 0
      ? this.socket.emit("Messages", sendObj)
      : alert("Please type a message first!")

    this.setState({ messagetext: "" }, () => elmnt.scrollIntoView())
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <HamburgerMenu userList={this.state.userList} />
        <ChatWindow
          arrayOfMessages={this.state.arrayOfMessages}
          user={this.state.user}
          color={this.state.color}
          theText={this.state.messagetext}
          textHandler={this.textHandler}
          sendMessage={this.sendMessage}
        />
      </div>
    )
  }
}

export default App
