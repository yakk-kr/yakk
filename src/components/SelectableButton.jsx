import React from 'react';
import { X } from 'lucide-react';

function SelectableButton({
  label,
  isSelected,
  onClick,
  showCloseIcon = false,
  variant = 'default', // 'default' | 'level'
}) {
  const baseClasses =
    'rounded-full text-[14px] px-[14px] py-[6px] font-semibold cursor-pointer transition-all duration-300 ease-in-out active:scale-95';

  if (variant === 'level') {
    // 난이도 버튼용 스타일 (기존 selectedLevel 스타일)
    return (
      <div
        onClick={onClick}
        className={`${baseClasses} group
          ${
            isSelected
              ? 'bg-[#B4FF6F80]'
              : 'bg-black/[0.05] hover:bg-black/[0.1]'
          }`}
      >
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span
            className={`transition-colors duration-300 ease-in-out ${
              isSelected
                ? 'text-[#59B800]'
                : 'text-gray-400 group-hover:text-black/60'
            }`}
          >
            {label}
          </span>
          {isSelected && showCloseIcon && (
            <X
              size={16}
              strokeWidth={3}
              className="text-[#59B800]/70 transition-all duration-300 hover:text-[#59B800]"
            />
          )}
        </div>
      </div>
    );
  }

  // 기본 탭 버튼용 스타일 (기존 categoryTabs 스타일)
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap ${baseClasses} group
        ${
          isSelected
            ? 'bg-white border border-black/10 text-black'
            : 'bg-black/5 text-gray-400 hover:text-black/60 hover:bg-black/[0.1]'
        }`}
    >
      {label}
    </button>
  );
}

export default SelectableButton;
