import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader'
import WebComponents from '../web-components'
import Footer from './footer'
import { ErrorBoundary } from 'civil-client'
import { ThemeProvider, createUseStyles } from 'react-jss'
import { Helmet } from 'react-helmet'
import { theme, Components } from 'civil-pursuit'
//import 'vanilla-cookieconsent/dist/cookieconsent.css' this doesn't work in our environment - in build.sh we copy the file into assets/css and then link to it below
import * as CookieConsent from 'vanilla-cookieconsent'

function App(props) {
  const { iota, ...newProps } = props
  useEffect(() => {
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true, // this category is enabled by default
          readOnly: true, // this category cannot be disabled
        },
        analytics: {},
      },
      onConsent: ({ changedCategories, changedServices }) => {
        if (changedCategories)
          for (const category of changedCategories) {
            switch (category) {
              case 'analytics':
                if (CookieConsent.acceptCategory(category)) {
                  if (process.env.GOOGLE_ANALYTICS) {
                    window.dataLayer = window.dataLayer || []
                    window.gtag = function () {
                      dataLayer.push(arguments)
                    }
                    gtag('js', new Date())
                    gtag('config', `${process.env.GOOGLE_ANALYTICS}`)
                    const script = document.createElement('script') // create a script DOM node
                    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`
                    script.id = 'googletagmanager' // so we can find it and delete it if needed
                    document.head.appendChild(script)
                  }
                } else {
                  delete window.dataLayer
                  delete window.gtag
                  const gtmElement = document.getElementById('googletagmanager')
                  if (gtmElement) gtmElement.remove()
                }
                break
            }
          }
      },
      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We use cookies',
              description: 'Cookie modal description',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage Individual preferences',
            },
            preferencesModal: {
              title: 'Manage cookie preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Accept current selection',
              closeIconLabel: 'Close modal',
              sections: [
                {
                  title: 'Somebody said ... cookies?',
                  description: 'I want one!',
                },
                {
                  title: 'Strictly Necessary cookies',
                  description:
                    'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                  //this field will generate a toggle linked to the 'necessary' category
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Performance and Analytics',
                  description:
                    'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'More information',
                  description:
                    'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
                },
              ],
            },
          },
        },
      },
    })
  }, [])
  if (iota) {
    Object.assign(newProps, iota)
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
              <link href="./assets/css/cookieconsent.css" rel="stylesheet" />
            </Helmet>
            <TopNavWrap />
            <WebComponents key="web-component" webComponent={iota.webComponent} {...newProps} />
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

function TopNavWrap(props) {
  return (
    <Components.TopNavBar
      mode={'dark'}
      menu={[
        {
          name: 'Home',
          func: () => {
            window.location.href = '/'
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
          name: 'Articles',
          func: () => {
            window.location.href = '/articles'
          },
        },
      ]}
    />
  )
}

export default hot(module)(App)
