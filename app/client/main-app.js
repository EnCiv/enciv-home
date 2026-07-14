'use strict'

import React from 'react'
import { clientMain } from 'civil-client'
import { JssProvider } from 'react-jss'
import App from '../components/app'

// Mirror createStableGenerateId from civil-server's server-react-render.js so
// SSR and client produce identical JSS class names (e.g. "topNavBar-1").
// Without this React 19 logs hard hydration errors about mismatched className.
let _jssCounter = 0
const generateId = (rule, sheet) => {
  const prefix = (sheet && sheet.options && sheet.options.classNamePrefix) || ''
  return `${prefix}${rule.key}-${_jssCounter++}`
}

function AppWithJss(props) {
  return (
    <JssProvider generateId={generateId}>
      <App {...props} />
    </JssProvider>
  )
}

clientMain(AppWithJss)
