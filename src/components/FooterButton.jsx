import React from 'react';
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

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[52px] rounded-2xl font-bold text-[16px] flex items-center justify-center gap-3 transition ${
        disabled
          ? 'bg-black/5 text-gray-400 cursor-not-allowed'
          : `${bgColor} ${textColor} hover:bg-[#92FF2B]`
      }`}
    >
      {isLoading ? (
        <>
          <RefreshCcw strokeWidth={2.5} size={16} /> {loadingText}
        </>
      ) : (
        <>
          {Icon && <Icon strokeWidth={2.5} size={16} />} {text}
        </>
      )}
    </button>
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
