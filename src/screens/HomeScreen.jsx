import React from 'react';
import { Upload, HelpCircle } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../assets/logo.svg';

function HomeScreen({
  setCurrentScreen,
  handleFileUpload,
  filteredScripts,
  setSelectedTab,
  selectedTab,
  setUploadedScript,
}) {
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
            <HelpCircle size={22} className="text-gray-600" />
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
          <input
            id="file-upload"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* 예시 자료 */}
        <section className="space-y-6">
          <h2 className="text-[18px] font-bold text-black">
            💬 이런 상황은 어때요?
          </h2>

          {/* Tabs */}
          <div className="flex items-center gap-3">
            {['전체', '초급', '중급', '고급'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1.5 rounded-full text-[14px] font-semibold transition
        ${
          selectedTab === tab
            ? 'bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] text-black'
            : 'bg-black/5 text-black/40'
        }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Scripts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredScripts.map((script) => (
              <div
                key={script.id}
                onClick={() => {
                  setUploadedScript(script);
                  setCurrentScreen('setup');
                }}
                className="h-[139px] p-4 bg-black/[0.03] border border-black/[0.03] rounded-[12px] cursor-pointer hover:bg-black/[0.05] transition"
              >
                <h3 className="text-[16px] font-bold text-black/80 leading-[24px]">
                  {script.topic}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomeScreen;
