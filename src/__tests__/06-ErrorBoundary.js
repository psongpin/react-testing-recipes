/* eslint-disable no-console */
import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'

import ErrorBoundary from '../components/ErrorBoundary'
import { reportError as mockReportError } from '../utils/api'

/* 
  Test Notes:
  - In this case, we are testing if `reportError()` has been called properly
    in the `componentDidCatch` lifecycle method and if our custom error message
    has been rendered properly when we catch an error in the lifecycle
  - As usual we will mock our sample API call (reportError) using jest.mock()
*/

jest.mock('../utils/api')

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
})

// This will be the child component that will control the error thrown in the
// component tree.
const ErrorGenerator = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Something went wrong!')
  } else {
    return null
  }
}

test('calls reportError and render error correctly', () => {
  mockReportError.mockResolvedValueOnce({ success: true })
  const {
    rerender,
    getByRole,
    queryByRole,
    getByText,
    queryByText,
  } = render(<ErrorGenerator />, { wrapper: ErrorBoundary })

  // First Scenario: Error Boundary catches error from child component
  // rerender the component with a child that throws and error
  rerender(<ErrorGenerator shouldThrow />)

  // Assertion for the DOM in first case
  /* 
    Notes:
    - We test the rendered DOM by using `getByText` and `getByRole`
    - `toBeInTheDocument()` to check if it is rendered in the document body
    - `toMatchInlineSnapshot()` to check the input against the capture snapshot.
      Snapshot is automatically generated into the source code. Snapshots can be
      used to check changes made to the DOM.
  */
  expect(queryByText(/try again/i)).toBeInTheDocument()
  expect(getByRole('alert')).toMatchInlineSnapshot(`
    <div
      role="alert"
    >
      There was a problem. 
    </div>
  `)

  // Assertions for `reportError()` in first case
  /*
    Notes:
    - In this case args passed to `reportError()` should be the args of the `componentDidCatch`
      lifecycle. 1st arg should be Error type and 2nd arg is the stack trace.
    - `expect.any()` can be used to check types (used for 1st arg)
    - `expect.stringContaining()` can be check to substring (used for 2nd arg to check a 
      substring in stack trace)
    - Both `expect.any()` and `expect.stringContaining()` can be used to check args in a test
      with `toHaveBeenCalledWith()`
    - we also expect console.error to be called 2 times (1 from react-dom and 1 from js-dom)
  */
  const error = expect.any(Error)
  const info = { componentStack: expect.stringContaining('ErrorGenerator') }
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)
  expect(console.error).toHaveBeenCalledTimes(2)

  // Reseting mocked function call counters
  /* 
    Notes:
    - `mockReportError` is mocked using `jest.mock()`
    - `console.error` is mocked using `jest.spyOn()` in the `beforeAll` block. We need to prevent
      it from displaying logs since our intention really is to trigger the error so displaying it
      isn't necessary. We have to mock it to do nothing before any tests in this file. See `beforeAll`
      above.
    - We need to restore its functions as well using `mockRestore()` in `afterAll` block.
    - We also need to clear the counters generated during the assertions above with out removing the
      mocking capabilities by using `mockClear()` on mocked functions.
  */
  mockReportError.mockClear()
  console.error.mockClear()

  // Second case: When child components rerenders and child doesn't throw error
  /*
    - Take note that `rerender()` doesn't invoke state change unless it is in the logic of the component's
      lifecycle or sideEffects. In this case child was changed but state is still `hasError = true`.
    - Now we click the button activate state change so we can check the changes in the rendered DOM
  */
  rerender(<ErrorGenerator />)

  // Action to reset state
  user.click(getByText(/try again/i))

  // Assertion for the second case
  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
  expect(queryByRole('alert')).not.toBeInTheDocument()
})
