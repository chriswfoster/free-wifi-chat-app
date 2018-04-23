import React, { Component } from "react"
import { stack as Menu } from "react-burger-menu"

import "./hamburger.css"

class HamburgerMenu extends Component {
constructor(){
    super()
    this.state = {

    }
}

// componentDidMount() {
//     let firstword = colorWords[Math.floor(Math.random() * Math.floor(186))]
//     let secondword = animals[Math.floor(Math.random() * Math.floor(150))]

//     const word =
//       firstword[0].toUpperCase() +
//       firstword.slice(1) +
//       secondword[0].toUpperCase() +
//       secondword.slice(1)

//     const { endpoint } = this.state
//     const socket = socketIOClient(endpoint)
//     socket.on("FromServer", data => this.setState({ arrayOfMessages: data }))

//     this.setState({
//       color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
//         Math.random() * 255
//       )}, ${Math.floor(Math.random() * 255)})`,
//       user: word
//     })
//   }



  render() {
    return (
      <div className="navbarbackground">
        <Menu
          customBurgerIcon={
            <img src={require("./menu.png")} alt="Button icon" />
          }
        >
          <div> Menu / Info: </div>
          <p>
            <button
              onClick={() =>
                alert(
                  "Open your device/phone's wifi settings and disconnect from this wifi access point. You can usually tell your device to 'forget this network' as well."
                )
              }
            >
              How do I disconnect from this?
            </button>
          </p>
          <div><p>Members in chat:</p>
              
              </div>
          <p>Another item2</p>
          <p>Another item3</p>
        </Menu>
      </div>
    )
  }
}
export default HamburgerMenu
