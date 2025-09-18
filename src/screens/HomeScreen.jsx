import React, { useMemo, useState } from 'react';
import { HelpCircle, Upload, MessageCircleMore, X } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../assets/logo.svg';
import { learningSamples } from '../data.js';
import PromptInput from '../components/PromptInput.jsx';

function HomeScreen({
  setCurrentScreen,
  handleFileUpload,
  setUploadedScript,
  selectedTab,
  setSelectedTab,
  onScriptGenerated,
}) {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const categoryTabs = useMemo(() => {
    const categories = Array.from(
      new Set(learningSamples.map((item) => item.category))
    );
    return ['전체', ...categories];
  }, []);

  const filteredScripts = useMemo(() => {
    if (selectedTab === '전체') return learningSamples;
    return learningSamples.filter((script) => script.category === selectedTab);
  }, [selectedTab]);

  const colorMap = {
    1: { bg: 'bg-[#DBFFBB]/30', text: 'text-[#20A000]' },
    2: { bg: 'bg-[#FFCBF2]/40', text: 'text-[#D63384]' },
    3: { bg: 'bg-[#B2D3FF]/40', text: 'text-[#1679F8]' },
    4: { bg: 'bg-[#FFE199]/40', text: 'text-[#FF9800]' },
  };

  const getColorByCategory = (category) => {
    const idx = categoryTabs.indexOf(category);
    const key = ((idx - 1) % 4) + 1;
    return colorMap[key] || colorMap[1];
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md z-40">
        <div className="pl-5 pr-2 py-3 flex justify-between items-center">
          <img src={Logo} alt="yakk logo" className="w-[48px] h-auto" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-5 pt-24 pb-16 space-y-16 max-w-[960px] mx-auto w-full">
        <div className="flex flex-col items-center gap-2">
          <PromptInput
            setCurrentScreen={setCurrentScreen}
            onScriptGenerated={onScriptGenerated}
          />
          <div className="flex justify-center">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-2 rounded-[12px] flex items-center gap-2 cursor-pointer transition
                         bg-transparent hover:bg-black/[0.05]"
            >
              <Upload size={16} className="text-gray-400" />
              <span className="text-sm font-semibold text-black/40">
                직접 파일 업로드하기
              </span>
            </button>
          </div>
        </div>

        {/* 업로드 모달 */}
        {showUploadModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center top-[-64px]">
            {/* 검정 오버레이 */}
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setShowUploadModal(false)}
            />

            {/* 모달 박스 */}
            <div className="relative bg-white rounded-3xl p-5 pb-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg z-[1001] flex flex-col items-center">
              <button
                className="absolute top-4 right-4 p-2 rounded-lg bg-transparent hover:bg-black/5"
                onClick={() => setShowUploadModal(false)}
              >
                <X size={20} strokeWidth={2.5} className="text-gray-400" />
              </button>

              {/* 텍스트 영역 */}
              <div className="text-center flex flex-col items-center mt-5 gap-3 mb-8">
                <p className="text-[#59B800] text-[14px] font-bold leading-[21px]">
                  파일 업로드
                </p>
                <p className="text-black text-[18px] font-bold leading-[27px]">
                  직접 만든 JSON 파일을
                  <br />
                  불러올 수 있어요
                </p>
                <p className="text-black/50 text-sm font-semibold leading-[21px]">
                  JSON 파일을 업로드하고
                  <br />
                  학습을 시작해보세요!
                </p>
              </div>

              {/* 업로드 박스 */}
              <div className="bg-gradient-to-b from-black/[0.03] via-black/[0.05] to-black/[0.04] p-6 rounded-[16px] flex flex-col items-center gap-5 w-full mb-2">
                <MessageCircleMore size={40} className="text-gray-300" />
                <p className="text-center text-gray-500 font-semibold text-sm leading-relaxed">
                  JSON 파일을 업로드하고 <br /> 학습을 시작해보세요!
                </p>
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur-md
              flex items-center gap-2 cursor-pointer hover:bg-black/[0.06] transition"
                >
                  <Upload size={16} className="text-black/50" />
                  <span className="text-sm font-bold text-black/50">
                    업로드하기
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    handleFileUpload(e);
                    setShowUploadModal(false);
                  }}
                  className="hidden"
                />
              </div>
              {/* JSON 안내 버튼 - 아래쪽 가운데 정렬 */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setCurrentScreen('help');
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-[12px] cursor-pointer transition
                     bg-transparent hover:bg-black/[0.05]"
                >
                  <HelpCircle size={16} className="text-gray-400" />
                  <span className="text-sm font-semibold text-black/40">
                    JSON이 뭔가요?
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 예시 자료 */}
        <section className="space-y-4">
          <h2 className="text-[18px] font-bold text-black">
            💬 이런 상황은 어때요?
          </h2>

          <div className="relative">
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-3 pr-0">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-3 py-1.5 whitespace-nowrap rounded-full text-[14px] font-semibold transition
                      ${
                        selectedTab === tab
                          ? 'bg-white border border-black/10 text-black'
                          : 'bg-black/5 text-black/40'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
                <div className="w-[64px] flex-shrink-0" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[64px] h-full bg-gradient-to-l from-[#F8F8F8] to-transparent z-20 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredScripts.map((script) => {
              const { bg, text } = getColorByCategory(script.category);
              return (
                <div
                  key={script.id}
                  onClick={() => {
                    setUploadedScript(script);
                    setCurrentScreen('setup');
                  }}
                  className="h-[139px] p-4 bg-black/[0.03] border border-black/[0.03] rounded-[12px] cursor-pointer hover:bg-black/[0.05] transition flex flex-col items-start gap-2"
                >
                  <div
                    className={`inline-flex px-2 py-1 rounded-md text-[12px] font-bold ${bg} ${text}`}
                  >
                    {script.category}
                  </div>
                  <h3 className="text-[16px] font-bold text-black/80 leading-[24px]">
                    {script.topic}
                  </h3>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer setCurrentScreen={setCurrentScreen} />
    </div>
  );
}

export default HomeScreen;
