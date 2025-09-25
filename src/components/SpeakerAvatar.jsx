import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const SpeakerAvatar = ({ speaker, allSpeakers, size = 'normal' }) => {
  const sizeClasses = {
    normal: 'w-12 h-12 text-[18px]',
    small: 'w-9 h-9 text-[18px]',
  };
  const avatarSizeClass = sizeClasses[size] || sizeClasses.normal;

  const speakerColors = ['#B7FF74', '#FFCAE8', '#BFDEFF', '#FFC9A0'];

  // speaker → color 매핑
  const speakerColorMap = useMemo(() => {
    return allSpeakers.reduce((map, spk, index) => {
      map[spk] = speakerColors[index % speakerColors.length];
      return map;
    }, {});
  }, [allSpeakers]);

  return (
    <div
      className={`${avatarSizeClass} rounded-full flex items-center justify-center font-bold text-black`}
      style={{ backgroundColor: speakerColorMap[speaker] || '#E0E0E0' }}
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
