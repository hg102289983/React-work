import React, { useState } from 'react';

// =====================================================================
// [자식 컴포넌트 1] HintBox: 힌트 화면만 담당 (PDF의 Pictogram 역할)
// =====================================================================
function HintBox() {
  return (
    <div style={{ border: '1px solid black', textAlign: 'center', marginBottom: '30px' }}>
      <div style={{ borderBottom: '1px solid black', padding: '15px', fontSize: '24px', fontWeight: 'bold' }}>
        &lt;보기&gt;
      </div>
      <div style={{ padding: '30px 20px' }}>
        <div style={{ fontSize: '26px', fontWeight: 'bold', margin: '10px 0' }}>
          힌트 1. 노인에게 유용한<br/>물건입니다.
        </div>
        <div style={{ fontSize: '30px', margin: '15px 0' }}>⬇</div>
        <div style={{ fontSize: '26px', fontWeight: 'bold', margin: '10px 0' }}>
          힌트 2. 숫자 7의 모양과<br/>비슷합니다.
        </div>
        <div style={{ fontSize: '30px', margin: '15px 0' }}>⬇</div>
        <div style={{ fontSize: '26px', fontWeight: 'bold', margin: '10px 0' }}>
          힌트 3. 걸음을 돕는<br/>도구입니다.
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// [자식 컴포넌트 2] OptionBox: 보기 선택 화면 담당 (PDF의 Classification 역할)
// 부모로부터 현재 선택된 값(selectedOption)과 변경 함수(onSelect)를 Props로 받음
// =====================================================================
function OptionBox({ selectedOption, onSelect }) {
  const options = ['청소기', '지팡이', '돋보기', '보청기'];
  const icons = ['①', '②', '③', '④'];

  return (
    <div style={{ border: '1px solid black', padding: '40px 30px' }}>
      <div style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '30px', display: 'flex' }}>
        <span style={{ marginRight: '10px' }}>☀</span> 
        <span>&lt;보기&gt;에서 설명하는<br/>것은 무엇일까요?</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginLeft: '40px' }}>
        {options.map((text, idx) => {
          const optionNumber = idx + 1;
          return (
            <div 
              key={optionNumber} 
              // 클릭 시 부모가 준 onSelect 함수를 실행하여 부모의 State를 변경
              onClick={() => onSelect(optionNumber)}
              style={{ 
                fontSize: '28px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                // 내가 선택한 번호면 파란색으로 표시 (정답 여부는 아직 모름)
                color: selectedOption === optionNumber ? '#005088' : 'black'
              }}
            >
              <span style={{ marginRight: '15px' }}>{icons[idx]}</span> {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================================
// [부모 컴포넌트] RiddleGame: 전체 뼈대 및 상태(State) 관리 (PDF의 PictogramProblem 역할)
// =====================================================================
function RiddleGame({ onNext }) {
  // 상태 1: 사용자가 고른 답 번호 (초기엔 아무것도 안 고름 = null)
  const [selectedOption, setSelectedOption] = useState(null); 
  
  // 상태 2: 제출(정답 확인) 버튼을 눌렀는지 여부 및 피드백 메시지
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 교수님 순서도 로직: "제출 버튼 클릭 -> answers에 값이 있는가? -> 정답과 일치하는가?"
  const handleSubmit = () => {
    // 값이 있는지 확인
    if (selectedOption === null) {
      alert("보기를 먼저 선택해주세요!");
      return;
    }

    // 정답(2번)과 일치하는가?
    setIsSubmitted(true);
    if (selectedOption === 2) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      
      <div style={{ backgroundColor: '#c5e0b4', padding: '15px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        수수께끼 문제
      </div>

      {/* 자식 1 호출 (힌트) */}
      <HintBox />

      {/* 자식 2 호출 (보기 선택) - 부모의 state와 변경 함수를 던져줌 */}
      <OptionBox 
        selectedOption={selectedOption} 
        onSelect={setSelectedOption} 
      />

      {/* 버튼 및 결과 피드백 영역 */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        
        {/* 아직 제출 안 했을 때는 '정답 확인' 버튼 보여주기 */}
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            style={{ padding: '15px 40px', fontSize: '22px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            정답 확인하기
          </button>
        ) : (
          /* 제출 후 피드백 화면 */
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: isCorrect ? 'green' : 'red', marginBottom: '20px' }}>
              {isCorrect ? "잘하셨습니다! 👍" : "다시 한번만 생각해보세요! 😊"}
            </div>
            
            {/* 오답이면 다시 풀기, 정답이면 다음으로 넘어가기 */}
            {!isCorrect ? (
              <button 
                onClick={() => setIsSubmitted(false)}
                style={{ padding: '15px 30px', fontSize: '20px', backgroundColor: '#888', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
              >
                다시 선택하기
              </button>
            ) : (
              <button 
                onClick={onNext}
                style={{ padding: '15px 30px', fontSize: '22px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                다음 문제 풀러가기 ➡️
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default RiddleGame;