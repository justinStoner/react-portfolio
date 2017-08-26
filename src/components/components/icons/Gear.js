import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Gear = ({ height = '24', styleName, width = '24', fill = '#4682b4' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={styleName}
    >
      <g fill={fill}>
        <path d="M20 13.44v-2.88l-1.8-.3c-.1-.397-.3-.794-.6-1.39l1.1-1.49-2.1-2.088-1.5 1.093c-.5-.298-1-.497-1.4-.596L13.5 4h-2.9l-.3 1.79c-.5.098-.9.297-1.4.595L7.4 5.292 5.3 7.38l1 1.49c-.3.496-.4.894-.6 1.39l-1.7.2v2.882l1.8.298c.1.497.3.894.6 1.39l-1 1.492 2.1 2.087 1.5-1c.4.2.9.395 1.4.594l.3 1.79h3l.3-1.79c.5-.1.9-.298 1.4-.596l1.5 1.092 2.1-2.08-1.1-1.49c.3-.496.5-.993.6-1.39l1.5-.3zm-8 1.492c-1.7 0-3-1.292-3-2.982 0-1.69 1.3-2.98 3-2.98s3 1.29 3 2.98-1.3 2.982-3 2.982z" />
      </g>
    </svg>
  );
};

Gear.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  styleName: PropTypes.string,
  width: PropTypes.string
};

export default Icon(Gear, true);