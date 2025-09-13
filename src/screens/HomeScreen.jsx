import React from 'react';
import { Upload, HelpCircle } from 'lucide-react';

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
        <div className="px-5 py-3 flex justify-between items-center">
          <h1 className="font-extrabold text-lg text-black">yakk</h1>
          <button
            onClick={() => setCurrentScreen('help')}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <HelpCircle size={22} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-5 pt-20 pb-16 space-y-16">
        {/* 업로드 카드 */}
        <div className="bg-white rounded-2xl shadow-[0_4px_100px_rgba(142,218,70,0.25)] p-8 flex flex-col items-center justify-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-black/20 to-transparent" />
          <p className="text-center text-gray-500 font-semibold text-base leading-relaxed">
            JSON 파일을 업로드하고 <br /> 학습을 시작해보세요!
          </p>
          <label
            htmlFor="file-upload"
            className="px-5 py-2 bg-gradient-to-b from-black/5 via-black/10 to-black/5 border border-black/10 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-black/10 transition"
          >
            <Upload size={16} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-600">
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
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-black">💬 이런 상황은 어때요?</h2>

          {/* Tabs */}
          <div className="flex items-center gap-3">
            {['전체', '초급', '중급', '고급'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                  selectedTab === tab
                    ? 'bg-white shadow-md text-black'
                    : 'bg-black/5 text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Scripts Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredScripts.map((script) => (
              <div
                key={script.id}
                onClick={() => {
                  setUploadedScript(script);
                  setCurrentScreen('setup');
                }}
                className="h-36 bg-black/5 border border-black/5 rounded-xl flex items-center justify-center p-4 cursor-pointer hover:bg-black/10 transition"
              >
                <h3 className="text-base font-bold text-black text-center leading-relaxed">
                  {script.topic}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-black/5 px-5 py-6 flex justify-between items-center">
        <div>
          <p className="font-extrabold text-2xl text-black/30">yakk</p>
          <p className="text-xs text-black/30">
            한국어-일본어 통역 학습 서비스
          </p>
        </div>
        <div className="flex gap-6">
          <div className="w-6 h-6 bg-black/30 rounded-sm" />
          <div className="w-6 h-6 bg-black/30 rounded-sm" />
        </div>
      </footer>
    </div>
  );
}

export default HomeScreen;