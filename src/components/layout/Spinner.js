import React from 'react';
import PropTypes from 'prop-types'


const Spinner = ({
  size
}) => {
  return (
    <div className="text-center">
      <i className={`fa fa-spinner fa-pulse ${size}`}></i>
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.string
}

export default Spinner;
