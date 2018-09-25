import React from 'react'
import PropTypes from 'prop-types'

const ButtonSubmit = ({
    type,
    label,
    className
}) => {
  return (
    <div className="form-group">
        <button
            type={type}
            className={className}
        >{label}</button>
    </div>
  )
}

ButtonSubmit.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

export default ButtonSubmit;
