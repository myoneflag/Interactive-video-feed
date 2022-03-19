import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { VideoFeed } from './pages'
import Div100vh from 'react-div-100vh'
import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const App = () => {
  return (
    <Div100vh>
      <Router>
        <Switch>
          <Route exact path="/" component={VideoFeed} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Div100vh>
  )
}

export default App
