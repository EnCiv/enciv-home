import React from 'react'
import WebComponents from '../web-components'
import Footer from './footer'
import { ErrorBoundary } from 'civil-client'
import { ThemeProvider, createUseStyles } from 'react-jss'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { theme, Components } from 'civil-pursuit'
import EncivCookies from 'civil-server/dist/components/enciv-cookies'
class App extends React.Component {
  render() {
    if (this.props.iota) {
      var { iota, ...newProps } = this.props
      Object.assign(newProps, this.props.iota)
      return (
        <ErrorBoundary>
          <HelmetProvider>
            <ThemeProvider theme={theme}>
              <div style={{ position: 'relative', fontFamily: 'Inter, sans-serif' }}>
                <Helmet>
                  <title>{iota?.subject || 'EnCiv'}</title>
                  <meta name="description" content={iota?.description} />
                  <meta name="msvalidate.01" content="70F4BC88262B070FE024C570CD828D3C" />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                  <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Newsreader:opsz,wght@6..72,400..800&display=swap"
                    rel="stylesheet"
                  />
                </Helmet>
                <TopNavWrap {...this.props} />
                <WebComponents key="web-component" webComponent={this.props.iota.webComponent} {...newProps} />
                <EncivCookies user={newProps.user} cookieCategories={newProps.cookieCategories} />
                <Components.Footer mode="dark" key="footer" />
              </div>
            </ThemeProvider>
          </HelmetProvider>
        </ErrorBoundary>
      )
    } else
      return (
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <div style={{ position: 'relative', fontFamily: 'Inter, sans-serif' }}>
              <div>Nothing Here</div>
              <Footer />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      )
  }
}

function TopNavWrap(props) {
  const navigate = path => {
    if (props.onNavigate) props.onNavigate(path)
    else window.location.href = path
  }
  const menu = [
    {
      name: 'Home',
      func: () => {
        navigate('/')
      },
    },
    [
      {
        name: 'About',
        func: () => {}, // this will get called in mobile mode when user clicks to expand the about selection - don't do anything
      },
      {
        name: 'Our Mission',
        func: () => {
          navigate('/about')
        },
      },
      {
        name: 'IRS Forms',
        func: () => {
          navigate('/irs-forms')
        },
      },
    ],
    {
      name: 'Our Tools',
      func: () => navigate('/our-tools'),
    },
    {
      name: 'Articles',
      func: () => {
        navigate('/articles')
      },
    },
  ]
  if (props?.user?.id)
    menu.push([
      { name: 'My Account', func: () => {} },
      { name: 'Profile', func: () => navigate('/profile') },
      { name: 'Logout', func: () => navigate('/sign/out') },
    ])
  return <Components.TopNavBar mode={'dark'} menu={menu} />
}

export default App
