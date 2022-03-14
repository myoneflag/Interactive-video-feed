import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { VideoFeed } from './pages'
import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={VideoFeed} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
