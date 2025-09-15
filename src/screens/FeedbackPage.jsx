import React, { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { sendFeedback } from '../utils/googleFormSubmit';

function FeedbackPage({ setCurrentScreen }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const getInputStyle = (field) => {
    const isFocused = focusedInput === field;
    return `
      w-full h-[56px] px-4 flex items-center rounded-xl
      border transition-all duration-200
      ${
        isFocused
          ? 'bg-[#B7FF73]/20 border-[1.5px] border-[#59B800]'
          : 'bg-black/[0.03] border-[1.5px] border-black/[0.03]'
      }
    `;
  };

  const getTextAreaStyle = () => {
    const isFocused = focusedInput === 'message';
    return `
      w-full h-[240px] px-4 py-3 rounded-xl
      border resize-none transition-all duration-200
      ${
        isFocused
          ? 'bg-[#B7FF73]/20 border-[1.5px] border-[#59B800]'
          : 'bg-black/[0.03] border-[1.5px] border-black/[0.03]'
      }
    `;
  };

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    setLoading(true);
    const success = await sendFeedback({ name, email, message });
    setLoading(false);

    if (success) {
      alert('의견이 성공적으로 전송되었습니다. 감사합니다!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert('전송 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8F8F8] overflow-hidden">
      {/* 상단 연두 그라디언트 배경 */}
      <div className="absolute top-0 left-0 w-full h-[405px] opacity-30 bg-gradient-to-b from-[#C1FF87] to-transparent pointer-events-none z-0" />

      {/* 헤더 */}
      <div className="fixed top-0 z-10 w-full h-[52px] bg-white flex items-center px-2 border-b border-black/5">
        <div className="flex items-center">
          <button
            onClick={() => setCurrentScreen({ name: 'home' })}
            className="p-2 rounded-lg bg-transparent hover:bg-black/5 mr-2"
          >
            <ChevronLeft
              strokeWidth={2.5}
              size={20}
              className="text-gray-400"
            />
          </button>
          <h1 className="text-[16px] font-bold text-black">문의하기</h1>
        </div>
      </div>

      {/* 폼 */}
      <div className="pt-24 px-5 pb-32 max-w-[640px] mx-auto flex flex-col gap-6">
        {/* 이름 */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] font-bold text-black">이름</label>
          <div className={getInputStyle('name')}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              placeholder="이름을 입력해주세요."
              className="w-full bg-transparent text-[16px] font-semibold placeholder:text-black/30 outline-none"
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] font-bold text-black">
            이메일 주소
          </label>
          <div className={getInputStyle('email')}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              placeholder="이메일 주소를 입력해주세요."
              className="w-full bg-transparent text-[16px] font-semibold placeholder:text-black/30 outline-none"
            />
          </div>
        </div>

        {/* 문의 내용 */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] font-bold text-black">문의 내용</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocusedInput('message')}
            onBlur={() => setFocusedInput(null)}
            placeholder="문의 내용을 입력해주세요."
            className={`${getTextAreaStyle()} text-[16px] font-semibold placeholder:text-black/30 outline-none`}
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="h-5 bg-gradient-to-t from-[#F8F8F8] to-transparent pointer-events-none" />
        <div className="bg-[#F8F8F8] px-5 pb-6 flex flex-col gap-3 max-w-[640px] mx-auto">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`h-[52px] rounded-2xl flex items-center justify-center gap-3 font-bold text-[16px] text-black ${
              loading
                ? 'bg-[#B7FF74]/50 cursor-not-allowed'
                : 'bg-[#B7FF74] hover:bg-[#92FF2B]'
            }`}
          >
            <Send size={16} strokeWidth={2.5} className="text-black" />
            {loading ? '전송 중...' : '의견 보내기'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
