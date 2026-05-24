const OPTIONS = ['청소기', '지팡이', '돋보기', '보청기'];
const ICONS   = ['①', '②', '③', '④'];

function OptionBox({ selected, onSelect }) {
  return (
    <div style={{ border: '2px solid #333', padding: '30px' }}>
      <p style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '28px' }}>
        ☀ &lt;보기&gt;에서 설명하는 것은 무엇일까요?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginLeft: '30px' }}>
        {OPTIONS.map((text, i) => (
          <div key={i} onClick={() => onSelect(i + 1)}
            style={{ fontSize: '28px', fontWeight: 'bold', cursor: 'pointer', color: selected === i + 1 ? '#005088' : '#222' }}>
            <span style={{ marginRight: '14px' }}>{ICONS[i]}</span>{text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionBox;
