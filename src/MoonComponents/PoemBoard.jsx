function PoemBoard({ problem, tokens, selectedKeys, onWordClick }) {
  return (
    <div className="poem">
      <h3 className="poem-title">{problem.title}</h3>
      <p className="poem-author">시인: {problem.author}</p>

      {tokens.map((line) => (
        <div key={line.lineIdx} className="poem-line">
          {line.words.length === 0 ? (
            <br />
          ) : (
            line.words.map((w) => {
              const isSelected = selectedKeys.indexOf(w.key) !== -1;
              return (
                <span
                  key={w.key}
                  className={isSelected ? 'word selected' : 'word'}
                  onClick={() => onWordClick(w.key)}
                >
                  {w.word}
                </span>
              );
            })
          )}
        </div>
      ))}
    </div>
  );
}

export default PoemBoard;
