import React, { Component } from 'react';
import PriceBoard from './PriceBoard';
import AnswerBox from './AnswerBox';

const PROBLEM = { item: '사과 주스', price: 1200, paid: 5000 };

class CalcGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      submitted: false,
      correct: false,
    };
  }

  handleSubmit() {
    if (this.state.answer === '') { alert('거스름돈을 입력해주세요!'); return; }
    const correct = parseInt(this.state.answer) === PROBLEM.paid - PROBLEM.price;
    this.setState({ submitted: true, correct });
  }

  render() {
    const { answer, submitted, correct } = this.state;
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ background: '#c5e0b4', padding: '16px', textAlign: 'center', fontSize: '26px', fontWeight: 'bold', marginBottom: '24px' }}>
          마트 거스름돈 계산
        </div>
        <PriceBoard item={PROBLEM.item} price={PROBLEM.price} paid={PROBLEM.paid} />
        <AnswerBox
          answer={answer}
          setAnswer={(v) => this.setState({ answer: v, submitted: false })}
          onSubmit={() => this.handleSubmit()}
        />
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          {submitted && correct && (
            <div>
              <p style={{ fontSize: '28px', color: 'green', marginBottom: '20px' }}>정답입니다! 👍</p>
              <button onClick={this.props.onNext} style={btnStyle('#3a7d44')}>다음 문제 풀러가기 ➡️</button>
            </div>
          )}
          {submitted && !correct && (
            <div>
              <p style={{ fontSize: '28px', color: 'red', marginBottom: '20px' }}>다시 한번만 생각해보세요! 😊</p>
              <button onClick={() => this.setState({ submitted: false, answer: '' })} style={btnStyle('#888')}>다시 풀기</button>
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

export default CalcGame;
