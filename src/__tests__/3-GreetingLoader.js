import React from 'react'
import { render, wait } from '@testing-library/react'
import user from '@testing-library/user-event'

import GreetingLoader from '../components/GreetingLoader'
import { loadGreeting as mockLoadGreeting } from '../utils/api'

jest.mock('../utils/api')

/* 
  Test Notes:
  - This tests the loadGreeting function invoked during form submit
  - 'jest.mock' can be used to mock functions/modules when it is required
  - Use 'module.mockResolvedValueOnce(returnValue)' to set a mock return value
    when invoking the module/function being tested.
  - Use 'expect().toHaveBeenCalledWith()' to assert if function is called with
    correct argument
  - Use 'expect().toHaveBeenCalledTimes()' to assert if how many time your function
    should be invoked.
  - the `wait()` can be used to wait for you assertion to pass over a period of time.
    In this case we are waiting for the component to rerender after successful response
    from 'loadGreeting()' so that we can assert if the response from api is the text
    content of <div aria-label="greeting" />
*/

test('load greeting after form submit', async () => {
  const name = 'Paul'
  const greeting = `HEY ${name}`
  mockLoadGreeting.mockResolvedValueOnce({ data: { greeting } })

  const { getByLabelText, getByText } = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)

  user.type(nameInput, name)
  user.click(loadButton)

  // or you can do this:

  // nameInput.value = name
  // fireEvent.click(loadButton)

  expect(mockLoadGreeting).toHaveBeenCalledWith(name)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(greeting)
  )
})
