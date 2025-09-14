import React, { useMemo } from 'react';
import { Upload, HelpCircle } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../assets/logo.svg';
import { learningSamples } from '../data.js';

function HomeScreen({
  setCurrentScreen,
  handleFileUpload,
  setUploadedScript,
  selectedTab,
  setSelectedTab,
}) {
  // 카테고리 탭 자동 추출
  const categoryTabs = useMemo(() => {
    const categories = Array.from(
      new Set(learningSamples.map((item) => item.category))
    );
    return ['전체', ...categories];
  }, []);

  // 선택된 탭에 따른 필터링
  const filteredScripts = useMemo(() => {
    if (selectedTab === '전체') return learningSamples;
    return learningSamples.filter((script) => script.category === selectedTab);
  }, [selectedTab]);

  // 카테고리별 색상 매핑
  const colorMap = {
    1: { bg: 'bg-[#DBFFBB]/30', text: 'text-[#20A000]' }, // 초록
    2: { bg: 'bg-[#FFCBF2]/40', text: 'text-[#D63384]' }, // 핑크
    3: { bg: 'bg-[#B2D3FF]/40', text: 'text-[#1679F8]' }, // 파랑
    4: { bg: 'bg-[#FFE199]/40', text: 'text-[#FF9800]' }, // 주황
  };

  const getColorByCategory = (category) => {
    const idx = categoryTabs.indexOf(category);
    const key = ((idx - 1) % 4) + 1; // 1부터 시작
    return colorMap[key] || colorMap[1];
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md z-40">
        <div className="pl-5 pr-2 py-3 flex justify-between items-center">
          <img src={Logo} alt="yakk logo" className="w-[48px] h-auto" />
          <button
            onClick={() => setCurrentScreen('help')}
            className="p-2 rounded-lg bg-transparent hover:bg-black/5"
          >
            <HelpCircle size={22} className="text-gray-400" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-5 pt-24 pb-16 space-y-16 max-w-[1024px] mx-auto w-full">
        {/* 업로드 카드 */}
        <div className="bg-white rounded-2xl shadow-[0_4px_100px_rgba(142,218,70,0.25)] p-8 flex flex-col items-center justify-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-black/20 to-transparent" />
          <p className="text-center text-gray-500 font-semibold text-base leading-relaxed">
            JSON 파일을 업로드하고 <br /> 학습을 시작해보세요!
          </p>
          <label
            htmlFor="file-upload"
            className="px-5 py-2 rounded-xl border border-black/10 bg-gradient-to-b from-black/[0.03] via-black/[0.05] to-black/[0.04] flex items-center gap-3 cursor-pointer hover:bg-black/[0.08] transition"
          >
            <Upload size={16} className="text-black/50" />
            <span className="text-sm font-bold text-black/50 leading-6">
              파일 업로드하기
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* 예시 자료 */}
        <section className="space-y-4">
          <h2 className="text-[18px] font-bold text-black">
            💬 이런 상황은 어때요?
          </h2>

          <div className="relative">
            {/* Tabs 영역 */}
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-3 pr-0">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-3 py-1.5 whitespace-nowrap rounded-full text-[14px] font-semibold transition
          ${
            selectedTab === tab
              ? 'bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] text-black'
              : 'bg-black/5 text-black/40'
          }`}
                  >
                    {tab}
                  </button>
                ))}

                {/* 가짜 마지막 여백 아이템 */}
                <div className="w-[64px] flex-shrink-0" />
              </div>
            </div>

            {/* 오른쪽 고정 그라디언트 오버레이 */}
            <div className="absolute top-0 right-0 w-[64px] h-full bg-gradient-to-l from-[#F8F8F8] to-transparent z-20 pointer-events-none" />
          </div>

          {/* Scripts Grid */}
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
                  {/* 태그 (칩) */}
                  <div
                    className={`inline-flex px-2 py-1 rounded-md text-[12px] font-bold ${bg} ${text}`}
                  >
                    {script.category}
                  </div>

                  {/* 주제 */}
                  <h3 className="text-[16px] font-bold text-black/80 leading-[24px]">
                    {script.topic}
                  </h3>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomeScreen;
