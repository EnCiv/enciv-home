import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import CloseX from './close-x'
import { brevoGlassSurfaceStyles } from './brevo-join'

const SEENTIME = 10000

export default function BrevoCommunity(props) {
  const { location } = props
  const communityStatus = location?.includes('community=submitted')
    ? 'submitted'
    : location?.includes('community=confirmed')
    ? 'confirmed'
    : ''
  const classes = useStylesFromThemeFunction()
  const [seen, setSeen] = useState('')
  if (!communityStatus) {
    if (seen) setSeen('')
    return null // don't render anything
  } else if (communityStatus === 'submitted') {
    if (typeof window !== 'undefined') {
      setTimeout(() => setSeen('submitted'), SEENTIME)
    }
    return (
      seen !== 'submitted' && (
        <div className={classes.brevoCommnity} role="status">
          <CloseX
            title={'close message'}
            onClick={() => {
              setSeen('submitted')
            }}
          />
          <h2>Please confirm your subscription.</h2>
          <p>
            Thank you for joining the community. Your email needs to be confirmed to complete the subscription process.
          </p>
          <p>Please click on the link in the email we sent you.</p>
          <p>You won't be subscribed if you don't click on the confirmation link.</p>
        </div>
      )
    )
  } else if (communityStatus === 'confirmed') {
    if (typeof window !== 'undefined') setTimeout(() => setSeen('confirmed'), SEENTIME)
    return (
      seen !== 'confirmed' && (
        <div className={classes.brevoCommnity} role="status">
          <CloseX
            title={'close message'}
            onClick={() => {
              setSeen('confirmed')
            }}
          />
          <h2>Welcome!</h2>
          <p>Thank you for joining the community. Your email address has been confirmed</p>
        </div>
      )
    )
  } else return null
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  brevoCommnity: {
    ...brevoGlassSurfaceStyles,
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontSize: '1rem',
    position: 'absolute',
    width: 'calc(100% - 2rem)',
    maxWidth: '33.75rem',
    boxSizing: 'border-box',
    zIndex: 1,
    color: '#343433',
    left: '50%',
    top: '1.5rem',
    transform: 'translateX(-50%)',
    padding: '2rem',
    textAlign: 'left',
    '& h2': {
      fontFamily: 'Newsreader, serif',
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.15,
      color: '#343433',
      margin: '0 2rem 0.75rem 0',
    },
    '& p': {
      margin: '0 0 0.75rem',
      color: '#5d5d5c',
      fontSize: '1rem',
      lineHeight: 1.6,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '@media (max-width: 38rem)': {
      top: '1rem',
      padding: '1.5rem',
    },
  },
}))
