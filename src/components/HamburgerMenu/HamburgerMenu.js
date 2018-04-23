import React, {Component} from 'react';
import { stack as Menu } from "react-burger-menu"
class HamburgerMenu extends Component {


render() {
return(
<div className="navbarbackground">
<Menu customBurgerIcon={<img src={require("./menu.png")} alt="Button icon"/>}>
  <div> Menu / Info: </div>
  <p>
    <button onClick={()=> alert("Open your device/phone's wifi settings and disconnect from this wifi. You can usually tell your device to 'forget this network' as well.")}> How do I disconnect from this?</button>
  </p>
  <p>
  Another item</p>
  <p>
    Another item2
  </p>
  <p>
    Another item3
  </p>
</Menu>
</div>
)}
}
export default HamburgerMenu