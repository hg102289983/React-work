function ChoseongBoard({ choseong, hint }) {
  return (
    <div>
      <div style={styles.choseongBox}>
        {choseong.map((ch, i) => (
          <span key={i} style={styles.choseongChar}>{ch}</span>
        ))}
      </div>
      <div style={styles.hintBox}>
        💡 힌트: {hint}
      </div>
    </div>
  );
}

const styles = {
  choseongBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    background: '#fff',
    border: '2px solid #ccc',
    borderRadius: '12px',
    padding: '36px 20px',
  },
  choseongChar: {
    fontSize: '64px',
    fontWeight: 'bold',
    color: '#222',
    lineHeight: 1,
  },
  hintBox: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '22px',
    color: '#555',
    background: '#fffbe6',
    border: '1px dashed #f0a500',
    borderRadius: '8px',
    padding: '12px',
  },
};

export default ChoseongBoard;
