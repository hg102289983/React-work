function PriceBoard({ item, price, paid }) {
  const rowStyle = { display: 'flex', justifyContent: 'space-between', padding: '16px 20px', fontSize: '24px', borderBottom: '1px solid #eee' };

  return (
    <div style={{ border: '2px solid #333', marginBottom: '24px' }}>
      <div style={{ background: '#f5f5f5', padding: '14px', textAlign: 'center', fontSize: '22px', fontWeight: 'bold', borderBottom: '2px solid #333' }}>
        &lt;문제&gt;
      </div>
      <div style={rowStyle}>
        <span>물건</span>
        <span style={{ fontWeight: 'bold' }}>{item}</span>
      </div>
      <div style={rowStyle}>
        <span>물건 가격</span>
        <span style={{ fontWeight: 'bold' }}>{price.toLocaleString()} 원</span>
      </div>
      <div style={{ ...rowStyle, borderBottom: 'none' }}>
        <span>낸 돈</span>
        <span style={{ fontWeight: 'bold' }}>{paid.toLocaleString()} 원</span>
      </div>
    </div>
  );
}

export default PriceBoard;
