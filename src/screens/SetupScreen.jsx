import React from 'react';
import { ArrowLeft, Volume2, RefreshCcw, Check, ChevronDown } from 'lucide-react';

function SetupScreen({
  currentScript,
  setCurrentScreen,
  isVoiceMode,
  setIsVoiceMode,
  showTextInVoice,
  setShowTextInVoice,
  speakerLanguages,
  setSpeakerLanguages,
  toggleSpeakerLanguage,
  setCurrentIndex,
  setShowAnswer,
}) {
  const speakers = [...new Set(currentScript.script.map((item) => item.speaker))];

  // 화자별 고정 색상
  const speakerColors = ['#B7FF74', '#FFCAE8', '#BFDEFF', '#FFC9A0'];

  const startLearning = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCurrentScreen('learning');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 shadow-sm border-b dark:border-zinc-700 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => setCurrentScreen('home')}
            className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">학습 설정</h1>
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto px-4 pt-24 pb-32 h-screen">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm h-full overflow-hidden relative">
          <div className="h-full overflow-y-auto p-6 pb-32">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-100">
              {currentScript.topic}
            </h2>

            {/* 학습 모드 선택 */}
            <div className="mb-8">
              <h3 className="text-base font-medium mb-4 text-gray-800 dark:text-gray-100">
                어떤 모드에서 학습할까요?
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsVoiceMode(false)}
                  className={`flex-1 h-40 p-5 rounded-2xl border transition-colors text-left ${
                    !isVoiceMode
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="text-lg font-bold mb-2">📝 텍스트 모드</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    텍스트를 보면서 차근차근 학습할 수 있어요.
                  </p>
                </button>
                <button
                  onClick={() => setIsVoiceMode(true)}
                  className={`flex-1 h-40 p-5 rounded-2xl border transition-colors text-left ${
                    isVoiceMode
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <Volume2 size={20} className="mr-2" />
                    <span className="text-lg font-bold">🎧 음성 모드</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    TTS를 통해 실제 대화처럼 통역 연습이 가능해요.
                  </p>
                </button>
              </div>

              {isVoiceMode && (
                <div className="mt-4">
                  <label className="flex items-center cursor-pointer">
                    <div
                      className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3 transition-colors ${
                        showTextInVoice ? 'bg-blue-500' : 'bg-gray-300 dark:bg-zinc-600'
                      }`}
                    >
                      <Check size={14} className="text-white" />
                    </div>
                    <span
                      className={`text-sm transition-colors ${
                        showTextInVoice
                          ? 'text-gray-800 dark:text-gray-100'
                          : 'text-gray-500 dark:text-gray-400'
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
                  </label>
                </div>
              )}
            </div>

            {/* 화자별 언어 설정 */}
            <div className="mb-8">
              <h3 className="text-base font-medium mb-4 text-gray-800 dark:text-gray-100">
                화자별 언어를 설정해주세요.
              </h3>
              <div className="space-y-4">
                {speakers.map((speaker, index) => (
                  <div
                    key={speaker}
                    className="flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-black mr-4"
                        style={{ backgroundColor: speakerColors[index % speakerColors.length] }}
                      >
                        {speaker}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        화자 {speaker}
                      </span>
                    </div>
                    <div className="relative">
                      <select
                        value={speakerLanguages[speaker] || 'jp'}
                        onChange={(e) =>
                          setSpeakerLanguages({
                            ...speakerLanguages,
                            [speaker]: e.target.value,
                          })
                        }
                        className="appearance-none bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="jp">🇯🇵 일본어</option>
                        <option value="kr">🇰🇷 한국어</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <button
                    onClick={toggleSpeakerLanguage}
                    className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-lg"
                  >
                    <RefreshCcw size={16} className="mr-2" />
                    언어 교체
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 학습 시작 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 via-gray-50/80 dark:from-zinc-800 dark:via-zinc-800/80 pt-4 pb-6 px-4">
          <button
            onClick={startLearning}
            className="w-full bg-[#B7FF74] text-black py-4 rounded-2xl font-bold hover:bg-lime-300 transition-colors text-lg"
          >
            학습 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetupScreen;