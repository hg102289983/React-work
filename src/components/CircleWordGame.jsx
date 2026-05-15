import { useMemo, useState } from 'react';
import { problems } from '../data/problems';

function CircleWordGame() {
  const problem = problems[0];

  const [selected, setSelected] = useState(new Set());
  const [result, setResult] = useState(null);


  const tokens = useMemo(() => {
    return problem.text.map((line, lineIdx) => {
      if (line === '') return { lineIdx, words: [] }; 
      const words = line.split(/\s+/).map((word, wordIdx) => ({
        key: `${lineIdx}-${wordIdx}`,
        word,
        isTarget: word.includes(problem.targetWord),
      }));
      return { lineIdx, words };
    });
  }, [problem]);

  // 정답 단어 총 개수
  const totalTargets = useMemo(
    () => tokens.reduce((sum, { words }) => sum + words.filter((w) => w.isTarget).length, 0),
    [tokens]
  );

  const toggleWord = (key) => {
    setResult(null);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleGrade = () => {
    let correctPicks = 0;
    let wrongPicks = 0;
    tokens.forEach(({ words }) => {
      words.forEach(({ key, isTarget }) => {
        if (selected.has(key)) {
          if (isTarget) correctPicks += 1;
          else wrongPicks += 1;
        }
      });
    });

    const isPerfect = correctPicks === totalTargets && wrongPicks === 0;
    setResult({
      ok: isPerfect,
      correctPicks,
      wrongPicks,
      totalTargets,
      message: isPerfect
        ? `정답! 「${problem.targetWord}」 ${totalTargets}개를 모두 찾았습니다.`
        : `오답. 맞게 고른 단어: ${correctPicks} / ${totalTargets}개, 잘못 고른 단어: ${wrongPicks}개`,
    });
  };

  const handleReset = () => {
    setSelected(new Set());
    setResult(null);
  };

  return (
    <div className="circle-word-game" style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
      <h2>인지훈련 - 「{problem.targetWord}」 단어에 모두 동그라미 치기</h2>

      {/* 시 본문 */}
      <div
        className="poem"
        style={{
          border: '1px solid #ccc',
          padding: 12,
          lineHeight: 2,
          marginBottom: 12,
        }}
      >
        <h3 style={{ textAlign: 'center' }}>{problem.title}</h3>
        <p style={{ textAlign: 'right' }}>시인: {problem.author}</p>
        {tokens.map(({ lineIdx, words }) => (
          <div key={lineIdx} style={{ textAlign: 'center' }}>
            {words.length === 0 ? (
              <br />
            ) : (
              words.map(({ key, word }) => {
                const isSelected = selected.has(key);
                return (
                  <span
                    key={key}
                    className={`word ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleWord(key)}
                    style={{
                      cursor: 'pointer',
                      margin: '0 2px',
                      padding: '2px 4px',
                      //선택 시 빨간 원 테두리
                      border: isSelected ? '2px solid red' : '2px solid transparent',
                      borderRadius: '50%',
                      display: 'inline-block',
                      userSelect: 'none',
                    }}
                  >
                    {word}
                  </span>
                );
              })
            )}
          </div>
        ))}
      </div>

      <div className="actions" style={{ marginBottom: 12 }}>
        <button type="button" onClick={handleGrade}>채점하기</button>
        &nbsp;
        <button type="button" onClick={handleReset}>다시하기</button>
      </div>

      {result && (
        <div
          className={`result ${result.ok ? 'ok' : 'ng'}`}
          style={{
            padding: 8,
            border: '1px solid',
            borderColor: result.ok ? 'green' : 'crimson',
            color: result.ok ? 'green' : 'crimson',
          }}
        >
          {result.message}
        </div>
      )}
    </div>
  );
}

export default CircleWordGame;
