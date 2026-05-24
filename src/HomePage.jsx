const GAMES = [
  { id: 'riddle',     label: '1. 수수께끼 문제 풀기',        active: true  },
  { id: 'circleWord', label: '2. 동그라미 단어 게임',        active: true  },
  { id: 'calc',       label: '3. 거스름돈 계산하기',         active: true  },
  { id: 'memory',     label: '4. 그림 기억하기 (준비중)',     active: false },
];

function HomePage({ onSelectGame }) {
  const btnStyle = (active) => ({
    display: 'block', width: '100%', padding: '28px', marginBottom: '20px',
    fontSize: '26px', fontWeight: 'bold', borderRadius: '14px', border: 'none',
    background: active ? '#3a7d44' : '#ddd',
    color:      active ? '#fff'     : '#999',
    cursor:     active ? 'pointer'  : 'not-allowed',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '50px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '38px', color: '#3a7d44', marginBottom: '8px' }}>🧠 기억 창고</h1>
      <p  style={{ fontSize: '24px', color: '#666',    marginBottom: '40px' }}>오늘의 훈련을 시작하세요</p>
      {GAMES.map((g) => (
        <button key={g.id} style={btnStyle(g.active)} onClick={() => g.active && onSelectGame(g.id)}>
          {g.label}
        </button>
      ))}
    </div>
  );
}

export default HomePage;
