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
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-800">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 shadow-sm border-b dark:border-zinc-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
            일본어 통역 연습
          </h1>
          <button
            onClick={() => setCurrentScreen('help')} // ✅ 모달 대신 스크린 전환
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
          >
            <HelpCircle size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        {/* File Upload */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            JSON 스크립트 업로드
          </h2>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors block cursor-pointer"
          >
            <Upload
              size={48}
              className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              JSON 파일을 드래그하거나 클릭하여 업로드하세요
            </p>
            <span className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer inline-block">
              파일 선택
            </span>
          </label>
        </div>

        {/* Example Scripts */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
          <div className="p-6 border-b dark:border-zinc-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              예시 학습 자료
            </h2>
            <div className="flex flex-wrap gap-2">
              {['전체', '초급', '중급', '고급'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {filteredScripts.map((script) => (
              <div
                key={script.id}
                onClick={() => {
                  setUploadedScript(script);
                  setCurrentScreen('setup');
                }}
                className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
              >
                <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                  {script.topic}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    script.level === '초급'
                      ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200'
                      : script.level === '중급'
                      ? 'bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200'
                      : 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200'
                  }`}
                >
                  {script.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;