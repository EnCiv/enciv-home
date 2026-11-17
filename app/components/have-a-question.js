//https://github.com/EnCiv/enciv-home/issues/20
import React, { useId, useState } from 'react'
import { createUseStyles } from 'react-jss'
import TextareaAutosize from 'react-textarea-autosize'
import cx from 'classnames'
import { breakpoints } from '../theme'
import { Components } from 'civil-pursuit'
const Submit = Components.ModifierButton

const placeholderMessage = 'Ask away...'
const emailMessage = 'Want a reply? Leave your email.'
export default function HaveAQuestion(props) {
  const [message, setMessage] = useState('')
  const classes = useStyles()
  const [askEmail, setAskEmail] = useState(false)
  const [response, setResponse] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const { className, style, mode = 'dark' } = props
  const questionId = `question-${useId().replace(/:/g, '')}`

  const handleMessageChange = e => {
    const nextMessage = e.target.value
    setMessage(nextMessage)
    setAskEmail(Boolean(nextMessage.trim()))
    setResponse(null)
  }

  const contactUs = () => {
    window.socket.emit('send-contact-us', email, '', '', 'Have A Question', message, result => {
      if (result?.error) {
        setResponse(result.error)
        return
      }
      setResponse('Your question was successfully submitted!')
      setIsSubmitted(true)
    })
  }

  return (
    <div className={cx(className, classes[mode], classes.container)} style={style}>
      <h3 className={classes.heading}>Have a question?</h3>
      {isSubmitted ? (
        <p className={classes.success} role="status">
          {response}
        </p>
      ) : (
        <>
          <TextareaAutosize
            id={questionId}
            className={cx(classes.field, classes[`${mode}Field`])}
            minRows={2}
            maxRows={6}
            value={message}
            placeholder={placeholderMessage}
            aria-label="Your question"
            onChange={handleMessageChange}
          />
          <div className={cx(classes.followUp, askEmail && classes.followUpOpen)} aria-hidden={!askEmail} inert={!askEmail}>
            <div className={classes.followUpInner}>
              <input
                className={cx(classes.field, classes.emailField, classes[`${mode}Field`])}
                type="email"
                value={email}
                placeholder={emailMessage}
                aria-label="Email address for a reply"
                onChange={e => setEmail(e.target.value)}
              />
              <Submit className={classes.askQuestion} onDone={contactUs} children="Submit" />
            </div>
          </div>
          {response && (
            <p className={classes.response} role="alert">
              {response}
            </p>
          )}
        </>
      )}
    </div>
  )
}

const useStyles = createUseStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: breakpoints.tablet,
    gap: '0.875rem',
    margin: '2rem auto 0',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(64, 54, 46, 0.18)',
    boxSizing: 'border-box',
  },
  heading: {
    margin: 0,
    color: theme.colors.textBrown,
    fontFamily: 'Newsreader, serif',
    fontSize: '2rem',
    fontWeight: 400,
    lineHeight: 1.2,
  },
  field: {
    display: 'block',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    border: '1px solid rgba(64, 54, 46, 0.2)',
    borderRadius: '0.5rem',
    padding: '0.875rem 1rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.5,
    fontWeight: 400,
    resize: 'none',
    overflow: 'hidden',
    transition: 'border-color 180ms ease, box-shadow 180ms ease',
    '&:focus-visible': {
      outline: 'none',
      borderColor: theme.colors.encivYellow,
      boxShadow: `0 0 0 0.125rem ${theme.colors.encivYellow}`,
    },
    '&::placeholder': {
      opacity: 0.72,
    },
  },
  emailField: {
    fontSize: '0.9375rem',
  },
  followUp: {
    display: 'grid',
    gridTemplateRows: '0fr',
    opacity: 0,
    transform: 'translateY(-0.5rem)',
    transition: 'grid-template-rows 350ms ease, opacity 250ms ease, transform 350ms ease',
  },
  followUpOpen: {
    gridTemplateRows: '1fr',
    opacity: 1,
    transform: 'translateY(0)',
  },
  followUpInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',
    minHeight: 0,
    overflow: 'hidden',
  },
  lightField: {
    backgroundColor: '#fff',
    color: theme.colors.darkModeGray,
    '&::placeholder': {
      color: theme.colors.darkModeGray,
    },
  },
  darkField: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.24)',
    color: 'white',
    '&::placeholder': {
      color: 'white',
    },
  },
  askQuestion: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    textDecoration: 'none',
    color: theme.colors.darkModeGray,
    backgroundColor: theme.colors.encivYellow,
    borderRadius: '1.75rem',
    fontSize: '1rem',
    fontWeight: 700,
    padding: '0.75rem 1.25rem',
    marginTop: '0.25rem',
    '&:hover, &.hover': {
      textDecoration: 'none',
      backgroundColor: theme.colors.encivYellow,
      borderColor: theme.colors.encivYellow,
      cursor: 'pointer',
    },
    '&:active': {
      backgroundColor: theme.colors.encivYellow,
      color: theme.colors.textBrown,
      border: '0.125rem solid '.concat(theme.colors.encivYellow),
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: theme.focusOutline,
    },
  },
  success: {
    margin: 0,
    color: theme.colors.textBrown,
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  response: {
    margin: 0,
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9375rem',
    lineHeight: 1.5,
    color: '#9b3328',
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: 'transparent',
    color: theme.colors.darkModeGray,
  },
  [`@media (max-width: ${breakpoints.tablet})`]: {
    container: {
      marginTop: '1.5rem',
      paddingTop: '1rem',
    },
    heading: {
      fontSize: '1.625rem',
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    followUp: {
      transition: 'none',
      transform: 'none',
    },
  },
}))
