import { useState } from 'react';
import { problems } from '../data/problems';
import PoemBoard from '../components/PoemBoard';
import RealTimeScore from '../components/RealTimeScore';
import './CircleWordGame.css';

function CircleWordGame() {
  const problem = problems[0];

  // 시 본문을 줄/단어 단위로 분해
  const tokens = problem.text.map((line, lineIdx) => {
    if (line === '') return { lineIdx, words: [] };
    const words = line.split(' ').map((word, wordIdx) => ({
      key: lineIdx + '-' + wordIdx,
      word: word,
      isTarget: word.indexOf(problem.targetWord) !== -1,
    }));
    return { lineIdx, words };
  });

  // 전체 정답 단어 개수
  let totalTargets = 0;
  for (let i = 0; i < tokens.length; i++) {
    for (let j = 0; j < tokens[i].words.length; j++) {
      if (tokens[i].words[j].isTarget) totalTargets += 1;
    }
  }

  const [selectedKeys, setSelectedKeys] = useState([]);

  // 현재까지 맞춘 정답 단어 개수 (실시간 계산)
  let correctCount = 0;
  for (let i = 0; i < tokens.length; i++) {
    for (let j = 0; j < tokens[i].words.length; j++) {
      const w = tokens[i].words[j];
      if (w.isTarget && selectedKeys.indexOf(w.key) !== -1) correctCount += 1;
    }
  }

  const handleWordClick = (key) => {
    if (selectedKeys.indexOf(key) !== -1) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys(selectedKeys.concat([key]));
    }
  };

  // 다음 문제로 이동 (현재는 초기화로 대체)
  const handleNext = () => {
    setSelectedKeys([]);
  };

  return (
    <div className="circle-word-game">
      <h2>인지훈련 - 「{problem.targetWord}」 단어에 모두 동그라미 치기</h2>

      <PoemBoard
        problem={problem}
        tokens={tokens}
        selectedKeys={selectedKeys}
        onWordClick={handleWordClick}
      />

      <RealTimeScore
        correctCount={correctCount}
        totalTargets={totalTargets}
        onNext={handleNext}
      />
    </div>
  );
}

export default CircleWordGame;
