const style = {
  wrap:  { maxWidth: '460px', margin: '100px auto', padding: '50px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' },
  title: { textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#3a7d44', marginBottom: '36px' },
  label: { display: 'block', fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' },
  input: { width: '100%', padding: '14px', fontSize: '22px', border: '2px solid #ccc', borderRadius: '8px', marginBottom: '22px' },
  btn:   { width: '100%', padding: '18px', fontSize: '24px', fontWeight: 'bold', border: 'none', borderRadius: '10px', marginBottom: '12px', cursor: 'pointer' },
};

function Login(props) {
  return (
    <form style={style.wrap} onSubmit={(e) => { e.preventDefault(); props.onLogin(); }}>
      <h1 style={style.title}>🧠 인지 강화 훈련</h1>
      <label style={style.label}>아이디</label>
      <input style={style.input} placeholder="아이디 입력" />
      <label style={style.label}>비밀번호</label>
      <input style={style.input} type="password" placeholder="비밀번호 입력" />
      <button style={{ ...style.btn, background: '#3a7d44', color: '#fff' }} type="submit">로그인</button>
      <button style={{ ...style.btn, background: '#eee', color: '#333' }} type="button">회원가입</button>
    </form>
  );
}

export default Login;
