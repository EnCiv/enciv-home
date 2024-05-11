import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

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
    if (typeof window !== 'undefined') setTimeout(() => setSeen('submitted'), SEENTIME)
    return (
      seen !== 'submitted' && (
        <div className={classes.brevoCommnity}>
          <div
            className={classes.close}
            title={'close message'}
            onClick={() => {
              setSeen('submitted')
            }}
          >
            {'\u2715'}
          </div>
          <h2>Please confirm your subscription</h2>
          <p>
            Thank you for joining the community. Your email needs to be comfirmed to complete the subscription process.
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
        <div className={classes.brevoCommnity}>
          <div
            className={classes.close}
            title={'close message'}
            onClick={() => {
              setSeen('confirmed')
            }}
          >
            {'\u2715'}
          </div>
          <h2>Welcome!</h2>
          <p>Thank you for joining the community. Your email address has been confirmed</p>
        </div>
      )
    )
  } else return null
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  brevoCommnity: {
    fontSize: '1.25rem',
    position: 'absolute',
    width: '50%',
    zIndex: 1,
    background: 'white',
    color: 'black',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '2rem',
    border: '0.25rem solid black',
    borderRadius: '1rem',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    paddingRight: '.75rem',
    paddingTop: '.25rem',
    cursor: 'pointer',
    top: 0,
    right: 0,
    '&:hover': {
      fontWeight: '900',
    },
  },
}))
