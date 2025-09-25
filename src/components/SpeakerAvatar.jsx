import React from 'react';
import PropTypes from 'prop-types';

const SpeakerAvatar = ({ speaker, color, size = 'normal' }) => {
  const sizeClasses = {
    normal: 'w-12 h-12 text-[18px]',
    small: 'w-9 h-9 text-[18px]',
  };
  const avatarSizeClass = sizeClasses[size] || sizeClasses.normal;

  return (
    <div
      className={`${avatarSizeClass} rounded-full flex items-center justify-center font-bold text-black`}
      style={{ backgroundColor: color }}
    >
      {speaker}
    </div>
  );
};

SpeakerAvatar.propTypes = {
  speaker: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['normal', 'small']),
};

export default SpeakerAvatar;
