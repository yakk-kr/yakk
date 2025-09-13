import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  RefreshCcw,
  X,
} from 'lucide-react';

function LearningScreen({
  currentScript,
  currentSentence,
  progress,
  currentIndex,
  setCurrentIndex,
  showAnswer,
  setShowAnswer,
  isVoiceMode,
  showTextInVoice,
  speakerLanguages,
  playTTS,
  isPlaying,
  setCurrentScreen,
  setUploadedScript,
}) {
  const getQuestionText = () => {
    if (!currentSentence) return '';
    const questionLang = speakerLanguages[currentSentence.speaker];
    return currentSentence[questionLang];
  };

  const getAnswerText = () => {
    if (!currentSentence) return '';
    const answerLang =
      speakerLanguages[currentSentence.speaker] === 'jp' ? 'kr' : 'jp';
    return currentSentence[answerLang];
  };

  const nextSentence = () => {
    if (currentIndex < currentScript.script.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setCurrentScreen('complete');
    }
  };

  const prevSentence = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  // 화자 색상 팔레트
  const speakerColors = ['#B7FF74', '#FFCAE8', '#BFDEFF', '#FFC9A0'];

  return (
    <div className="min-h-screen bg-[#F1F8EB] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-40">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <h1 className="text-base font-bold text-gray-900 truncate">
                {currentScript.topic}
              </h1>
              <span className="px-2 py-1 bg-[#B7FF74]/50 text-[#59B800] text-xs font-bold rounded-md">
                {isVoiceMode ? '음성 모드' : '텍스트 모드'}
              </span>
              <button
                onClick={() => setCurrentScreen('setup')}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <RefreshCcw size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {currentIndex + 1}/{currentScript.script.length}
              </span>
              <button
                onClick={() => {
                  setCurrentScreen('home');
                  setUploadedScript(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full">
            <div
              className="bg-[#B7FF74] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 w-full px-4 pt-28 pb-28 flex flex-col gap-4">
        {/* 통역할 문장 */}
        <div className="bg-white rounded-xl border border-black/5 p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-black"
              style={{
                backgroundColor:
                  speakerColors[currentIndex % speakerColors.length],
              }}
            >
              {currentSentence.speaker}
            </div>
            <span className="text-gray-400 text-base font-semibold">
              통역할 문장
            </span>
          </div>
          <div className="text-2xl font-semibold text-gray-900 leading-snug">
            {!isVoiceMode || showTextInVoice
              ? getQuestionText()
              : '🔊 음성을 들어보세요'}
          </div>
          {isVoiceMode && (
            <button
              onClick={() =>
                playTTS(getQuestionText(), speakerLanguages[currentSentence.speaker])
              }
              disabled={isPlaying}
              className="mt-2 self-start flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
        </div>

        {/* 모범 답안 */}
        <div className="bg-white rounded-xl border border-black/5 p-6 flex flex-col gap-3 flex-1">
          <span className="text-gray-400 text-base font-semibold">
            모범 답안
          </span>
          <div className="text-2xl font-semibold text-gray-900 leading-snug">
            {showAnswer ? (
              getAnswerText()
            ) : (
              <span className="text-gray-400">모범 답안을 확인해보세요</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4 flex items-center justify-between gap-3">
        <button
          onClick={prevSentence}
          disabled={currentIndex === 0}
          className="flex items-center px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50"
        >
          <ArrowLeft size={18} className="mr-1" />
          이전
        </button>

        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex-1 h-12 bg-[#B7FF74] text-black font-bold rounded-2xl hover:bg-lime-300 transition-colors"
        >
          {showAnswer ? '답안 숨기기' : '모범 답안 확인'}
        </button>

        <button
          onClick={nextSentence}
          className="flex items-center px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          다음
          <ArrowRight size={18} className="ml-1" />
        </button>
      </footer>
    </div>
  );
}

export default LearningScreen;