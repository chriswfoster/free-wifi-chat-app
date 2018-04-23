import React, { Component } from "react"
import { stack as Menu } from "react-burger-menu"

import "./hamburger.css"

class HamburgerMenu extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const users = this.props.userList.map((item, ind) => (
      <p key={ind} style={{ color: `${item.color}`, border: "none" }}>
        {item.user},
      </p>
    ))
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
          <p>
            <button
              onClick={() =>
                alert("Why not? For practice, fun, curiosity, etc?")
              }
            >
              Why broadcast this chat app?
            </button>
          </p>
          <div>
            <p style={{ border: "none" }}>Members in chat: </p>
            {users}
          </div>
        </Menu>
      </div>
    )
  }
}
export default HamburgerMenu
