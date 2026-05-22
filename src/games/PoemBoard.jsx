function PoemBoard({ problem, tokens, selectedKeys, onWordClick }) {
  const wordStyle = (isSelected) => ({
    display: 'inline-block', margin: '0 4px', padding: '2px 6px', fontSize: '22px',
    cursor: 'pointer', userSelect: 'none',
    border: `2px solid ${isSelected ? 'red' : 'transparent'}`,
    borderRadius: '50%',
  });

  return (
    <div style={{ border: '2px solid #ccc', padding: '20px', lineHeight: '2.6', marginBottom: '20px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '30px', marginBottom: '4px' }}>{problem.title}</h2>
      <p  style={{ textAlign: 'right',  fontSize: '22px', marginBottom: '16px' }}>시인: {problem.author}</p>
      {tokens.map((line) => (
        <div key={line.li} style={{ textAlign: 'center' }}>
          {line.words.length === 0 ? <br /> : line.words.map((w) => (
            <span key={w.key} style={wordStyle(selectedKeys.includes(w.key))} onClick={() => onWordClick(w.key)}>
              {w.word}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PoemBoard;
