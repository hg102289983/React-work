import React, { useState } from 'react';

// =====================================================================
// 📝 데이터: 외부 파일 없이 직관적으로 컴포넌트 상단에 배치
// =====================================================================
const POEM_DATA = {
  title: '거울',
  author: '이상',
  targetWord: '거울',
  lines: [
    '거울 속에는 소리가 없소',
    '저렇게까지 조용한 세상은 참 없을 것이오',
    '',
    '거울 속에도 내게 귀가 있소',
    '내 말을 못 알아듣는 딱한 귀가 두 개나 있소',
    '',
    '거울 속의 나는 왼손잡이오',
    '내 악수를 받을 줄 모르는 악수를 모르는 왼손잡이오',
    '',
    '거울 때문에 나는 거울 속의 나를 만져보지를 못하는구료마는',
    '거울이 아니었던들 내가 어찌 거울 속의 나를 만나보기만이라도 했겠소',
    '',
    '나는 지금 거울을 안가졌소마는 거울 속에는 늘 거울 속의 내가 있소',
    '잘은 모르지만 외로된 사업에 골몰할게요',
    '',
    '거울 속의 나는 참 나와는 반대요마는',
    '또 꽤 닮았소',
    '나는 거울 속의 나를 근심하고 진찰할 수 없으니 퍽 섭섭하오'
  ]
};

// =====================================================================
// [자식 1] PoemBoard: 시 본문과 동그라미(클릭) 화면만 담당
// =====================================================================
function PoemBoard({ selectedKeys, onWordClick }) {
  return (
    <div style={{ border: '1px solid black', padding: '40px 30px', textAlign: 'center', backgroundColor: '#fff', marginBottom: '30px' }}>
      <h3 style={{ fontSize: '36px', marginBottom: '10px', color: '#333' }}>{POEM_DATA.title}</h3>
      <p style={{ fontSize: '24px', color: '#666', marginBottom: '40px',textAlign: 'right', paddingRight: '10%' }}>시인: {POEM_DATA.author}</p>

      <div>
        {POEM_DATA.lines.map((line, lineIdx) => (
          <div key={lineIdx} style={{ marginBottom: '15px', lineHeight: '2' }}>
            {line === '' ? (
              <div style={{ height: '30px' }}></div> // 빈 줄 처리
            ) : (
              line.split(' ').map((word, wordIdx) => {
                // 단어마다 고유한 주소(줄번호-단어번호)를 만듭니다.
                const wordKey = `${lineIdx}-${wordIdx}`;
                const isSelected = selectedKeys.includes(wordKey);

                return (
                  <span
                    key={wordKey}
                    onClick={() => onWordClick(wordKey)}
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      margin: '0 4px',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      borderRadius: '50px',
                      border: isSelected ? '4px solid #e53935' : '4px solid transparent',
                      backgroundColor: isSelected ? '#ffebee' : 'transparent',
                      transition: 'all 0.2s'
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
    </div>
  );
}

// =====================================================================
// [자식 2] RealTimeScore: 실시간 현황판 (밑에 몇 개 찾았는지 알려주는 칸)
// =====================================================================
function RealTimeScore({ correctCount, totalTargets, onNext }) {
  const isPerfect = correctCount === totalTargets; // 다 찾았는지 확인

  return (
    <div style={{ border: '1px solid black', padding: '30px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
      <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: isPerfect ? '20px' : '0' }}>
        찾은 '{POEM_DATA.targetWord}' 개수 : <span style={{ color: isPerfect ? 'green' : '#e53935', fontSize: '36px' }}>{correctCount}</span> / {totalTargets}
      </div>

      {isPerfect && (
        <div>
          <div style={{ fontSize: '24px', color: 'green', fontWeight: 'bold', marginBottom: '20px' }}>
            축하합니다! 모든 '{POEM_DATA.targetWord}'을(를) 다 찾으셨습니다! 👍
          </div>
          <button 
            onClick={onNext}
            style={{ padding: '15px 40px', fontSize: '22px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            다음 훈련 풀러가기 ➡️
          </button>
        </div>
      )}
    </div>
  );
}

// =====================================================================
// [부모] CircleWordGame: 전체 뼈대 및 상태(State) 관리 (순서도 기준점)
// =====================================================================
function CircleWordGame({ onNext }) {
  // 상태: 클릭된 단어들의 주소(Key)만 기억합니다.
  const [selectedKeys, setSelectedKeys] = useState([]);

  // 클릭 이벤트 (선택 <-> 해제)
  const handleWordClick = (wordKey) => {
    if (selectedKeys.includes(wordKey)) {
      setSelectedKeys(selectedKeys.filter(key => key !== wordKey));
    } else {
      setSelectedKeys([...selectedKeys, wordKey]);
    }
  };

  // 실시간 계산 로직 (순서도 그리기 매우 쉬운 직관적 로직)
  let totalTargets = 0;
  let correctCount = 0;

  POEM_DATA.lines.forEach((line, lineIdx) => {
    line.split(' ').forEach((word, wordIdx) => {
      // 이 단어에 '거울'이 포함되어 있다면?
      if (word.includes(POEM_DATA.targetWord)) {
        totalTargets++; // 정답 총 개수 1 증가
        
        // 게다가 사용자가 이 단어를 클릭(선택)까지 했다면?
        const wordKey = `${lineIdx}-${wordIdx}`;
        if (selectedKeys.includes(wordKey)) {
          correctCount++; // 맞춘 개수 1 증가
        }
      }
    });
  });

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      
      {/* 1. 전체적으로 보이는 칸 (헤더) */}
      <div style={{ backgroundColor: '#c5e0b4', padding: '15px', textAlign: 'center', fontSize: '26px', fontWeight: 'bold', marginBottom: '20px' }}>
        &lt;{POEM_DATA.title}&gt;에 동그라미를 해 보세요.
      </div>

      {/* 2. 시가 보이고 클릭하면 빨간색 동그라미 쳐지는 칸 */}
      <PoemBoard 
        selectedKeys={selectedKeys} 
        onWordClick={handleWordClick} 
      />

      {/* 3. 밑에 거울 몇 개 중 몇 개 찾았는지 알려주는 실시간 반영 칸 */}
      <RealTimeScore 
        correctCount={correctCount} 
        totalTargets={totalTargets} 
        onNext={onNext} 
      />

    </div>
  );
}

export default CircleWordGame;