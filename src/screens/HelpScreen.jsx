import React, { useState } from 'react';
import { ChevronLeft, Copy, Check, Bot } from 'lucide-react';

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
            onClick={() => setCurrentScreen({ name: 'home' })}
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
      <div className="relative px-8 pt-24 pb-32 flex flex-col gap-16 max-w-[640px] mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#B7FF74] rounded-lg flex items-center justify-center font-extrabold text-[16px] text-black">
              Q
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-extrabold text-black leading-[30px]">
                JSON이 뭔가요?
              </h2>
              <p className="mt-3 text-[14px] font-semibold text-black/70 leading-[23px]">
                정보를 깔끔하게 정리해서 담는 파일 형식이에요.
                <br />
                엑셀은 표로 정리하듯 JSON은 앱에서 대화 스크립트를 정리해 두는
                방식이에요.
              </p>
            </div>
          </div>
          {/* <div className="h-[175px] bg-black/5 rounded-2xl" /> */}
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#B7FF74] rounded-lg flex items-center justify-center font-extrabold text-[16px] text-black">
              Q
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-extrabold text-black leading-[30px]">
                왜 JSON을 쓰나요?
              </h2>
              <p className="mt-3 text-[14px] font-semibold text-black/70 leading-[23px]">
                단순 텍스트보다 구조가 정해져 있어서 누가 말했는지, 어떤
                언어인지를 나눠 담을 수 있어요.
                <br />
                앱과 웹에서 쉽게 읽고 쓸 수 있는 표준이라 데이터를 주고받는 데
                가장 많이 쓰입니다.
              </p>
            </div>
          </div>
          {/* <div className="h-[175px] bg-black/5 rounded-2xl" /> */}
        </div>

        {/* Step 3 */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#B7FF74] rounded-lg flex items-center justify-center font-extrabold text-[16px] text-black">
              Q
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-extrabold text-black leading-[30px]">
                yakk에서는 JSON을 어떻게 활용하나요?
              </h2>
              <p className="mt-3 text-[14px] font-semibold text-black/70 leading-[23px]">
                JSON은 단순하면서도 구조가 정해져 있어서 대화 스크립트를
                주제·상황·난이도별로 깔끔하게 정리할 수 있어요.
                <br />
                그래서 사용자가 직접 AI를 통해 원하는 조건(여행, 면접, 일상 대화
                등)에 맞춰 스크립트를 만들어 불러올 수 있습니다.
              </p>
            </div>
          </div>
          {/* <div className="h-[175px] bg-black/5 rounded-2xl" /> */}
        </div>

        {/* 프롬프트 박스 */}
        <div className="bg-gradient-to-b from-[#EFEFEF] via-[#E8E8E8] to-[#EFEFEF] rounded-2xl border border-black/5 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              {/* lucide-react Bot 아이콘 (배경 제거됨) */}
              <Bot size={18} className="text-gray-400" strokeWidth={2} />
              <span className="text-[14px] font-semibold text-black/70">
                Prompt
              </span>
            </div>
            <button
              onClick={copyPrompt}
              className="p-2 rounded-lg bg-transparent hover:bg-black/5"
            >
              <Copy size={16} strokeWidth={2.5} className="text-gray-400" />
            </button>
          </div>
          <div className="bg-transparent p-4 h-[240px] overflow-y-auto">
            <pre className="text-xs text-black/50 font-mono font-semibold whitespace-pre-wrap">
              {promptTemplate}
            </pre>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="h-5 bg-gradient-to-t from-[#F8F8F8] to-transparent pointer-events-none" />
        <div className="bg-[#F8F8F8] px-8 pb-6 flex flex-col gap-3 max-w-[640px] mx-auto">
          <button
            onClick={copyPrompt}
            className="h-[52px] rounded-2xl bg-[#B7FF74] hover:bg-[#92FF2B] flex items-center justify-center gap-3 font-bold text-[16px] text-black"
          >
            <Copy size={16} strokeWidth={2.5} className="text-black" />
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
