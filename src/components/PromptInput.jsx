// src/components/PromptInput.jsx

import React, { useState } from 'react';
import { WandSparkles, ChevronRight, ArrowUp } from 'lucide-react';

const fetchChatResponse = async (input) => {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '당신은 동시통역 전문가입니다.' },
        { role: 'user', content: input },
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '응답 없음';
};

function PromptInput({ setCurrentScreen }) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // 'isRotated' 대신 'isExpanded'로 이름 변경

  const handleFetch = async () => {
    const res = await fetchChatResponse(inputText);
    setOutputText(res);
  };

  return (
    <div className="w-full bg-white/30 shadow-[0_4px_100px_rgba(77,161,0,0.25)] rounded-[20px] outline outline-2 outline-[#EFEFEF]">
      {/* 상단 타이틀 - 클릭하면 토글 */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-5 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <WandSparkles size={16} className="text-gray-400" />
          <div className="text-sm font-semibold text-black/70">
            연습해보고 싶은 상황이 있나요?
          </div>
        </div>
        {/* 아이콘에 애니메이션 적용 */}
        <div className="p-0">
          {' '}
          <ChevronRight
            size={22}
            className={`text-gray-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      {/* 접히고 펼쳐지는 영역 */}
      <div
        className={`transition-max-h duration-500 ease-in-out overflow-hidden`}
        style={{ maxHeight: isExpanded ? '400px' : '0' }}
      >
        <div className="flex flex-col gap-4 px-5 pb-5">
          {/* 프롬프트 입력 필드 */}
          <textarea
            placeholder="예: 전시회에서 기능성 의류를 판매하는 부스에서 해외 바이어에게 상품을 소개하는 상황"
            className="w-full h-[200px] text-black placeholder:text-black/40 text-sm font-semibold resize-none outline-none bg-transparent"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          {/* 난이도 선택 + 제출 버튼 */}
          <div className="w-full flex justify-between items-center">
            {/* 난이도 */}
            <div className="flex gap-3">
              {['쉬움', '보통', '어려움'].map((level) => (
                <div
                  key={level}
                  className="px-4 py-[7px] bg-black/[0.05] rounded-full text-black/40 text-sm font-semibold"
                >
                  {level}
                </div>
              ))}
            </div>

            {/* 제출 버튼 (입력 내용이 있을 때만 표시) */}
            {inputText && (
              <button
                onClick={handleFetch}
                className="p-2 bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.07)] flex items-center justify-center outline outline-1 outline-black/[0.05]"
              >
                <ArrowUp
                  size={16}
                  strokeWidth={2.5}
                  className="text-gray-400"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 결과 텍스트 */}
      {outputText && (
        <p className="text-black font-medium text-sm mt-2 px-5 pb-5">
          {outputText}
        </p>
      )}
    </div>
  );
}

export default PromptInput;
