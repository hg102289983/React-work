function AnswerBox(props) {
  return (
    <form
      style={{ border: '2px solid #333', padding: '30px', textAlign: 'center' }}
      onSubmit={(e) => { e.preventDefault(); props.onSubmit(); }}
    >
      <p style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '24px' }}>
        거스름돈은 얼마일까요?
      </p>
      <input
        type="number"
        value={props.answer}
        onChange={(e) => props.setAnswer(e.target.value)}
        placeholder="금액을 입력하세요"
        style={{ width: '80%', padding: '14px', fontSize: '24px', border: '2px solid #ccc', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}
      />
      <p style={{ fontSize: '20px', color: '#666', marginBottom: '24px' }}>원</p>
      <button
        type="submit"
        style={{ padding: '16px 40px', fontSize: '22px', fontWeight: 'bold', background: '#333', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
      >
        정답 확인하기
      </button>
    </form>
  );
}

export default AnswerBox;
