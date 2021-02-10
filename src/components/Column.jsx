import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';


const Column = ({ className, width, text }) => {
  const columnClassNames = classNames({
    [`column width-${width}`]: true,
    [className]: true 
  });

  return (
    <div className={columnClassNames}>
      <p>Width: {width}</p>
      <p>{text ? text : null}</p>
    </div>
  )
}

Column.propTypes = {
  width: PropTypes.number,
  text: PropTypes.string
}

export default Column;