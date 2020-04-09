import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

const HiddenMessage = ({ children }) => {
  const [show, setShow] = useState(false)

  const toggle = () => {
    setShow(prevShow => !prevShow)
  }

  return (
    <div>
      <button onClick={toggle} type="button">
        Toggle
      </button>

      <CSSTransition in={show} unmountOnExit timeout={1000} className="fade">
        <div>{children}</div>
      </CSSTransition>
    </div>
  )
}

HiddenMessage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HiddenMessage
