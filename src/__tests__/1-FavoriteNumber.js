import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'

import FavoriteNumber from '../components/FavoriteNumber'

/* 
  Test Notes:
  - use `getByLabelText` from render to get input associated with label text
  - use `toHaveAttribute` property from expect to check html attributes
  - import '@testing-library/jest-dom/extend-expect' extends expect function
    to use jest-dom functions
*/
test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText } = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})

/* 
  Test Notes:
  - use 'getByRole' to get an element based from role attribute
  - 'fireEvent' from '@testing-library/react' can be used to fire dom events into selected elements
  - 'user' from '@testing-library/user-event' exposes wrapper on top of fireEvents to simulate user events
  - 'rerender' function can be used to trigger prop changes
  - 'getByRole' will return an error if an element doesn't match. If the intention is to check unrendered
    element, use 'queryByRole' instead (in this case we are matching by role)
  - element selectors from render() are prefixed with 'get' or 'query'. Use either of those for
    corresponding use case.
*/
test('invalid value should show error message', () => {
  const { getByLabelText, getByRole, rerender, queryByRole } = render(
    <FavoriteNumber />
  )
  const input = getByLabelText(/favorite number/i)

  // fireEvent.change(input, { target: { value: '10' } })
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)

  rerender(<FavoriteNumber max={10} />)
  expect(queryByRole('alert')).toBeNull()
})
