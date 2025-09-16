import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WandSparkles, ChevronRight, ArrowUp, X } from 'lucide-react';
import axios from 'axios';

function buildUserPrompt(input) {
  if (
    input.length < 30 ||
    (!input.includes('상황') && !input.includes('대화'))
  ) {
    return `"${input}"라는 키워드를 일본어-한국어 통역 연습용 대화 스크립트로 구성해줘. 주고받는 형식의 대화로 최소 10문장 이상, 실제 면접 또는 회화처럼 자연스럽게 써줘.`;
  }
  return input;
}

async function fetchFromGPT(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `일본어-한국어 통역 연습을 위한 JSON 스크립트 생성\n\n\`\`\`json\n{
  "topic": "대화 상황 또는 주제",
  "script": [
    { "speaker": "A", "jp": "일본어 문장", "kr": "한국어 문장" },
    { "speaker": "B", "jp": "일본어 문장", "kr": "한국어 문장" }
  ]
}
\`\`\`
- 반드시 JSON 형식으로만 응답
- script는 최소 10문장 이상의 주고받는 대화 포함
- 실제 일본어/한국어 회화처럼 자연스럽고 맥락에 맞게 작성`,
        },
        {
          role: 'user',
          content: buildUserPrompt(prompt),
        },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
}

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
                            : 'text-black/40 group-hover:text-black/60'
                        }`}
                      >
                        {level}
                      </span>
                      {isSelected && (
                        <X
                          size={16}
                          strokeWidth={2.5}
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
                  strokeWidth={3}
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
