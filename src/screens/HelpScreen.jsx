import React, { useState } from 'react';
import { ChevronLeft, Copy, Check, Upload } from 'lucide-react';

function HelpScreen({ setCurrentScreen, promptTemplate }) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative min-h-screen bg-[#F8F8F8] overflow-hidden">
      {/* 상단 그라데이션 */}
      <div className="absolute top-0 left-0 w-full h-[405px] opacity-30 bg-gradient-to-b from-[#C1FF87] to-transparent pointer-events-none" />

      {/* 헤더 */}
      <div className="fixed top-0 z-10 w-full h-[52px] bg-white flex items-center px-2 border-b border-black/5">
        <div className="flex items-center">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 rounded-lg bg-transparent hover:bg-black/5 mr-2"
          >
            <ChevronLeft
              strokeWidth={2.5}
              size={20}
              className="text-gray-400"
            />
          </button>
          <h1 className="text-[16px] font-bold text-black">도움말</h1>
        </div>
      </div>

      {/* 본문 */}
      <div className="relative px-8 pt-24 pb-32 flex flex-col gap-16 max-w-[480px] mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#B7FF74] rounded-full flex items-center justify-center font-extrabold text-[16px] text-black">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-extrabold text-black leading-[30px]">
                JSON 파일이 뭔가요?
              </h2>
              <p className="mt-3 text-[14px] font-semibold text-black/70 leading-[23px]">
                JSON(JavaScript Object Notation)은 사람이 읽기 쉬운 텍스트
                기반의 데이터 교환 형식으로, 데이터를 저장하고 전송하는 데
                사용됩니다.
              </p>
            </div>
          </div>
          <div className="h-[175px] bg-black/5 rounded-2xl" />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#B7FF74] rounded-full flex items-center justify-center font-extrabold text-[16px] text-black">
              2
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-extrabold text-black leading-[30px]">
                어떻게 제가 원하는 내용의
                <br />
                스크립트를 만들죠?
              </h2>
              <p className="mt-3 text-[14px] font-semibold text-black/70 leading-[23px]">
                아래 작성된 예시 프롬프트를 ChatGPT, Gemini와 같은 AI에
                붙여넣기만 하면 만들 수 있어요!
              </p>
            </div>
          </div>
          <div className="h-[175px] bg-black/5 rounded-2xl" />
        </div>

        {/* 프롬프트 박스 */}
        <div className="bg-black/5 rounded-2xl border border-black/5 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
            <span className="text-[14px] font-semibold text-black/70">
              프롬프트
            </span>
            <button
              onClick={copyPrompt}
              className="p-2 rounded-lg bg-transparent hover:bg-black/5"
            >
              <Copy size={16} strokeWidth={2.5} className="text-gray-400" />
            </button>
          </div>
          <div className="bg-white p-4 h-[312px] overflow-y-auto">
            <pre className="text-xs text-black/50 font-mono font-semibold whitespace-pre-wrap">
              {promptTemplate}
            </pre>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="h-5 bg-gradient-to-t from-[#F8F8F8] to-transparent pointer-events-none" />
        <div className="bg-[#F8F8F8] px-8 pb-6 flex flex-col gap-3 max-w-[480px] mx-auto">
          <button
            onClick={copyPrompt}
            className="h-[52px] rounded-2xl bg-[#B7FF74] hover:bg-[#92FF2B] flex items-center justify-center gap-3 font-bold text-[16px] text-black"
          >
            <Upload size={16} className="text-black" />
            프롬프트 복사하기
          </button>
        </div>
      </div>

      {/* 토스트 */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 bg-black/80 text-white text-[14px] font-semibold pl-4 pr-5 py-3 rounded-2xl flex items-center gap-3 backdrop-blur-md transform transition-all duration-300 ${
          copied
            ? 'bottom-24 opacity-100 translate-y-0'
            : 'bottom-16 opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-[#7BFF00] flex items-center justify-center">
          <Check size={12} strokeWidth={3.5} className="text-black" />
        </div>
        복사가 완료되었어요!
      </div>
    </div>
  );
}

export default HelpScreen;
