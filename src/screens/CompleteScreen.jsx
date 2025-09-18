import React, { useEffect } from 'react';
import { Check, ChevronRight, X } from 'lucide-react';
import { learningSamples } from '../data.js';
import confetti from 'canvas-confetti';
import { FooterButton } from '../components/FooterButton.jsx';

function CompleteScreen({
  currentScript,
  setCurrentScreen,
  setCurrentIndex,
  setShowAnswer,
  setUploadedScript,
}) {
  const recommendedScripts = learningSamples.filter(
    (script) => script.id !== currentScript.id
  );

  // Confetti Effect
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      zIndex: 9999,
      startVelocity: 40,
      decay: 0.92,
      ticks: 100,
      colors: ['#ffffff', '#37FF37', '#FBFF88'],
    });
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-[#F8F8F8] flex flex-col overflow-hidden">
      {/* 상단 그라디언트 */}
      <div className="absolute top-0 left-0 w-full h-80 opacity-30 bg-gradient-to-b from-[#C1FF87] to-transparent pointer-events-none" />

      {/* 닫기 버튼 */}
      <div className="absolute top-5 right-4 z-20">
        <button
          onClick={() => {
            setCurrentScreen({ name: 'home' });
            setUploadedScript(null);
          }}
          className="p-2 rounded-full bg-black/5 hover:bg-black/10 mr-2"
        >
          <X size={18} strokeWidth={3} className="text-gray-400" />
        </button>
      </div>

      {/* 본문 - 최대 너비 960px 컨테이너 */}
      <div className="flex-1 overflow-y-auto px-5 pt-20 pb-40 flex flex-col items-center gap-12 max-w-[960px] mx-auto w-full">
        {/* 체크 아이콘 */}
        <div className="w-16 h-16 bg-[#7BFF00] rounded-full flex items-center justify-center">
          <Check size={32} strokeWidth={4} className="text-black" />
        </div>

        {/* 완료 메시지 */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[24px] font-extrabold text-black">
            학습 완료! 💚
          </h2>
          <p className="text-[16px] font-semibold text-black/50 leading-[27px]">
            {currentScript.topic} 학습을 <br /> 완료했어요.
          </p>
        </div>

        {/* 추천 학습 */}
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-[18px] font-bold text-black">
            🔥 이런 주제는 어때요?
          </h3>
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
                <button
                  onClick={() => setCurrentScreen('help')}
                  className="p-2 rounded-lg bg-transparent hover:bg-black/5"
                >
                  <ChevronRight
                    size={22}
                    strokeWidth={2.5}
                    className="text-gray-400"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <FooterButton
        doubleButtonProps={{
          onClick1: () => {
            setCurrentIndex(0);
            setShowAnswer(false);
            setCurrentScreen('learning');
          },
          text1: '다시 학습하기',
          icon1: 'RefreshCcw',
          onClick2: () => {
            setCurrentScreen({ name: 'home' });
            setUploadedScript(null);
          },
          text2: '메인으로 돌아가기',
          icon2: 'Home',
        }}
      />
    </div>
  );
}

export default CompleteScreen;
