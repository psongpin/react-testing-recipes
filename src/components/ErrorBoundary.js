import React from 'react'
import PropTypes from 'prop-types'
import { reportError } from '../utils/api'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    reportError(error, info)
  }

  tryAgain = () => this.setState({ hasError: false })

  render() {
    const { hasError } = this.state
    const { children } = this.props
    return hasError ? (
      <div>
        <div role="alert">There was a problem. </div>
        <button type="button" onClick={this.tryAgain}>
          Try again?
        </button>
      </div>
    ) : (
      children
    )
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
