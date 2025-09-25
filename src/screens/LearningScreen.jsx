// LearningScreen.js
import React, { useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import LearningHeader from '../components/LearningHeader';
import SpeakerAvatar from '../components/SpeakerAvatar';

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
  const speakers = [
    ...new Set(currentScript.script.map((item) => item.speaker)),
  ];

  const getQuestionText = () => {
    if (!currentSentence) return '';
    const lang = speakerLanguages?.[currentSentence.speaker] ?? 'kr';
    return currentSentence?.[lang] || '';
  };

  const getAnswerText = () => {
    if (!currentSentence) return '';
    const questionLang = speakerLanguages?.[currentSentence.speaker] ?? 'kr';
    const answerLang = questionLang === 'jp' ? 'kr' : 'jp';
    return currentSentence?.[answerLang] || '';
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

  useEffect(() => {
    if (isVoiceMode && currentSentence) {
      const text = getQuestionText();
      const language =
        speakerLanguages?.[currentSentence.speaker] === 'jp'
          ? 'ja-JP'
          : 'ko-KR';

      const timer = setTimeout(() => {
        playTTS(text, language);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isVoiceMode, currentSentence]);

  return (
    <div className="min-h-[100dvh] bg-[#F1F8EB] flex flex-col overflow-hidden">
      <LearningHeader
        currentScript={currentScript}
        currentIndex={currentIndex}
        setCurrentScreen={setCurrentScreen}
        setUploadedScript={setUploadedScript}
        isVoiceMode={isVoiceMode}
      />

      <div className="flex-1 flex flex-col items-center">
        <div className="flex-1 flex flex-col gap-4 px-4 py-4 w-full max-w-[960px]">
          {/* 통역할 문장 */}
          <div className="flex-1 bg-white rounded-xl border border-black/5 p-6 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <SpeakerAvatar
                  speaker={currentSentence?.speaker ?? '?'}
                  size="small"
                  allSpeakers={speakers}
                />
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
                          speakerLanguages?.[currentSentence?.speaker] === 'jp'
                            ? 'ja-JP'
                            : 'ko-KR'
                        )
                  }
                  className="flex items-center px-2 py-2 bg-[#B5FF6F]/30 text-[#59B800] rounded-lg hover:bg-[#B5FF6F]/60"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              )}
            </div>

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
                  <span className="text-gray-400">
                    모범 답안을 확인해보세요
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="bg-white border-t px-4 py-4 w-full flex justify-center">
        <footer className="flex items-center justify-between gap-3 w-full max-w-[960px]">
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
    </div>
  );
}

export default LearningScreen;
