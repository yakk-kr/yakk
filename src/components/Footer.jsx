import React from 'react';
import { Mail, Github } from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full bg-black/5 px-8 pt-6 pb-16 flex justify-between items-center">
      <div>
        <p className="font-extrabold text-2xl text-black/30">yakk</p>
        <p className="text-xs text-black/30">한국어-일본어 통역 학습 서비스</p>
      </div>
      <div className="flex gap-6 items-center">
        {/* GitHub */}
        <a
          href="https://github.com/hyynjju"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/30 hover:text-black transition"
        >
          <Github size={20} />
        </a>

        {/* Email */}
        <a
          href="mailto:yakk.learning@gmail.com"
          className="text-black/30 hover:text-black transition"
        >
          <Mail size={20} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
