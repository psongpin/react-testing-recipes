import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as api from '../utils/api'

const GreetingLoader = ({ loadGreeting }) => {
  const [greeting, setGreeting] = useState('')

  const loadGreetingForInput = async (event) => {
    event.preventDefault()
    const { data } = await loadGreeting(event.target.elements.name.value)
    setGreeting(data.greeting)
  }
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name">
        <input id="name" />
        Name
      </label>
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  )
}

GreetingLoader.propTypes = {
  loadGreeting: PropTypes.func,
}

GreetingLoader.defaultProps = {
  loadGreeting: api.loadGreeting,
}

export default GreetingLoader
