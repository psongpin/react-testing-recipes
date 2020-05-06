import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Routes from '../components/Routes'

// Reusable custom render function for wrapping components or jsx nodes
// with custom router
const renderWithRouter = (
  node = null,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {}
) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  )

  const utils = render(node, { wrapper: Wrapper, ...renderOptions })

  return {
    ...utils,
    history,
  }
}

// Test cases:
test('should render correct component for each valid route', () => {
  const { getByRole, getByTestId } = renderWithRouter(<Routes />)

  user.click(getByTestId('about'))
  expect(getByRole('heading')).toHaveTextContent(/about/i)

  user.click(getByTestId('home'))
  expect(getByRole('heading')).toHaveTextContent(/home/i)
})

test('should render 404 page component if no route matches', () => {
  const { getByRole } = renderWithRouter(<Routes />, {
    route: '/not-a-valid-route',
  })

  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
