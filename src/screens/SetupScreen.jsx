import React from 'react';
import { RefreshCcw, Check, ChevronDown, ChevronLeft } from 'lucide-react';
import { FooterButton } from '../components/FooterButton';
import SpeakerAvatar from '../components/SpeakerAvatar';

function SetupScreen({
  currentScript,
  setCurrentScreen,
  isVoiceMode,
  setIsVoiceMode,
  showTextInVoice,
  setShowTextInVoice,
  speakerLanguages,
  setSpeakerLanguages,
  setCurrentIndex,
  setShowAnswer,
}) {
  const speakers = [
    ...new Set(currentScript.script.map((item) => item.speaker)),
  ];

  const startLearning = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCurrentScreen('learning');
  };

  const toggleAllLanguages = () => {
    const newLanguages = {};
    speakers.forEach((speaker) => {
      newLanguages[speaker] = speakerLanguages[speaker] === 'jp' ? 'kr' : 'jp';
    });
    setSpeakerLanguages(newLanguages);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] relative">
      {/* 상단 그라디언트 */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#C1FF87]/15 to-transparent pointer-events-none" />

      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md border-b border-black/5 z-50">
        <div className="pl-2 pr-2 py-3 flex items-center">
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
          <h1 className="text-lg font-bold text-gray-900 truncate">
            {currentScript.topic}
          </h1>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="pt-24 pb-40 px-4 relative z-10">
        <div className="w-full max-w-[960px] mx-auto space-y-12">
          {/* 모드 선택 */}
          <div>
            <h3 className="text-[18px] font-bold mb-4 text-gray-800">
              어떤 모드에서 학습할까요?
            </h3>
            <div className="flex flex-row gap-4">
              {/* 텍스트 모드 */}
              <button
                onClick={() => setIsVoiceMode(false)}
                className={`flex-1 flex flex-col items-start px-5 py-4 rounded-[16px] border-[1.5px] transition ${
                  !isVoiceMode
                    ? 'border-[#59B800] bg-[#B5FF6F]/20'
                    : 'border-black/5 text-gray-700 hover:border-black/10 hover:bg-black/5'
                }`}
              >
                <div
                  className={`text-[18px] font-extrabold mb-1 ${
                    !isVoiceMode ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  📝 텍스트 모드
                </div>
                <div className="text-sm font-semibold text-gray-500">
                  텍스트만으로 빠르게 학습해요.
                </div>
              </button>

              {/* 음성 모드 */}
              <button
                onClick={() => setIsVoiceMode(true)}
                className={`flex-1 flex flex-col items-start px-5 py-4 rounded-[16px] border-[1.5px] transition ${
                  isVoiceMode
                    ? 'border-[#59B800] bg-[#B5FF6F]/20'
                    : 'border-black/5 text-gray-700 hover:border-black/10 hover:bg-black/5'
                }`}
              >
                <div
                  className={`text-[18px] font-extrabold mb-1 ${
                    isVoiceMode ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  🎧 음성 모드
                </div>
                <div className="text-sm font-semibold text-gray-500">
                  TTS를 통해 실제 대화처럼 통역 연습이 가능해요.
                </div>
              </button>
            </div>

            {/* 텍스트 표시 토글 */}
            {isVoiceMode && (
              <div className="mt-4 flex justify-end">
                <label className="flex items-center cursor-pointer">
                  <span
                    className={`text-sm font-bold ${
                      showTextInVoice ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  >
                    텍스트도 함께 표시
                  </span>
                  <input
                    type="checkbox"
                    checked={showTextInVoice}
                    onChange={(e) => setShowTextInVoice(e.target.checked)}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ml-2 transition-colors ${
                      showTextInVoice ? 'bg-[#B7FF74]' : 'bg-gray-300'
                    }`}
                  >
                    <Check
                      size={12}
                      strokeWidth={4}
                      className={showTextInVoice ? 'text-black' : 'text-white'}
                    />
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* 화자 언어 설정 */}
          <div>
            <h3 className="text-[18px] font-bold mb-4 text-gray-800">
              화자별 언어를 설정해주세요.
            </h3>
            <div className="space-y-4">
              {speakers.map((speaker) => (
                <div
                  key={speaker}
                  className="flex items-center justify-between px-4 py-3 bg-white border border-black/5 rounded-[20px]"
                >
                  <div className="flex items-center">
                    <SpeakerAvatar
                      speaker={speaker}
                      size="normal"
                      allSpeakers={speakers}
                    />
                    <span className="font-bold text-gray-800 ml-4">
                      화자 {speaker}
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      value={speakerLanguages[speaker] || 'kr'}
                      onChange={(e) =>
                        setSpeakerLanguages({
                          ...speakerLanguages,
                          [speaker]: e.target.value,
                        })
                      }
                      className="appearance-none bg-white font-semibold text-gray-600 rounded-[12px] px-4 py-2 pr-8 focus:outline-none hover:bg-black/5"
                    >
                      <option value="jp">🇯🇵 일본어</option>
                      <option value="kr">🇰🇷 한국어</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <button
                  onClick={toggleAllLanguages}
                  className="flex items-center px-4 py-2 font-semibold text-[#59B800] hover:bg-black/5 rounded-xl"
                >
                  <RefreshCcw size={14} strokeWidth={2.5} className="mr-2" />
                  언어 교체
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <FooterButton
        singleButtonProps={{
          onClick: startLearning,
          text: '학습 시작하기',
          icon: 'Send',
          bgColor: 'bg-[#B7FF74]',
          textColor: 'text-black',
        }}
      />
    </div>
  );
}

export default SetupScreen;
