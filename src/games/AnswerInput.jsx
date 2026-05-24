function AnswerInput({ inputRef, value, onChange, onSubmit, disabled }) {
  return (
    <div style={styles.wrap}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && onSubmit()}
        placeholder="색상 이름을 입력하세요"
        disabled={disabled}
        style={styles.input}
      />
      {!disabled && (
        <button onClick={onSubmit} style={styles.btn}>
          정답 확인하기
        </button>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    textAlign: 'center',
    marginTop: '30px',
  },
  input: {
    width: '80%',
    padding: '16px',
    fontSize: '24px',
    border: '2px solid #3a7d44',
    borderRadius: '10px',
    textAlign: 'center',
    outline: 'none',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
  btn: {
    display: 'block',
    margin: '0 auto',
    padding: '16px 32px',
    fontSize: '22px',
    fontWeight: 'bold',
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

export default AnswerInput;
