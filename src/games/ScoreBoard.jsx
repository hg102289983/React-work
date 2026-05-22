function ScoreBoard({ correctCount, totalTargets, onNext }) {
  const isComplete = totalTargets > 0 && correctCount === totalTargets;
  return (
    <div style={{ border: '2px solid #ccc', padding: '24px', textAlign: 'center' }}>
      <p style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '16px' }}>
        찾은 개수 : {correctCount} / {totalTargets}
      </p>
      {isComplete && (
        <div>
          <p style={{ fontSize: '26px', color: 'green', marginBottom: '16px' }}>모두 찾으셨습니다! 👏</p>
          <button onClick={onNext}
            style={{ padding: '16px 36px', fontSize: '22px', fontWeight: 'bold', background: '#3a7d44', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            다음 훈련 풀러가기 ➡️
          </button>
        </div>
      )}
    </div>
  );
}

export default ScoreBoard;
