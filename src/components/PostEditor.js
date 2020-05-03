import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { savePost } from '../utils/api'

const PostEditor = ({ user }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSaving(true)

    const { title, content, tags } = e.target.elements

    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id,
      date: new Date().toISOString(),
    }
    try {
      await savePost(newPost)
    } catch (errRes) {
      setError(errRes.data.error)
      return setIsSaving(false)
    }

    return setShouldRedirect(true)
  }

  if (shouldRedirect) return <Redirect to="/" />

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        Title
        <input id="title" name="title" />
      </label>

      <label htmlFor="content">
        Content
        <textarea id="content" name="content" />
      </label>

      <label htmlFor="tags">
        Tags
        <input id="tags" name="tags" />
      </label>

      <button type="submit" disabled={isSaving}>
        Submit
      </button>

      {error && <div role="alert">{error}</div>}
    </form>
  )
}

PostEditor.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostEditor
