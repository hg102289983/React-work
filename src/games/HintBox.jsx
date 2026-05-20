function HintBox() {
  const hints = [
    '힌트 1. 노인에게 유용한 물건입니다.',
    '힌트 2. 숫자 7의 모양과 비슷합니다.',
    '힌트 3. 걸음을 돕는 도구입니다.',
  ];

  return (
    <div style={{ border: '2px solid #333', marginBottom: '24px' }}>
      <div style={{ borderBottom: '2px solid #333', padding: '14px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        &lt;보기&gt;
      </div>
      <div style={{ padding: '24px', textAlign: 'center' }}>
        {hints.map((hint, i) => (
          <div key={i}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{hint}</p>
            {i < hints.length - 1 && <p style={{ fontSize: '28px' }}>⬇</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HintBox;
