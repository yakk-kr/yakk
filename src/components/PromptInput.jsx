import React, { useState } from 'react';
import { WandSparkles, ChevronRight, ArrowUp, X } from 'lucide-react';
import { fetchFromGPT } from '../utils/gpt';

function PromptInput({ onScriptGenerated, setCurrentScreen }) {
  const [inputText, setInputText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleLevelDeselect = () => {
    setSelectedLevel(null);
  };

  const handleGenerateAndNavigate = async () => {
    onScriptGenerated(null);
    setCurrentScreen({
      name: 'scriptResult',
      prompt: inputText,
      level: selectedLevel,
    });

    let gptResponse = '';
    try {
      // 분리된 함수를 호출하여 사용
      gptResponse = await fetchFromGPT(inputText);
      const cleanedResponse = gptResponse
        .replace(/```json|```/g, '')
        .replace(/\u00A0/g, ' ')
        .trim();

      const parsedOutput = JSON.parse(cleanedResponse);
      onScriptGenerated(parsedOutput);
    } catch (e) {
      console.error('❌ Failed to parse JSON from AI response:', e);
      onScriptGenerated(null);
    }
  };

  return (
    <div className="w-full bg-white/30 shadow-[0_4px_100px_rgba(77,161,0,0.25)] rounded-[20px] outline outline-2 outline-[#EFEFEF]">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-5 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <WandSparkles size={16} className="text-gray-400" />
          <div className="text-m font-bold text-black/50">
            연습해보고 싶은 상황이 있나요?
          </div>
        </div>
        <ChevronRight
          size={22}
          className={`text-gray-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </div>

      <div
        className={`transition-max-h duration-500 ease-in-out overflow-hidden`}
        style={{ maxHeight: isExpanded ? '400px' : '0' }}
      >
        <div className="flex flex-col gap-4 px-5 pb-5">
          <textarea
            placeholder="예: 전시회에서 기능성 의류를 판매하는 부스에서 해외 바이어에게 상품을 소개하는 상황"
            className="w-full h-[200px] text-black placeholder:text-black/20 text-m font-bold resize-none outline-none bg-transparent"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="w-full flex justify-between items-center">
            <div
              className={`flex transition-all duration-300 ${
                selectedLevel ? 'gap-x-0' : 'gap-x-3'
              }`}
            >
              {['쉬움', '보통', '어려움'].map((level) => {
                const isSelected = selectedLevel === level;

                return (
                  <div
                    key={level}
                    className={`py-[7px] rounded-full text-sm font-semibold cursor-pointer group
    transition-all duration-300 ease-in-out
    ${
      isSelected
        ? 'bg-[#B4FF6F80] pl-4 pr-3'
        : 'bg-black/[0.05] hover:bg-black/[0.1]'
    }
    ${
      selectedLevel
        ? isSelected
          ? 'px-4'
          : 'px-0 opacity-0 scale-75 w-0 p-0 m-0 overflow-hidden'
        : 'px-4'
    }
    active:scale-95`}
                    onClick={() =>
                      isSelected
                        ? handleLevelDeselect()
                        : handleLevelSelect(level)
                    }
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className={`transition-colors duration-300 ease-in-out ${
                          isSelected
                            ? 'text-[#59B800]'
                            : 'text-gray-400 group-hover:text-black/60'
                        }`}
                      >
                        {level}
                      </span>
                      {isSelected && (
                        <X
                          size={16}
                          strokeWidth={3}
                          className="text-[#59B800]/70 transition-all duration-300 hover:text-[#59B800]"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {inputText && (
              <button
                onClick={handleGenerateAndNavigate}
                className="p-2 bg-black/80 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.07)] flex items-center justify-center
                  transition-all duration-200 ease-out
                  hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] hover:scale-110
                  active:scale-95 active:shadow-[0_5px_25px_rgba(0,0,0,0.1)]"
              >
                <ArrowUp
                  size={16}
                  strokeWidth={2.5}
                  className="text-white transition-colors duration-200"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptInput;
