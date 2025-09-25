import React from 'react';
import { Mail, Github } from 'lucide-react';
import Logo from '../assets/logo.svg';

function Footer({ setCurrentScreen }) {
  return (
    <footer className="w-full bg-black/5 px-8 pt-6 pb-16 flex justify-between items-start">
      <div className="flex flex-col">
        <img
          src={Logo}
          alt="yakk logo"
          className="w-[56px] h-auto mb-2 opacity-30"
        />
        <p className="text-xs text-black/30">
          한국어-일본어 통역 학습 서비스 <b>야크</b>
        </p>
        <a
          href="mailto:contact@yakk.kr"
          className="flex items-center gap-2 mt-1"
        >
          <p className="text-xs text-black/30">이메일</p>
          <div className="w-[1px] h-2 bg-black/30" />
          <p className="text-xs text-black/30">contact@yakk.kr</p>
        </a>
        <button
          onClick={() => setCurrentScreen('feedback')}
          className="text-xs text-black/30 underline underline-offset-2 hover:text-black/50 mt-1 text-left bg-transparent border-none p-0 m-0 cursor-pointer"
        >
          문의하기
        </button>
      </div>

      <div className="flex gap-6 items-center">
        {/* GitHub */}
        <a
          href="https://github.com/yakk-kr/yakk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-500 transition"
        >
          <Github size={20} />
        </a>

        {/* Email */}
        <a
          href="mailto:contact@yakk.kr"
          className="text-gray-400 hover:text-gray-500 transition"
        >
          <Mail size={20} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
