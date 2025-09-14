import React, { useState } from 'react';
import { learningSamples, promptTemplate } from './data.js';

import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import LearningScreen from './screens/LearningScreen';
import CompleteScreen from './screens/CompleteScreen';
import HelpScreen from './screens/HelpScreen';
import FeedbackPage from './screens/FeedbackPage';

// 화자별 색상 반환 함수
export const getSpeakerColor = (speaker) => {
  const speakerColors = [
    'bg-orange-400 bg-opacity-80',
    'bg-green-400 bg-opacity-80',
    'bg-blue-400 bg-opacity-80',
    'bg-purple-400 bg-opacity-80',
    'bg-pink-400 bg-opacity-80',
  ];
  const charCode = speaker.charCodeAt(0);
  const colorIndex = (charCode - 65) % speakerColors.length;
  return speakerColors[colorIndex];
};

function InterpreterApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [uploadedScript, setUploadedScript] = useState(null);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [copied, setCopied] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [showTextInVoice, setShowTextInVoice] = useState(true);
  const [speakerLanguages, setSpeakerLanguages] = useState({
    A: 'jp',
    B: 'kr',
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredScripts =
    selectedTab === '전체'
      ? learningSamples
      : learningSamples.filter((script) => script.level === selectedTab);

  const currentScript = uploadedScript || learningSamples[0];
  const currentSentence = currentScript?.script[currentIndex];
  const progress = currentScript
    ? ((currentIndex + 1) / currentScript.script.length) * 100
    : 0;

  const validateScript = (script) =>
    script.topic &&
    Array.isArray(script.script) &&
    script.script.length > 0 &&
    script.script.every((item) => item.speaker && item.jp && item.kr);

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
            alert('올바르지 않은 JSON 형식입니다.');
          }
        } catch {
          alert('JSON 파일을 읽을 수 없습니다.');
        }
      };
      reader.readAsText(file);
    }
  };

  const playTTS = async (text, language) => {
    if (!text) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);

    try {
      const response = await fetch(
        'https://us-central1-yakk-kr.cloudfunctions.net/getTTS',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify({ text, language }), // 기존 코드
          body: JSON.stringify({ text, lang: language }), // 수정된 코드
        }
      );

      if (!response.ok) throw new Error('TTS 요청 실패');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsPlaying(false);
      };
      audio.onerror = () => {
        setIsPlaying(false);
      };

      audio.play();
    } catch (err) {
      console.error('TTS 오류:', err);
      setIsPlaying(false);
    }
  };

  const toggleSpeakerLanguage = () => {
    const newSpeakerLanguages = { ...speakerLanguages };
    for (const speaker in newSpeakerLanguages) {
      newSpeakerLanguages[speaker] =
        newSpeakerLanguages[speaker] === 'jp' ? 'kr' : 'jp';
    }
    setSpeakerLanguages(newSpeakerLanguages);
  };

  // 화면 전환 렌더링
  if (currentScreen === 'home') {
    return (
      <HomeScreen
        setCurrentScreen={setCurrentScreen}
        handleFileUpload={handleFileUpload}
        filteredScripts={filteredScripts}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        setUploadedScript={setUploadedScript}
        promptTemplate={promptTemplate}
        copied={copied}
        setCopied={setCopied}
      />
    );
  }

  if (currentScreen === 'setup') {
    return (
      <SetupScreen
        currentScript={currentScript}
        setCurrentScreen={setCurrentScreen}
        isVoiceMode={isVoiceMode}
        setIsVoiceMode={setIsVoiceMode}
        showTextInVoice={showTextInVoice}
        setShowTextInVoice={setShowTextInVoice}
        speakerLanguages={speakerLanguages}
        setSpeakerLanguages={setSpeakerLanguages}
        toggleSpeakerLanguage={toggleSpeakerLanguage}
        setCurrentIndex={setCurrentIndex}
        setShowAnswer={setShowAnswer}
      />
    );
  }

  if (currentScreen === 'learning') {
    return (
      <LearningScreen
        currentScript={currentScript}
        currentSentence={currentSentence}
        progress={progress}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
        isVoiceMode={isVoiceMode}
        showTextInVoice={showTextInVoice}
        speakerLanguages={speakerLanguages}
        playTTS={playTTS}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentScreen={setCurrentScreen}
        setUploadedScript={setUploadedScript}
      />
    );
  }

  if (currentScreen === 'complete') {
    return (
      <CompleteScreen
        currentScript={currentScript}
        setCurrentScreen={setCurrentScreen}
        setCurrentIndex={setCurrentIndex}
        setShowAnswer={setShowAnswer}
        setUploadedScript={setUploadedScript}
      />
    );
  }

  if (currentScreen === 'help') {
    return (
      <HelpScreen
        setCurrentScreen={setCurrentScreen}
        promptTemplate={promptTemplate}
      />
    );
  }

  if (currentScreen === 'feedback') {
    return <FeedbackPage setCurrentScreen={setCurrentScreen} />;
  }

  return null;
}

export default InterpreterApp;
