import React, { Component } from 'react';
import { problems } from '../data/problems';
import PoemBoard from './PoemBoard';
import ScoreBoard from './ScoreBoard';

class CircleWordGame extends Component {
  constructor(props) {
    super(props);
    this.problem = problems[0];
    this.tokens  = this.problem.text.map((line, li) =>
      line === '' ? { li, words: [] }
                 : { li, words: line.split(' ').map((word, wi) => ({
                     key: `${li}-${wi}`, word, isTarget: word.includes(this.problem.targetWord),
                   })) }
    );
    this.totalTargets = this.tokens.flatMap((l) => l.words).filter((w) => w.isTarget).length;
    this.state = { selectedKeys: [] };
  }

  handleWordClick(key) {
    const keys = this.state.selectedKeys;
    this.setState({
      selectedKeys: keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key],
    });
  }

  render() {
    const { selectedKeys } = this.state;
    const correctCount = this.tokens.flatMap((l) => l.words)
      .filter((w) => w.isTarget && selectedKeys.includes(w.key)).length;
    return (
      <div style={{ maxWidth: '720px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ background: '#c5e0b4', padding: '16px', textAlign: 'center', fontSize: '26px', fontWeight: 'bold', marginBottom: '24px' }}>
          「{this.problem.targetWord}」 단어에 모두 동그라미 치세요
        </div>
        <PoemBoard
          problem={this.problem}
          tokens={this.tokens}
          selectedKeys={selectedKeys}
          onWordClick={(key) => this.handleWordClick(key)}
        />
        <ScoreBoard
          correctCount={correctCount}
          totalTargets={this.totalTargets}
          onNext={this.props.onNext}
        />
      </div>
    );
  }
}

export default CircleWordGame;
