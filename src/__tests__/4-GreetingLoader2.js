import React from 'react'
import { render, wait } from '@testing-library/react'
import user from '@testing-library/user-event'

import GreetingLoader from '../components/GreetingLoader2'

/* 
  Test Notes:
  - This is the same as the GreetingLoader component and same test scenario
  - In this case, GreetingLoader2 has the loadGreeting() in the props instead of
    the direct import module. This will enable the component to work in different test
    environment that doesn't have great module mocking capabilities.
  - instead of using 'jest.mock()' to mock a module, we used 'jest.fn()' to mock a
    function (in this case is our mockLoadGreeting).
  - We passed this mock function as props to replace the default prop value of loadGreeting
    which is the actual module that contains the api call.
*/

test('load greeting from props after form submit', async () => {
  const name = 'Paul'
  const greeting = `HEY ${name}`
  const mockLoadGreeting = jest.fn()
  mockLoadGreeting.mockResolvedValueOnce({ data: { greeting } })

  const { getByLabelText, getByText } = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)

  user.type(nameInput, name)
  user.click(loadButton)

  expect(mockLoadGreeting).toHaveBeenCalledWith(name)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(greeting)
  )
})
