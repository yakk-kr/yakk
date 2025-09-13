import React from 'react';
import { Check, ChevronRight, Upload, Home } from 'lucide-react';
import { dummyScripts } from '../data.js'; // 메인에서 쓰던 예시 데이터 가져오기

function CompleteScreen({
  currentScript,
  setCurrentScreen,
  setCurrentIndex,
  setShowAnswer,
  setUploadedScript,
}) {
  // 추천 학습 데이터: 현재 학습한 스크립트를 제외한 나머지
  const recommendedScripts = dummyScripts.filter(
    (script) => script.id !== currentScript.id
  );

  return (
    <div className="relative min-h-screen bg-[#F8F8F8] overflow-hidden">
      {/* 상단 그라데이션 */}
      <div className="absolute top-0 left-0 w-full h-80 opacity-30 bg-gradient-to-b from-[#C1FF87] to-transparent pointer-events-none" />

      {/* 본문 */}
      <div className="relative flex flex-col items-center px-8 pt-20 pb-32 gap-12">
        {/* 체크 아이콘 */}
        <div className="w-16 h-16 bg-[#7BFF00] rounded-full flex items-center justify-center">
          <Check size={32} className="text-black" />
        </div>

        {/* 완료 메시지 */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[20px] font-bold text-black">학습 완료!</h2>
          <p className="text-[14px] font-semibold text-black/50 leading-[23px]">
            {currentScript.topic} 학습을 <br /> 완료했습니다.
          </p>
        </div>

        {/* 추천 학습 */}
        <div className="w-full flex flex-col gap-6">
          <h3 className="text-[18px] font-bold text-black">🔥 이런 주제는 어때요?</h3>
          <div className="flex flex-col gap-4">
            {recommendedScripts.map((script) => (
              <div
                key={script.id}
                onClick={() => {
                  setUploadedScript(script);
                  setCurrentIndex(0);
                  setShowAnswer(false);
                  setCurrentScreen('setup');
                }}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-black/5 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <span className="text-[16px] font-bold text-black">
                    {script.topic}
                  </span>
                  <span className="text-[14px] font-semibold text-[#59B800]">
                    {script.script.length}문장 ·{' '}
                    {new Set(script.script.map((s) => s.speaker)).size}인 대화
                  </span>
                </div>
                <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-black/5">
                  <ChevronRight size={16} className="text-black/40" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="absolute bottom-0 left-0 w-full bg-[#F8F8F8] px-8 pb-6 flex flex-col gap-3">
        <button
          onClick={() => {
            setCurrentIndex(0);
            setShowAnswer(false);
            setCurrentScreen('learning');
          }}
          className="h-[52px] rounded-2xl bg-[#B7FF74] flex items-center justify-center gap-3 font-bold text-[16px] text-black"
        >
          <Upload size={16} className="text-black" />
          다시 학습하기
        </button>

        <button
          onClick={() => {
            setCurrentScreen('home');
            setUploadedScript(null);
          }}
          className="h-[52px] rounded-2xl bg-black/5 flex items-center justify-center gap-3 font-bold text-[16px] text-black/40"
        >
          <Home size={16} className="text-black/40" />
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default CompleteScreen;