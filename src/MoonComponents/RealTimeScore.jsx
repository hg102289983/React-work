function RealTimeScore({ correctCount, totalTargets, onNext }) {
  const isAllFound = correctCount === totalTargets && totalTargets > 0;

  return (
    <div className="real-time-score">
      <p>
        진행: {correctCount} / {totalTargets}
      </p>

      {isAllFound && (
        <div className="score-done">
          <p>정답! 「거울」 {totalTargets}개를 모두 찾았습니다.</p>
          <button type="button" onClick={onNext}>
            다음 훈련 풀러가기
          </button>
        </div>
      )}
    </div>
  );
}

export default RealTimeScore;
