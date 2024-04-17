'use strict'

import React from 'react'
import { hot } from 'react-hot-loader'
import WebComponents from '../web-components'
import Footer from './footer'
import { ErrorBoundary } from 'civil-client'
import { ThemeProvider } from 'react-jss'
import { Helmet } from 'react-helmet'
import { theme } from 'civil-pursuit'

class App extends React.Component {
  render() {
    if (this.props.iota) {
      var { iota, ...newProps } = this.props
      Object.assign(newProps, this.props.iota)
      return (
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <div style={{ position: 'relative' }}>
              <Helmet>
                <title>{iota?.subject || 'Candiate Conversations'}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                  href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                  rel="stylesheet"
                />
                <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
              </Helmet>
              <WebComponents key="web-component" webComponent={this.props.iota.webComponent} {...newProps} />
              <Footer key="footer" />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      )
    } else
      return (
        <ErrorBoundary>
          <div style={{ position: 'relative' }}>
            <div>Nothing Here</div>
            <Footer />
          </div>
        </ErrorBoundary>
      )
  }
}

export default hot(module)(App)
