// src/App.jsx
import React, { useState } from 'react';
import { Upload, HelpCircle, Play, Pause, Volume2, ArrowLeft, ArrowRight, RefreshCcw, Home, ChevronDown, Copy, Check, X } from 'lucide-react';
import { dummyScripts, promptTemplate } from './data.js';

// 화자별 색상을 반환하는 함수
const getSpeakerColor = (speaker) => {
  const speakerColors = [
    'bg-orange-400 bg-opacity-80',   // A
    'bg-green-400 bg-opacity-80',    // B
    'bg-blue-400 bg-opacity-80',     // C
    'bg-purple-400 bg-opacity-80',   // D
    'bg-pink-400 bg-opacity-80'      // E
  ];
  
  // 간단한 해시 함수를 사용하여 화자에 색상 할당
  const charCode = speaker.charCodeAt(0);
  const colorIndex = (charCode - 65) % speakerColors.length;
  
  return speakerColors[colorIndex];
};

function InterpreterApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [uploadedScript, setUploadedScript] = useState(null);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [showHelp, setShowHelp] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Setup screen states
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [showTextInVoice, setShowTextInVoice] = useState(true);
  const [speakerLanguages, setSpeakerLanguages] = useState({ A: 'jp', B: 'kr' });
  
  // Learning screen states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredScripts = selectedTab === '전체' ? dummyScripts : 
    dummyScripts.filter(script => script.level === selectedTab);

  const currentScript = uploadedScript || dummyScripts[0];
  const currentSentence = currentScript?.script[currentIndex];
  const progress = currentScript ? ((currentIndex + 1) / currentScript.script.length) * 100 : 0;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const script = JSON.parse(e.target.result);
          if (validateScript(script)) {
            setUploadedScript(script);
            setCurrentScreen('setup');
          } else {
            alert('올바르지 않은 JSON 형식입니다. 도움말을 확인해주세요.');
          }
        } catch (error) {
          alert('JSON 파일을 읽을 수 없습니다.');
        }
      };
      reader.readAsText(file);
    }
  };

  const validateScript = (script) => {
    return script.topic && 
           Array.isArray(script.script) && 
           script.script.length > 0 &&
           script.script.every(item => 
             item.speaker && item.jp && item.kr
           );
  };

  const handleScriptSelect = (script) => {
    setUploadedScript(script);
    setCurrentScreen('setup');
  };

  const startLearning = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCurrentScreen('learning');
    
    // 음성 모드일 때 첫 문장 자동 재생
    if (isVoiceMode) {
      setTimeout(() => {
        const firstSentence = currentScript.script[0];
        const questionLang = speakerLanguages[firstSentence.speaker];
        const questionText = firstSentence[questionLang];
        playTTS(questionText, questionLang);
      }, 300);
    }
  };

  const nextSentence = () => {
    if (currentIndex < currentScript.script.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      
      // 음성 모드일 때 자동 재생
      if (isVoiceMode) {
        setTimeout(() => {
          const nextSentenceData = currentScript.script[currentIndex + 1];
          const questionLang = speakerLanguages[nextSentenceData.speaker];
          const questionText = nextSentenceData[questionLang];
          playTTS(questionText, questionLang);
        }, 100);
      }
    } else {
      setCurrentScreen('complete');
    }
  };

  const prevSentence = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      
      // 음성 모드일 때 자동 재생
      if (isVoiceMode) {
        setTimeout(() => {
          const prevSentenceData = currentScript.script[currentIndex - 1];
          const questionLang = speakerLanguages[prevSentenceData.speaker];
          const questionText = prevSentenceData[questionLang];
          playTTS(questionText, questionLang);
        }, 100);
      }
    }
  };

  const toggleSpeakerLanguage = () => {
    const newSpeakerLanguages = { ...speakerLanguages };
    for (const speaker in newSpeakerLanguages) {
      newSpeakerLanguages[speaker] = newSpeakerLanguages[speaker] === 'jp' ? 'kr' : 'jp';
    }
    setSpeakerLanguages(newSpeakerLanguages);
  };

  const playTTS = (text, lang) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'jp' ? 'ja-JP' : 'ko-KR';
      utterance.rate = 0.8;
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getQuestionText = () => {
    if (!currentSentence) return '';
    const questionLang = speakerLanguages[currentSentence.speaker];
    return currentSentence[questionLang];
  };

  const getAnswerText = () => {
    if (!currentSentence) return '';
    const answerLang = speakerLanguages[currentSentence.speaker] === 'jp' ? 'kr' : 'jp';
    return currentSentence[answerLang];
  };
  
  // Home Screen
  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="w-full px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">일본어 통역 연습</h1>
            <button 
              onClick={() => setShowHelp(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <HelpCircle size={24} className="text-gray-600" />
            </button>
          </div>
        </header>

        <div className="w-full px-4 py-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">JSON 스크립트 업로드</h2>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors block cursor-pointer"
            >
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">JSON 파일을 드래그하거나 클릭하여 업로드하세요</p>
              <span className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer inline-block">
                파일 선택
              </span>
            </label>
          </div>

          {/* Example Scripts */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold mb-4">예시 학습 자료</h2>
              <div className="flex flex-wrap gap-2">
                {['전체', '초급', '중급', '고급'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      selectedTab === tab 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
              {filteredScripts.map(script => (
                <div 
                  key={script.id}
                  onClick={() => handleScriptSelect(script)}
                  className="border rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                >
                  <h3 className="font-medium text-gray-800 mb-2">{script.topic}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    script.level === '초급' ? 'bg-green-100 text-green-700' :
                    script.level === '중급' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {script.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">도움말</h3>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium mb-2">프로그램 사용법</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    1. JSON 형식의 스크립트 파일을 업로드하거나 예시 자료를 선택하세요.<br/>
                    2. 학습 모드와 화자별 언어를 설정하세요.<br/>
                    3. 통역 연습을 시작하세요.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">AI로 스크립트 생성하기</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    아래 프롬프트를 복사하여 ChatGPT, Claude 등에 붙여넣고 원하는 상황을 입력하세요.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 relative">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">{promptTemplate}</pre>
                    <button
                      onClick={copyPrompt}
                      className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      title="복사하기"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Setup Screen
  if (currentScreen === 'setup') {
    const speakers = [...new Set(currentScript.script.map(item => item.speaker))];
    
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-40">
          <div className="w-full px-4 py-4 flex items-center">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">학습 설정</h1>
          </div>
        </header>

        <div className="w-full px-4 pt-24 pb-8 h-screen">
          <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden relative">
            {/* 스크롤 가능한 설정 컨텐츠 */}
            <div className="h-full overflow-y-auto p-6 pb-32">
              <h2 className="text-lg font-semibold mb-6">{currentScript.topic}</h2>
              
              {/* Mode Selection */}
              <div className="mb-8">
                <h3 className="text-base font-medium mb-4">학습 모드 선택</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsVoiceMode(false)}
                    className={`flex items-center px-6 py-3 rounded-lg border-2 ${
                      !isVoiceMode ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">텍스트 모드</span>
                  </button>
                  <button
                    onClick={() => setIsVoiceMode(true)}
                    className={`flex items-center px-6 py-3 rounded-lg border-2 ${
                      isVoiceMode ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Volume2 size={20} className="mr-2" />
                    <span className="font-medium">음성 모드</span>
                  </button>
                </div>

                {isVoiceMode && (
                  <div className="mt-4">
                    <label className="flex items-center cursor-pointer">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors ${
                        showTextInVoice 
                          ? 'bg-blue-500' 
                          : 'bg-gray-300'
                      }`}>
                        <Check size={14} className="text-white" />
                      </div>
                      <span className={`text-sm transition-colors ${
                        showTextInVoice ? 'text-black' : 'text-gray-500'
                      }`}>
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

              {/* Speaker Language Assignment */}
              <div className="mb-8">
                <h3 className="text-base font-medium mb-4">화자별 언어 설정</h3>
                <div className="space-y-4">
                  {speakers.map((speaker) => (
                    <div key={speaker} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-4 ${
                            getSpeakerColor(speaker)
                          }`}
                        >
                          {speaker}
                        </div>
                        <span className="font-medium">화자 {speaker}</span>
                      </div>
                      <div className="relative">
                        <select
                          value={speakerLanguages[speaker]}
                          onChange={(e) => setSpeakerLanguages({
                            ...speakerLanguages,
                            [speaker]: e.target.value
                          })}
                          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="jp">일본어</option>
                          <option value="kr">한국어</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center">
                      <button
                        onClick={toggleSpeakerLanguage}
                        className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <RefreshCcw size={16} className="mr-2" />
                        언어 교체
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* 완전히 독립적인 고정 버튼 */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-50">
            <button
              onClick={startLearning}
              className="w-full bg-blue-500 text-white py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors text-lg"
            >
              학습 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Learning Screen
  if (currentScreen === 'learning') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <header className="bg-white shadow-sm border-b">
          <div className="w-full px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-gray-800">{currentScript.topic}</h1>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {isVoiceMode ? '음성모드' : '텍스트모드'}
                  </span>
                  <button 
                    onClick={() => setCurrentScreen('setup')}
                    className="p-1 hover:bg-gray-100 rounded-full"
                    title="설정 편집"
                  >
                    <RefreshCcw size={14} className="text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {currentIndex + 1} / {currentScript.script.length}
                </span>
                <button 
                  onClick={() => {
                    setCurrentScreen('home');
                    setUploadedScript(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="w-full px-4 py-6 h-[calc(100vh-140px)]">
          <div className="h-full flex flex-col">
            {/* Question Section - 정확히 50% */}
            <div className="h-1/2 bg-white rounded-lg shadow-sm p-6 mb-2 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-gray-600">통역할 문장</h2>
                {isVoiceMode && (
                  <button
                    onClick={() => playTTS(getQuestionText(), speakerLanguages[currentSentence.speaker])}
                    disabled={isPlaying}
                    className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                )}
              </div>
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-4 ${
                  getSpeakerColor(currentSentence.speaker)
                }`}>
                  {currentSentence.speaker}
                </div>
                <div className="text-2xl font-bold flex-1 flex items-start">
                  {(!isVoiceMode || showTextInVoice) ? getQuestionText() : '🔊 음성을 들어보세요'}
                </div>
              </div>
            </div>

            {/* Answer Section - 정확히 50% */}
            <div className="h-1/2 bg-white rounded-lg shadow-sm p-6 flex flex-col">
              <h2 className="text-base font-medium text-gray-600 mb-4">모범 답안</h2>
              <div className="text-2xl font-bold flex-1 flex items-start">
                {showAnswer ? (
                  <span className="text-black">{getAnswerText()}</span>
                ) : (
                  <span className="text-gray-500">모범 답안을 확인해보세요</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="w-full px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevSentence}
                disabled={currentIndex === 0}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} className="mr-1" />
                이전
              </button>

              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
              >
                {showAnswer ? '답안 숨기기' : '모범 답안 확인'}
              </button>

              <button
                onClick={nextSentence}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                다음
                <ArrowRight size={20} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete Screen
  if (currentScreen === 'complete') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">학습 완료!</h2>
          <p className="text-gray-600 mb-6">{currentScript.topic} 연습을 완료했습니다.</p>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setShowAnswer(false);
                setCurrentScreen('learning');
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              다시 학습하기
            </button>
            <button
              onClick={() => {
                setCurrentScreen('home');
                setUploadedScript(null);
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Home size={20} className="mr-2" />
              홈으로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default InterpreterApp;