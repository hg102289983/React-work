import { useState } from 'react';
import { problems } from '../data/problems';
import './CircleWordGame.css';

/**
 * CircleWordGame - 인지훈련 워크북 (단어에 동그라미 치기) 뼈대
 *
 * 사용 기술 (수업 범위):
 *  - 함수 컴포넌트
 *  - useState (상태 관리)
 *  - JSX + 중괄호({})로 JS 삽입
 *  - 이벤트 핸들링 (onClick, 카멜표기 + 함수 전달)
 *  - 조건부 렌더링 (삼항 연산자, && 연산자)
 *  - 상태 불변성 유지 (배열을 새로 만들어 setState)
 *
 * UI/UX는 팀원과 맞출 부분이라 의도적으로 최소 스타일만 적용했음.
 */
function CircleWordGame() {
  // 일단 단일 문제 사용
  const problem = problems[0];

  // 시 본문을 (줄, 단어) 단위로 미리 분해
  // key 형식: "lineIdx-wordIdx"
  const tokens = problem.text.map((line, lineIdx) => {
    if (line === '') {
      return { lineIdx, words: [] }; // 빈 줄
    }
    const words = line.split(' ').map((word, wordIdx) => ({
      key: lineIdx + '-' + wordIdx,
      word: word,
      // 정답 단어 포함 여부 (부분 일치 - '거울이', '거울을' 등도 정답으로 인정)
      isTarget: word.indexOf(problem.targetWord) !== -1,
    }));
    return { lineIdx, words };
  });

  // 정답 단어 총 개수
  let totalTargets = 0;
  for (let i = 0; i < tokens.length; i++) {
    for (let j = 0; j < tokens[i].words.length; j++) {
      if (tokens[i].words[j].isTarget) totalTargets += 1;
    }
  }

  // 클릭된 단어의 key 배열
  const [selected, setSelected] = useState([]);
  // 채점 결과
  const [result, setResult] = useState(null);

  // 단어 클릭 토글
  const toggleWord = (key) => {
    setResult(null);
    // 불변성을 지키기 위해 새 배열을 만들어 setState
    if (selected.indexOf(key) !== -1) {
      // 이미 선택되어 있으면 제외
      const next = selected.filter((k) => k !== key);
      setSelected(next);
    } else {
      // 선택되어 있지 않으면 추가
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

    // 정답 조건: 정답 단어를 전부 + 오답은 0개
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
