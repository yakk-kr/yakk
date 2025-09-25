import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const SpeakerAvatar = ({ speaker, allSpeakers, size = 'normal' }) => {
  const sizeClasses = {
    normal: 'w-12 h-12 text-[18px]',
    small: 'w-9 h-9 text-[18px]',
  };
  const avatarSizeClass = sizeClasses[size] || sizeClasses.normal;

  // 화자별 색상 정의 (그라디언트 + 텍스트)
  const colorSchemes = [
    {
      gradient: 'linear-gradient(to bottom, #B7FF74, #A2F158)',
      text: '#448D00',
    }, // 연두
    {
      gradient: 'linear-gradient(to bottom, #FFCAE8, #F9A9D6)',
      text: '#CE4F96',
    }, // 분홍
    {
      gradient: 'linear-gradient(to bottom, #BFDEFF, #94C3F5)',
      text: '#3C7EC4',
    }, // 파랑
    {
      gradient: 'linear-gradient(to bottom, #FFC9A0, #FAB179)',
      text: '#CE691B',
    }, // 주황
  ];

  // speaker → color 매핑
  const speakerColorMap = useMemo(() => {
    return allSpeakers.reduce((map, spk, index) => {
      const scheme = colorSchemes[index % colorSchemes.length];
      map[spk] = scheme;
      return map;
    }, {});
  }, [allSpeakers]);

  const scheme = speakerColorMap[speaker] || {
    gradient: 'linear-gradient(to bottom, #E0E0E0, #C0C0C0)',
    text: '#333',
  };

  return (
    <div
      className={`${avatarSizeClass} rounded-full flex items-center justify-center font-bold`}
      style={{
        background: scheme.gradient,
        color: scheme.text,
      }}
    >
      {speaker}
    </div>
  );
};

SpeakerAvatar.propTypes = {
  speaker: PropTypes.string.isRequired,
  allSpeakers: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.oneOf(['normal', 'small']),
};

export default SpeakerAvatar;
