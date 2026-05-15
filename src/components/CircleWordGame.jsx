import { useState } from 'react';
import { problems } from '../data/problems';
import './CircleWordGame.css';


function CircleWordGame() {
  const problem = problems[0];

  const tokens = problem.text.map((line, lineIdx) => {
    if (line === '') {
      return { lineIdx, words: [] }; // 빈 줄
    }
    const words = line.split(' ').map((word, wordIdx) => ({
      key: lineIdx + '-' + wordIdx,
      word: word,
      isTarget: word.indexOf(problem.targetWord) !== -1,
    }));
    return { lineIdx, words };
  });

  let totalTargets = 0;
  for (let i = 0; i < tokens.length; i++) {
    for (let j = 0; j < tokens[i].words.length; j++) {
      if (tokens[i].words[j].isTarget) totalTargets += 1;
    }
  }


  const [selected, setSelected] = useState([]);
  // 채점 결과
  const [result, setResult] = useState(null);

  const toggleWord = (key) => {
    setResult(null);

    if (selected.indexOf(key) !== -1) {

      const next = selected.filter((k) => k !== key);
      setSelected(next);
    } else {

      const next = selected.concat([key]);
      setSelected(next);
    }
  };

  // 채점 버튼
  const handleGrade = () => {
    let correctPicks = 0;
    let wrongPicks = 0;
    for (let i = 0; i < tokens.length; i++) {
      const words = tokens[i].words;
      for (let j = 0; j < words.length; j++) {
        const w = words[j];
        if (selected.indexOf(w.key) !== -1) {
          if (w.isTarget) correctPicks += 1;
          else wrongPicks += 1;
        }
      }
    }


    const isPerfect = correctPicks === totalTargets && wrongPicks === 0;
    const message = isPerfect
      ? '정답! 「' + problem.targetWord + '」 ' + totalTargets + '개를 모두 찾았습니다.'
      : '오답. 맞게 고른 단어: ' + correctPicks + ' / ' + totalTargets + '개, 잘못 고른 단어: ' + wrongPicks + '개';

    setResult({
      ok: isPerfect,
      message: message,
    });
  };

  // 다시하기
  const handleReset = () => {
    setSelected([]);
    setResult(null);
  };

  return (
    <div className="circle-word-game">
      <h2>인지훈련 - 「{problem.targetWord}」 단어에 모두 동그라미 치기</h2>

      {/* 시 본문 */}
      <div className="poem">
        <h3 className="poem-title">{problem.title}</h3>
        <p className="poem-author">시인: {problem.author}</p>

        {tokens.map((line) => (
          <div key={line.lineIdx} className="poem-line">
            {line.words.length === 0 ? (
              <br />
            ) : (
              line.words.map((w) => {
                const isSelected = selected.indexOf(w.key) !== -1;
                return (
                  <span
                    key={w.key}
                    className={isSelected ? 'word selected' : 'word'}
                    onClick={() => toggleWord(w.key)}
                  >
                    {w.word}
                  </span>
                );
              })
            )}
          </div>
        ))}
      </div>

      {/* 채점 / 초기화 */}
      <div className="actions">
        <button type="button" onClick={handleGrade}>채점하기</button>
        <button type="button" onClick={handleReset}>다시하기</button>
      </div>

      {/* 결과 표시 (조건부 렌더링) */}
      {result && (
        <div className={result.ok ? 'result ok' : 'result ng'}>
          {result.message}
        </div>
      )}
    </div>
  );
}

export default CircleWordGame;
