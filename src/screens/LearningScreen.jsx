import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import LearningHeader from '../components/LearningHeader';

function LearningScreen({
  currentScript,
  currentSentence,
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

  // Add this useEffect hook for automatic playback
  useEffect(() => {
    if (isVoiceMode && currentSentence) {
      const text = getQuestionText();
      const language = speakerLanguages[currentSentence.speaker];

      // Delay playback slightly to ensure the component and data are ready
      const timer = setTimeout(() => {
        playTTS(text, language);
      }, 500);

      // Clean up the timer to prevent memory leaks or unexpected behavior
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isVoiceMode, currentSentence]);

  return (
    <div className="min-h-[100dvh] bg-[#F1F8EB] flex flex-col overflow-hidden">
      {/* Header */}
      <LearningHeader
        currentScript={currentScript}
        currentIndex={currentIndex}
        setCurrentScreen={setCurrentScreen}
        setUploadedScript={setUploadedScript}
        isVoiceMode={isVoiceMode}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col gap-4 px-4 py-4">
        {/* 통역할 문장 */}
        <div className="flex-1 bg-white rounded-xl border border-black/5 p-6 flex flex-col gap-3">
          {/* 헤더: 프로필 + 라벨 + 음성 버튼 */}
          <div className="flex justify-between items-center">
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

            {isVoiceMode && (
              <button
                onClick={() =>
                  isPlaying
                    ? playTTS(null, null)
                    : playTTS(
                        getQuestionText(),
                        speakerLanguages[currentSentence.speaker]
                      )
                }
                className="flex items-center px-2 py-2 bg-[#B5FF6F]/30 text-[#59B800] rounded-lg hover:bg-[#B5FF6F]/60"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            )}
          </div>

          {/* 텍스트 */}
          <div className="flex-1 flex items-start">
            <p className="text-2xl font-semibold text-gray-900 leading-snug">
              {!isVoiceMode || showTextInVoice
                ? getQuestionText()
                : '🔊 음성을 들어보세요'}
            </p>
          </div>
        </div>

        {/* 모범 답안 */}
        <div className="flex-1 bg-white rounded-xl border border-black/5 p-6 flex flex-col gap-3">
          <span className="text-gray-400 text-base font-semibold">
            모범 답안
          </span>
          <div className="flex-1 flex items-start">
            <p className="text-2xl font-semibold text-gray-900 leading-snug">
              {showAnswer ? (
                getAnswerText()
              ) : (
                <span className="text-gray-400">모범 답안을 확인해보세요</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t px-4 py-4 flex items-center justify-between gap-3">
        <button
          onClick={prevSentence}
          disabled={currentIndex === 0}
          className="flex items-center px-3 py-2 text-gray-400 bg-transparent hover:bg-gray-100 rounded-xl disabled:opacity-50"
        >
          <ChevronLeft strokeWidth={2.5} size={18} className="mr-1" />
          이전
        </button>

        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex-1 h-12 bg-[#B7FF74] text-black font-bold rounded-2xl hover:bg-[#92FF2B] transition-colors"
        >
          {showAnswer ? '답안 숨기기' : '모범 답안 확인'}
        </button>

        <button
          onClick={nextSentence}
          className="flex items-center px-3 py-2 text-gray-400 bg-transparent hover:bg-gray-100 rounded-xl"
        >
          다음
          <ChevronRight strokeWidth={2.5} size={18} className="ml-1" />
        </button>
      </footer>
    </div>
  );
}

export default LearningScreen;
