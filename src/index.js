import React from 'react';
import ReactDom from 'react-dom'
import { hot } from 'react-hot-loader'
import Routes from './router'

const App = () => ReactDom.render(
  Routes, document.getElementById('root')
)

export default hot(module)(App)