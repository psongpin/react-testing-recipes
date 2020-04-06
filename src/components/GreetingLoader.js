import React, { useState } from 'react'
import { loadGreeting } from '../utils/api'

const GreetingLoader = () => {
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

export default GreetingLoader
