import React, { useState } from 'react';
import './App.css';
import Home from './Home';
import RiddleGame from './games/RiddleGame'; 
import CircleWordGame from './games/CircleWordGame';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleSelectGame = (gameId) => {
    setCurrentScreen(gameId); // 'riddle' 신호를 받으면 currentScreen이 'riddle'로 바뀝니다.
  };

  return (
    <div>
      {/* 홈 화면 */}
      {currentScreen === 'home' && (
        <Home onSelectGame={handleSelectGame} />
      )}

      {/* 1번 게임: 수수께끼 */}
      {currentScreen === 'riddle' && (
        // 게임이 끝나고 '다음 문제 풀러가기'를 누르면 다시 홈으로 돌아오도록 onNext 함수를 넘겨줍니다.
        <RiddleGame onNext={() => setCurrentScreen('home')} />
      )}
      {/* 🌟 2번 게임: 동그라미 단어 게임 */}
      {currentScreen === 'circleWord' && (
        <CircleWordGame onNext={() => setCurrentScreen('home')} />
      )}
    </div>
  );
}

export default App;