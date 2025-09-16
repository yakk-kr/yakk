import React, { useEffect } from 'react';
import { RefreshCcw, Check, ChevronLeft, Pen } from 'lucide-react';

// 프롬프트 정보 표시 카드 컴포넌트
const PromptCard = ({ topic, level, setCurrentScreen }) => (
  <div className="w-[300px] p-5 bg-white rounded-[20px] shadow-[0_4px_100px_rgba(77,161,0,0.25)] flex flex-col gap-3 rotate-[2deg]">
    <div className="text-[16px] text-black font-bold leading-[24px]">
      {topic}
    </div>
    <div className="flex justify-between items-center">
      <div className="px-[12px] py-[6px] bg-[#B4FF6F80] text-[#59B800] text-[14px] font-bold rounded-full">
        {level}
      </div>
      <button
        onClick={() => setCurrentScreen({ name: 'home' })}
        className="p-2 rounded-lg bg-transparent hover:bg-black/5"
      >
        <Pen size={16} strokeWidth={2.5} className="text-gray-400" />
      </button>
    </div>
  </div>
);

// 로딩 중 스켈레톤
const SkeletonDialogue = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    {[...Array(3)].map((_, idx) => (
      <div key={idx} className="flex items-start gap-2">
        <div className="w-9 h-9 bg-black/5 rounded-full" />
        <div className="flex-1 p-5 bg-white rounded-[16px] border border-black/5 flex flex-col gap-2">
          <div className="h-3 w-3/4 bg-black/10 rounded" />
          <div className="h-3 w-1/2 bg-black/10 rounded" />
          <div className="h-3 w-full bg-black/10 rounded" />
          <div className="h-3 w-1/2 bg-black/10 rounded" />
        </div>
      </div>
    ))}
  </div>
);

// 대화 렌더링
const DialogueContent = ({ script }) => (
  <div className="flex flex-col gap-4">
    {script.map((item, index) => (
      <div key={index} className="flex items-start gap-2">
        <div
          className={`w-9 h-9 ${
            index % 2 === 0 ? 'bg-[#B7FF74]' : 'bg-[#FFCAE8]'
          } rounded-full flex items-center justify-center text-[18px] text-black font-extrabold`}
        >
          {item.speaker}
        </div>
        <div className="flex-1 p-5 bg-white rounded-[16px] border border-black/5 flex flex-col gap-1">
          <div className="text-[16px] font-bold leading-[21px] text-black">
            {item.kr}
          </div>
          <div className="text-[12px] font-semibold leading-[18px] text-black/40">
            {item.jp}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// 헤더 컴포넌트
const MainHeader = ({ isLoading }) => (
  <div className="text-[18px]  text-black font-bold leading-[27px] mb-8">
    {isLoading ? (
      <>
        상황에 맞는 스크립트를
        <br />
        구성하는 중이에요…
      </>
    ) : (
      <>
        스크립트를 완성했어요!
        <br />
        이대로 학습할까요?
      </>
    )}
  </div>
);

// 메인 컴포넌트
const ScriptResultScreen = ({
  setCurrentScreen,
  setUploadedScript,
  aiScript,
  currentScreen,
}) => {
  const isLoading = !aiScript;
  const isAiScriptValidJson =
    aiScript && typeof aiScript === 'object' && Array.isArray(aiScript.script);

  const userPrompt = currentScreen.prompt;
  const selectedLevel = currentScreen.level;

  useEffect(() => {
    if (!isLoading && !isAiScriptValidJson) {
      alert('AI 응답이 올바르지 않아요. 처음부터 다시 시도해 주세요.');
      setCurrentScreen({ name: 'home' });
    }
  }, [isLoading, isAiScriptValidJson, setCurrentScreen]);

  const handleButtonClick = () => {
    if (isLoading || !isAiScriptValidJson) return;
    setUploadedScript(aiScript);
    setCurrentScreen('setup');
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8F8F8] flex flex-col">
      <div className="w-full max-w-[960px] mx-auto px-5 pt-5 pb-24">
        {/* 이전 버튼 */}
        <div className="flex justify-between items-start mb-8">
          <button
            className="p-2 rounded-full bg-black/5 hover:bg-black/10"
            onClick={() => setCurrentScreen({ name: 'home' })}
          >
            <ChevronLeft size={18} strokeWidth={3} className="text-gray-400" />
          </button>
        </div>

        {/* 헤더 */}
        <MainHeader isLoading={isLoading} />

        {/* 프롬프트 카드 */}
        <div className="flex justify-center mb-12">
          <PromptCard
            topic={userPrompt}
            level={selectedLevel || '보통'}
            setCurrentScreen={setCurrentScreen}
          />
        </div>

        {/* 본문 */}
        {isLoading ? (
          <SkeletonDialogue />
        ) : (
          <DialogueContent script={aiScript.script} />
        )}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-5 pb-5 bg-[#F8F8F8]">
        <div className="absolute top-[-20px] left-0 w-full h-5 bg-gradient-to-t from-[#F8F8F8] to-transparent pointer-events-none" />
        <div className="max-w-[960px] mx-auto w-full">
          <button
            onClick={handleButtonClick}
            disabled={isLoading || !isAiScriptValidJson}
            className={`w-full h-[52px] rounded-2xl font-bold text-[16px] flex items-center justify-center gap-3 transition ${
              isLoading || !isAiScriptValidJson
                ? 'bg-black/5 text-black/30 cursor-not-allowed'
                : 'bg-[#B7FF74] text-black hover:bg-[#92FF2B]'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCcw strokeWidth={2.5} size={16} /> 생성 중...
              </>
            ) : (
              <>
                <Check strokeWidth={3.2} size={16} /> 이대로 학습 시작하기
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScriptResultScreen;
