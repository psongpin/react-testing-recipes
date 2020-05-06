import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>This is Home page</p>
  </div>
)

const About = () => (
  <div>
    <h1>About</h1>
    <p>This is About page</p>
  </div>
)

const NoMatch = () => (
  <div>
    <h1>404</h1>
    <p>No match</p>
  </div>
)

const Routes = () => {
  return (
    <div>
      <Link to="/" data-testid="home">
        Home
      </Link>
      <Link to="/about" data-testid="about">
        About
      </Link>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default Routes
