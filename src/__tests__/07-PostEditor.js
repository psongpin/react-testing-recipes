import React from 'react'
import { render, wait } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Redirect as MockRedirect } from 'react-router-dom'
import { fake, sequence, build } from '@jackfranklin/test-data-bot'

import PostEditor from '../components/PostEditor'
import { savePost as mockSavePost } from '../utils/api'

jest.mock('../utils/api')

jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(() => null),
}))

afterEach(() => {
  jest.clearAllMocks()
})

// Fake generated data
// use test-data-bot to generate fake data. It uses faker and sequence under the hood
const postBuilder = build('Post', {
  fields: {
    title: fake(f => f.lorem.words()),
    content: fake(f => f.lorem.paragraphs().replace(/\r/g), ''),
    tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
  },
})

const userBuilder = build('User', {
  fields: {
    id: sequence(s => `user-${s}`),
  },
})

// Custom reusable helper for rendering PostEditor component
/*
  This helper does the the following:
  - render the PostEditor component
  - set initial values for the inputs
  - return randomly generated user (fakeUser) and post (fakePost)
  - returns the react-testing-library utils from rendered component
*/
const renderEditor = () => {
  const fakeUser = userBuilder()
  const fakePost = {
    ...postBuilder(),
    authorId: fakeUser.id,
    date: expect.any(String),
  }

  const utils = render(<PostEditor user={fakeUser} />)

  const titleInput = utils.getByLabelText(/title/i)
  const contentInput = utils.getByLabelText(/content/i)
  const tagsInput = utils.getByLabelText(/tags/i)
  const submitButton = utils.getByText(/submit/i)

  user.type(titleInput, fakePost.title)
  user.type(contentInput, fakePost.content)
  user.type(tagsInput, fakePost.tags.join(', '))

  return { fakePost, submitButton, ...utils }
}

// Tests
test('form should submit properly', async () => {
  mockSavePost.mockResolvedValueOnce()
  const { fakePost, submitButton } = renderEditor()

  const preSubmitDate = new Date().getTime()

  user.click(submitButton)

  const postSubmitDate = new Date().getTime()
  const dateOnMockSavePostArg = new Date(
    mockSavePost.mock.calls[0][0].date
  ).getTime()

  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith(fakePost)
  expect(dateOnMockSavePostArg).toBeGreaterThanOrEqual(preSubmitDate)
  expect(dateOnMockSavePostArg).toBeLessThan(postSubmitDate)
  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {}))
})

test('renders an error message after failed request', async () => {
  const errMsg = 'test error'
  mockSavePost.mockRejectedValueOnce({ data: { error: errMsg } })
  const { submitButton, findByRole } = renderEditor()

  user.click(submitButton)

  const errorAlert = await findByRole('alert')
  expect(errorAlert).toHaveTextContent(errMsg)
  expect(submitButton).not.toBeDisabled()
})
