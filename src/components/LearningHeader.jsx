import React from 'react';
import { Pencil, X, Headphones, Type } from 'lucide-react';

function LearningHeader({
  currentScript,
  currentIndex,
  setCurrentScreen,
  setUploadedScript,
  isVoiceMode,
}) {
  return (
    <div className="px-5 py-4 flex flex-col gap-3 bg-white shadow-sm border-b">
      {/* 상단: 모드 뱃지 + 액션 버튼 */}
      <div className="flex justify-between items-center">
        {/* 모드 뱃지 (클릭 시 setup으로 이동) */}
        <button
          onClick={() => setCurrentScreen('setup')}
          className="px-1.5 py-1 bg-[#B7FF74]/50 rounded-md flex items-center gap-1.5 cursor-pointer"
        >
          {isVoiceMode ? (
            <Headphones size={16} className="text-[#59B800]" />
          ) : (
            <Type size={16} className="text-[#59B800]" />
          )}
          <span className="text-[#59B800] text-xs font-bold">
            {isVoiceMode ? '음성 모드' : '텍스트 모드'}
          </span>
        </button>

        {/* 우측 액션 */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setCurrentScreen('setup');
            }}
            className="p-2 rounded-lg bg-transparent hover:bg-black/5"
          >
            <Pencil size={20} className="text-gray-400" />
          </button>
          <button
            onClick={() => {
              setCurrentScreen({ name: 'home' });
              setUploadedScript(null);
            }}
            className="p-2 rounded-lg bg-transparent hover:bg-black/5"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* 제목 + 진행도 */}
      <div className="flex justify-between items-end">
        <h1 className="text-base font-bold text-gray-900">
          {currentScript.topic}
        </h1>
        <span className="text-sm text-gray-500">
          {currentIndex + 1}/{currentScript.script.length}
        </span>
      </div>

      {/* 진행바 */}
      <div className="w-full bg-black/5 h-1.5 rounded-full">
        <div
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: `${
              ((currentIndex + 1) / currentScript.script.length) * 100
            }%`,
            background: 'linear-gradient(to right, #B7FF74, #92FF2B)',
          }}
        />
      </div>
    </div>
  );
}

export default LearningHeader;
