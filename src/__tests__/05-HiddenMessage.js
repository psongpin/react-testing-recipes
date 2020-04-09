import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'

import HiddenMessage from '../components/HiddenMessage'

/* 
  Test Notes:
  - Here we are testing a component that has a some sort of delay in render like
    <CSSTransition /> from 'react-transition-group'. In this case, the unmounting
    has 1 sec delay.
  - we have 2 options on how we can test the delay in the unmount of the component:
  - (1) use 'wait()' which will allow you to wait for an assertion to be satisfied 
    before proceeding. This is quite slow and may result to timeout if delay is too
    long
  - (2) mock the module using 'jest.mock()'. In this case we are mocking the CSSTransition
    from react-transition-group to be instantaneous. We will be assuming that the module
    is well-tested so we won't have to test it's implementation details.
*/

// Use this if you're will mock a module.
jest.mock('react-transition-group', () => ({
  CSSTransition: props => (props.in ? props.children : null),
}))

test('HiddenMessage should toggle correctly', () => {
  const message = 'Test'
  const { getByText, queryByText } = render(
    <HiddenMessage>{message}</HiddenMessage>
  )
  const toggleButton = getByText(/toggle/i)

  user.click(toggleButton)
  expect(queryByText(message)).toBeInTheDocument()
  user.click(toggleButton)
  expect(queryByText(message)).not.toBeInTheDocument()
  // or you can do this (however this is quite slow):
  // await wait(() => expect(queryByText(message)).not.toBeInTheDocument())
})
