import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import './style.less'
import bigImg from './imgs/big-test.png'
import smallImg from './imgs/small-test.png'

let html = <div className='wrapper'>
  <h1 className='test'>hello webpack!</h1>
  <span>16.4kb---</span><img src={bigImg} />
  <span>6.09kb---</span><img src={smallImg} />
</div>

ReactDom.render(
  <AppContainer>
    {html}
  </AppContainer>,
  document.getElementById('test')
)

// HMR 接口
if (module.hot) {
  // 实现热更新
  module.hot.accept()
}