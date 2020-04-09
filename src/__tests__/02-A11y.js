import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

const Form = () => (
  <form>
    <label htmlFor="email">
      <input placeholder="email" name="email" />
      Email
    </label>
  </form>
)

/* 
  Test Notes:
  - install 'jest-axe' to able to use a11y test helpers
  - import 'jest-axe/extend-expect' to 'setupTests.js' to extend expect() capabilities
  - 'axe' function from 'jest-axe' returns a promise. Resolve first, before asserting
  - toHaveNoViolations() is an extended property of expect from 'jest-axe'
    added to check a11y issues within the rendered element.
*/

test('form should be accessible', async () => {
  const { container } = render(<Form />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
