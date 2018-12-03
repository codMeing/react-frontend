import React from 'react'
import { LocaleProvider } from 'antd'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '@/stores'
const stores = createStore(reducers)

export default class Route extends React.Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        {/*<Provider store={stores}>*/}
        <Provider>
          <Router>
            <Switch>
              {/*<Route path="/home" component={Home}/>*/}
            </Switch>
          </Router>
        </Provider>
      </LocaleProvider>
    )
  }
}