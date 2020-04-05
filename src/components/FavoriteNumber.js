import React, { useState } from 'react'
import PropTypes from 'prop-types'

const FavoriteNumber = ({ min, max }) => {
  const [number, setNumber] = useState(0)
  const [numberEntered, setNumberEntered] = useState(false)

  const handleChange = (event) => {
    setNumber(Number(event.target.value))
    setNumberEntered(true)
  }

  const isValid = !numberEntered || (number >= min && number <= max)

  return (
    <div>
      <label htmlFor="favorite-number">
        Favorite Number
        <input
          id="favorite-number"
          type="number"
          value={number}
          onChange={handleChange}
        />
      </label>
      {isValid ? null : (
        <div role="alert" data-testid="error-message">
          The number is invalid
        </div>
      )}
    </div>
  )
}

FavoriteNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
}

FavoriteNumber.defaultProps = {
  min: 1,
  max: 9,
}

export default FavoriteNumber
