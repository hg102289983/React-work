import React, { Component } from 'react';
import HintBox from './HintBox';
import OptionBox from './OptionBox';

class RiddleGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:  null,
      submitted: false,
      correct:   false,
    };
  }

  handleSubmit() {
    if (this.state.selected === null) { alert('보기를 먼저 선택해주세요!'); return; }
    this.setState({ submitted: true, correct: this.state.selected === 2 });
  }

  render() {
    const { selected, submitted, correct } = this.state;
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ background: '#c5e0b4', padding: '16px', textAlign: 'center', fontSize: '26px', fontWeight: 'bold', marginBottom: '24px' }}>
          수수께끼 문제
        </div>
        <HintBox />
        <OptionBox
          selected={selected}
          onSelect={(n) => this.setState({ selected: n, submitted: false })}
        />
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          {!submitted && (
            <button onClick={() => this.handleSubmit()} style={btnStyle('#333')}>정답 확인하기</button>
          )}
          {submitted && correct && (
            <div>
              <p style={{ fontSize: '28px', color: 'green', marginBottom: '20px' }}>잘하셨습니다! 👍</p>
              <button onClick={this.props.onNext} style={btnStyle('#3a7d44')}>다음 문제 풀러가기 ➡️</button>
            </div>
          )}
          {submitted && !correct && (
            <div>
              <p style={{ fontSize: '28px', color: 'red', marginBottom: '20px' }}>다시 한번만 생각해보세요! 😊</p>
              <button onClick={() => this.setState({ submitted: false, selected: null })} style={btnStyle('#888')}>다시 선택하기</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const btnStyle = (bg) => ({
  padding: '16px 36px', fontSize: '22px', fontWeight: 'bold',
  background: bg, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer',
});

export default RiddleGame;
