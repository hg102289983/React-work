import { Component } from 'react';

const GAME_LABELS = {
  colorGuess: '초성 색상 맞추기',
  riddle:     '수수께끼 문제 풀기',
  circleWord: '동그라미 단어 게임',
  calc:       '거스름돈 계산하기',
};

class MyPage extends Component {
  // localStorage에서 해당 유저의 기록 불러오기
  getRecords() {
    const { userId } = this.props;
    const raw = localStorage.getItem(`records_${userId}`);
    return raw ? JSON.parse(raw) : {};
  }

  render() {
    const { userId, onBack } = this.props;
    const records = this.getRecords();
    const gameIds = Object.keys(GAME_LABELS);

    return (
      <div style={styles.container}>
        {/* 헤더 */}
        <div style={styles.header}>👤 마이페이지</div>

        {/* 프로필 카드 */}
        <div style={styles.profileCard}>
          <span style={styles.avatar}>🧓</span>
          <div>
            <p style={styles.userName}>{userId}</p>
            <p style={styles.userSub}>인지 강화 훈련 중</p>
          </div>
        </div>

        {/* 게임 기록 */}
        <div style={styles.sectionTitle}>📊 게임 기록</div>

        {gameIds.map((gameId) => {
          const rec = records[gameId];
          return (
            <div key={gameId} style={styles.recordCard}>
              <div style={styles.recordGame}>{GAME_LABELS[gameId]}</div>
              {rec ? (
                <div style={styles.recordInfo}>
                  <span>🏆 최고점수: <strong>{rec.bestScore}</strong> / {rec.bestTotal}</span>
                  <span style={{ marginLeft: '20px' }}>🎮 플레이: <strong>{rec.playCount}</strong>회</span>
                  <div style={styles.lastPlayed}>최근 플레이: {rec.lastPlayed}</div>
                </div>
              ) : (
                <div style={styles.noRecord}>아직 기록이 없어요. 도전해보세요! 💪</div>
              )}
            </div>
          );
        })}

        {/* 홈으로 */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button onClick={onBack} style={btnStyle('#3a7d44')}>🏠 홈으로 돌아가기</button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '0 20px 60px',
  },
  header: {
    background: '#c5e0b4',
    padding: '16px',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '24px',
    borderRadius: '8px',
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    background: '#fff',
    border: '2px solid #3a7d44',
    borderRadius: '14px',
    padding: '24px',
    marginBottom: '28px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  avatar: {
    fontSize: '56px',
    lineHeight: 1,
  },
  userName: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#222',
    margin: 0,
    marginBottom: '6px',
  },
  userSub: {
    fontSize: '18px',
    color: '#888',
    margin: 0,
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#3a7d44',
    marginBottom: '14px',
  },
  recordCard: {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px 24px',
    marginBottom: '14px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  recordGame: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  recordInfo: {
    fontSize: '19px',
    color: '#444',
  },
  lastPlayed: {
    fontSize: '16px',
    color: '#999',
    marginTop: '6px',
  },
  noRecord: {
    fontSize: '18px',
    color: '#bbb',
  },
};

const btnStyle = (bg) => ({
  padding: '16px 36px',
  fontSize: '22px',
  fontWeight: 'bold',
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
});

export default MyPage;
