import React, { Component } from 'react';
import Login from './Login';
import HomePage from './HomePage';
import MyPage from './MyPage';
import RiddleGame from './games/RiddleGame';
import CircleWordGame from './games/CircleWordGame';
import Calcgame from './games/CalcGame';
import ColorGuessGame from './games/ColorGuessGame';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userId: '',
      screen: 'home',
    };
  }
  
  saveRecord(gameId, score, total) {
    const { userId } = this.state;
    const key = `records_${userId}`;
    const raw = localStorage.getItem(key);
    const records = raw ? JSON.parse(raw) : {};

    const prev = records[gameId] || { bestScore: 0, bestTotal: total, playCount: 0 };
    const isBetter = score > prev.bestScore;

    records[gameId] = {
      bestScore:  isBetter ? score : prev.bestScore,
      bestTotal:  isBetter ? total : prev.bestTotal,
      playCount:  prev.playCount + 1,
      lastPlayed: new Date().toLocaleDateString('ko-KR'),
    };

    localStorage.setItem(key, JSON.stringify(records));
  }

  render() {
    const { isLogin, userId, screen } = this.state;

    if (!isLogin) {
      return (
        <Login onLogin={(id) => this.setState({ isLogin: true, userId: id })} />
      );
    }
    if (screen === 'home') {
      return (
        <HomePage
          userId={userId}
          onSelectGame={(s) => this.setState({ screen: s })}
          onMyPage={() => this.setState({ screen: 'mypage' })}
        />
      );
    }
    if (screen === 'mypage') {
      return (
        <MyPage
          userId={userId}
          onBack={() => this.setState({ screen: 'home' })}
        />
      );
    }
    if (screen === 'riddle') {
      return <RiddleGame onNext={() => this.setState({ screen: 'home' })} />;
    }
    if (screen === 'circleWord') {
      return <CircleWordGame onNext={() => this.setState({ screen: 'home' })} />;
    }
    if (screen === 'calc') {
      return <Calcgame onNext={() => this.setState({ screen: 'home' })} />;
    }
    if (screen === 'colorGuess') {
      return (
        <ColorGuessGame
          onNext={() => this.setState({ screen: 'home' })}
          onFinish={(score, total) => this.saveRecord('colorGuess', score, total)}
        />
      );
    }
  }
}

export default App;
