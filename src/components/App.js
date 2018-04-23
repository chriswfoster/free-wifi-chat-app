import React, { Component } from 'react';
import ChatWindow from './ChatWindow/ChatWindow'
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HamburgerMenu />
      <ChatWindow />
      </div>
    );
  }
}

export default App;
