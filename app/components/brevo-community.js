import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import CloseX from './close-x'

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
        <div className={classes.brevoCommnity}>
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
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
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
}))
