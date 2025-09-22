import React, { useEffect, useState } from 'react';
import { RefreshCcw, Check, Home, Upload, Send } from 'lucide-react';

// 아이콘 매핑
const iconMap = {
  RefreshCcw: RefreshCcw,
  Check: Check,
  Home: Home,
  Upload: Upload,
  Send: Send,
};

// 버튼 하나를 렌더링하는 컴포넌트
const SingleButton = ({
  onClick,
  disabled,
  isLoading,
  loadingText,
  text,
  icon,
  bgColor,
  textColor,
}) => {
  const Icon = iconMap[icon];
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let frameId;
    let completeTimer;
    let timers = [];

    if (isLoading) {
      // 초기화
      setProgress(0);
      setIsDone(false);
      const start = Date.now();
      setStartTime(start);

      timers = [
        setTimeout(() => setProgress(50), 2000),
        setTimeout(() => setProgress(70), 5000),
        setTimeout(() => setProgress(90), 7000),
      ];
    } else if (startTime) {
      // 로딩 끝났을 때
      const elapsed = Date.now() - startTime;
      let delay = 0;
      if (elapsed < 1000) delay = 500;
      else if (elapsed < 2000) delay = 400;
      else delay = 300;

      // 자연스러운 70~100 애니메이션 유도
      frameId = requestAnimationFrame(() => {
        setProgress(100);
      });

      completeTimer = setTimeout(() => {
        setIsDone(true);
      }, delay);
    }

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frameId);
      clearTimeout(completeTimer);
    };
  }, [isLoading]);

  return (
    <div className="relative w-full">
      <button
        onClick={onClick}
        disabled={disabled || !isDone}
        className={`w-full h-[52px] rounded-2xl font-bold text-[16px] flex items-center justify-center gap-3 transition overflow-hidden relative z-10 ${
          disabled || !isDone
            ? 'bg-black/5 text-gray-400 cursor-not-allowed'
            : `${bgColor} ${textColor} hover:bg-[#92FF2B]`
        }`}
      >
        {isLoading && !isDone ? (
          <>
            <RefreshCcw strokeWidth={2.5} size={16} className="animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {Icon && <Icon strokeWidth={2.5} size={16} />}
            {text}
          </>
        )}
      </button>

      {/* 프로그레스 바 */}
      {(isLoading || !isDone) && (
        <div
          className="absolute left-0 top-0 h-full bg-[#B7FF74] transition-all duration-700 z-0 rounded-2xl"
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};

// 버튼 두 개를 렌더링하는 컴포넌트
const DoubleButton = ({ onClick1, text1, icon1, onClick2, text2, icon2 }) => {
  const Icon1 = iconMap[icon1];
  const Icon2 = iconMap[icon2];

  return (
    <div className="max-w-[960px] mx-auto w-full flex flex-col gap-3">
      <button
        onClick={onClick1}
        className="h-[52px] rounded-2xl bg-[#B7FF74] hover:bg-[#92FF2B] flex items-center justify-center gap-3 font-bold text-[16px] text-black"
      >
        {Icon1 && <Icon1 strokeWidth={2.5} size={16} />}
        {text1}
      </button>

      <button
        onClick={onClick2}
        className="h-[52px] rounded-2xl bg-black/5 hover:bg-gray-200 flex items-center justify-center gap-3 font-bold text-[16px] text-gray-400"
      >
        {Icon2 && <Icon2 strokeWidth={2.5} size={16} />}
        {text2}
      </button>
    </div>
  );
};

// 하단 푸터 버튼 컴포넌트 (메인)
export function FooterButton({ singleButtonProps, doubleButtonProps }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 px-5 pb-5 bg-[#F8F8F8]">
      <div className="absolute top-[-20px] left-0 w-full h-5 bg-gradient-to-t from-[#F8F8F8] to-transparent pointer-events-none" />
      <div className="max-w-[960px] mx-auto w-full">
        {singleButtonProps && <SingleButton {...singleButtonProps} />}
        {doubleButtonProps && <DoubleButton {...doubleButtonProps} />}
      </div>
    </div>
  );
}
