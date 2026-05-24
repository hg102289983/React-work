function ResultBoard({ correct, choseong, isLast, onNext, onRetry }) {
  if (correct) {
    return (
      <div style={styles.wrap}>
        <p style={styles.correct}>정답입니다! 👍</p>
        <button onClick={onNext} style={btnStyle('#3a7d44')}>
          {isLast ? '결과 보기 🎉' : '다음 문제 ➡️'}
        </button>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <p style={styles.wrong}>아쉽네요! 다시 생각해보세요 😊</p>
      <p style={styles.hint}>힌트: {choseong.join(' ')}</p>
      <button onClick={onRetry} style={btnStyle('#888')}>
        다시 입력하기
      </button>
      <button onClick={onNext} style={{ ...btnStyle('#aaa'), marginLeft: '12px' }}>
        건너뛰기 ⏭
      </button>
    </div>
  );
}

const styles = {
  wrap: {
    textAlign: 'center',
    marginTop: '24px',
  },
  correct: {
    fontSize: '30px',
    color: 'green',
    marginBottom: '20px',
  },
  wrong: {
    fontSize: '28px',
    color: 'red',
    marginBottom: '8px',
  },
  hint: {
    fontSize: '22px',
    color: '#666',
    marginBottom: '20px',
  },
};

const btnStyle = (bg) => ({
  padding: '16px 32px',
  fontSize: '22px',
  fontWeight: 'bold',
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  marginTop: '8px',
});

export default ResultBoard;
