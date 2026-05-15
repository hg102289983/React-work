import React from 'react';

function Home({ onSelectGame }) {
  const containerStyle = { padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' };
  const buttonStyle = { display: 'block', width: '90%', maxWidth: '500px', margin: '20px auto', padding: '25px', fontSize: '24px', fontWeight: 'bold', borderRadius: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' };
  const activeButtonStyle = { ...buttonStyle, backgroundColor: '#4CAF50', color: 'white' };
  const disabledButtonStyle = { ...buttonStyle, backgroundColor: '#e0e0e0', color: '#888', cursor: 'not-allowed' };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '40px', color: '#333', marginBottom: '10px' }}>🧠 기억 창고</h1>
      <h2 style={{ fontSize: '28px', color: '#666', marginBottom: '50px' }}>오늘의 훈련을 시작하세요</h2>

      {/* 버튼 클릭 시 확실하게 화면 전환 함수 실행 */}
      <button style={activeButtonStyle} onClick={() => onSelectGame('riddle')}>
        1. 수수께끼 문제 풀기
      </button>

      <button style={activeButtonStyle} onClick={() => onSelectGame('circleWord')}>
        2. 동그라미 단어 게임
      </button>

      <button style={disabledButtonStyle} disabled>
        3. 마트 거스름돈 계산 (준비 중)
      </button>
    </div>
  );
}

export default Home;