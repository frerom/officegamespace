import React from 'react'
import ClassicControl from './components/ClassicControl'
import Hub from './Hub'

const hub = Hub()

React.render(<ClassicControl actions={hub.actions}/>, document.body)