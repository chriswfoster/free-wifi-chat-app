import React, { Component } from "react"
import ChatWindow from "./ChatWindow/ChatWindow"
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu"
import { nouns, adjectives, animals, colorWords } from "./WordSelector"
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
    socket.on("")
    this.setState({
      color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)})`,
      user: word
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
    return (
      <div className="App">
        <HamburgerMenu />
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
