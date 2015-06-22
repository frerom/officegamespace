import React from 'react'
import Main from './main'
import Hub from './Hub'

const hub = Hub('localhost:3000')

React.render(<Main hub={hub} />, document.body)