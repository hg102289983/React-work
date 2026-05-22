import React, { Component } from 'react';
import Login from './Login';
import HomePage from './HomePage';
import RiddleGame from './games/RiddleGame';
import CircleWordGame from './games/CircleWordGame';
import Calcgame from './games/CalcGame';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      screen: 'home',
    };
  }

  render() {
    const { isLogin, screen } = this.state;

    if (!isLogin) {
      return <Login onLogin={() => this.setState({ isLogin: true })} />;
    }
    if (screen === 'home') {
      return <HomePage onSelectGame={(s) => this.setState({ screen: s })} />;
    }
    if (screen === 'riddle') {
      return <RiddleGame onNext={() => this.setState({ screen: 'home' })} />;
    }
    if (screen === 'circleWord') {
      return <CircleWordGame onNext={() => this.setState({ screen: 'home' })} />;
    }
    if (screen === 'calc') {
      return <Calcgame onNext={()=> this.setState({screen:'home'})} />;
    }  
  }
}

export default App;
