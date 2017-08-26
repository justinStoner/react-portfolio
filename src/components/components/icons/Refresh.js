import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Refresh = ({
  height = '24',
  styleName,
  width = '24',
  fill = '#4682b4'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={styleName}
      viewBox="0 0 48 48"
    >
      <g fill={fill}>
        <path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z" />
        <path d="M0 0h48v48h-48z" fill="none" />
      </g>
    </svg>
  );
};

Refresh.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  styleName: PropTypes.string,
  width: PropTypes.string
};

export default Icon(Refresh, true);
