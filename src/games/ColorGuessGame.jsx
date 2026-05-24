import React, { Component } from 'react';
import { problems } from '../data/colorProblems';
import ChoseongBoard from './ChoseongBoard';
import AnswerInput from './AnswerInput';
import ResultBoard from './ResultBoard';

class ColorGuessGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      input: '',
      submitted: false,
      correct: false,
      score: 0,
      finished: false,
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      this.inputRef.current && this.inputRef.current.focus();
    }
  }

  handleSubmit() {
    const { input, currentIndex, score } = this.state;
    const trimmed = input.trim();
    if (!trimmed) { alert('색상 이름을 입력해주세요!'); return; }

    const correct = trimmed === problems[currentIndex].answer;
    this.setState({
      submitted: true,
      correct,
      score: correct ? score + 1 : score,
    });
  }

  handleNext() {
    const { currentIndex, score, correct } = this.state;
    const nextIndex = currentIndex + 1;
    const finalScore = correct ? score : score;

    if (nextIndex >= problems.length) {
      if (this.props.onFinish) {
        this.props.onFinish(finalScore, problems.length);
      }
      this.setState({ finished: true });
    } else {
      this.setState({
        currentIndex: nextIndex,
        input: '',
        submitted: false,
        correct: false,
      });
    }
  }

  handleRetry() {
    this.setState({ input: '', submitted: false, correct: false });
    this.inputRef.current && this.inputRef.current.focus();
  }

  handleRestart() {
    this.setState({
      currentIndex: 0,
      input: '',
      submitted: false,
      correct: false,
      score: 0,
      finished: false,
    });
  }

  render() {
    const { currentIndex, input, submitted, correct, score, finished } = this.state;
    const problem = problems[currentIndex];
    const total = problems.length;

    if (finished) {
      return (
        <div style={styles.container}>
          <div style={styles.header}>초성 맞추기 - 색상</div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ fontSize: '32px', marginBottom: '16px' }}>🎉 모든 문제 완료!</p>
            <p style={{ fontSize: '28px', color: '#3a7d44', marginBottom: '40px' }}>
              {total}문제 중 <strong>{score}</strong>개 정답
            </p>
            <button onClick={() => this.handleRestart()} style={btnStyle('#3a7d44')}>
              다시 풀기 🔄
            </button>
            <button onClick={this.props.onNext} style={{ ...btnStyle('#888'), marginLeft: '16px' }}>
              홈으로 돌아가기 🏠
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.header}>초성 맞추기 - 색상</div>

        <div style={styles.progress}>
          문제 {currentIndex + 1} / {total} &nbsp;|&nbsp; 점수: {score}점
        </div>

        <div style={styles.instruction}>
          ☀ 한글 초성 힌트를 보고 색상을 적어보세요.
        </div>

        <ChoseongBoard choseong={problem.choseong} hint={problem.hint} />

        <AnswerInput
          inputRef={this.inputRef}
          value={input}
          onChange={(val) => this.setState({ input: val, submitted: false, correct: false })}
          onSubmit={() => this.handleSubmit()}
          disabled={submitted}
        />

        {submitted && (
          <ResultBoard
            correct={correct}
            choseong={problem.choseong}
            isLast={currentIndex + 1 >= total}
            onNext={() => this.handleNext()}
            onRetry={() => this.handleRetry()}
          />
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '0 20px',
  },
  header: {
    background: '#c5e0b4',
    padding: '16px',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderRadius: '8px',
  },
  progress: {
    textAlign: 'right',
    fontSize: '20px',
    color: '#555',
    marginBottom: '16px',
  },
  instruction: {
    background: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px 20px',
    fontSize: '22px',
    marginBottom: '24px',
    color: '#333',
  },
};

const btnStyle = (bg) => ({
  padding: '16px 32px',
  fontSize: '22px',
  fontWeight: 'bold',
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  marginTop: '8px',
});

export default ColorGuessGame;
