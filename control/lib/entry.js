import React from 'react'
import ClassicControl from './components/ClassicControl'
import Hub from './Hub'

const hub = Hub(':3000')//Hub('http://localhost:3000')

React.render(<ClassicControl actions={hub.actions}/>, document.body)