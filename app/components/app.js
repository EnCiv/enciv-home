import React from 'react'
import { hot } from 'react-hot-loader'
import WebComponents from '../web-components'
import Footer from './footer'
import { ErrorBoundary } from 'civil-client'
import { ThemeProvider, createUseStyles } from 'react-jss'
import { Helmet } from 'react-helmet'
import { theme, Components } from 'civil-pursuit'
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
                <title>{iota?.subject || 'EnCiv'}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                  href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                  rel="stylesheet"
                />
                <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
              </Helmet>
              <TopNavWrap />
              <WebComponents key="web-component" webComponent={this.props.iota.webComponent} {...newProps} />
              <Components.Footer mode="dark" key="footer" />
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

function TopNavWrap(props) {
  const classes = useStylesFromThemeFunction()
  return (
    <Components.TopNavBar
      className={classes.menuButtonColorFix}
      mode={'dark'}
      menu={[
        {
          name: 'Home',
          func: () => {
            window.location.href = '/home'
          },
        },
        [
          {
            name: 'About',
            func: () => {
              window.location.href = '/about'
            },
          },
          {
            name: 'About Us',
            func: () => {
              window.location.href = '/about'
            },
          },
          {
            name: 'IRS Forms',
            func: () => {
              window.location.href = '/irs-forms'
            },
          },
        ],
        {
          name: 'Our Tools',
          func: () => (window.location.href = '/our-tools'),
        },
        {
          name: 'Blog',
          func: () => {
            window.location.href = 'https://enciv.org/articles/'
          },
        },
      ]}
    />
  )
}

const useStylesFromThemeFunction = createUseStyles({
  menuButtonColorFix: {
    '& button': {
      color: 'white!important',
    },
  },
})

export default hot(module)(App)
