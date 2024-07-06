//https://github.com/EnCiv/enciv-home/issues/20
import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import TextareaAutosize from 'react-textarea-autosize'
import cx from 'classnames'
import { Components } from 'civil-pursuit'
const Submit = Components.ModifierButton

const placeHoderMessage = 'Have a question? Ask away....'
const emailMessage = 'Want a reply? Leave your email.'
export default function HaveAQuestion(props) {
  const [message, setMessage] = useState('')
  const classes = useStyles()
  const [askEmail, setAskEmail] = useState(false)
  const [response, setResponse] = useState(null)
  const [responseMessage, setResponseMessage] = useState(true)
  const [submittedQuestion, setSubmittedQuestion] = useState(true)
  const [email, setEmail] = useState('')

  const { className, style } = props

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      console.log(e)
      setAskEmail(true)
      e.preventDefault()
    }
  }
  const handelInput = e => {
    setMessage(e.target.value)
    setAskEmail(true)
  }

  const handleKeyPress2 = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  const handelInput2 = e => {
    setEmail(e.target.value)
  }

  const contactUs = e => {
    let fname = ''
    let lname = ''
    let subject = 'Have A Question'

    window.socket.emit('send-contact-us', email, fname, lname, subject, message, response => {
      if (response && response.error) {
        let { error } = response
        setResponse(error)
      } else {
        setResponse('Your question was sucessfully submitted!')
      }

      setSubmittedQuestion(false)
      setResponseMessage(false)
      setAskEmail(false)
    })
  }
  return (
    <div className={cx(className, classes.container)} style={style}>
      <TextareaAutosize
        className={cx(responseMessage && classes.input, !responseMessage && classes.disabled)}
        placeholder={placeHoderMessage}
        onBlur={handelInput}
        onKeyDown={handleKeyPress}
      />
      <TextareaAutosize
        onBlur={handelInput2}
        onKeyDown={handleKeyPress2}
        className={cx(!askEmail && classes.disabled, !responseMessage && classes.disabled, askEmail && classes.input)}
        placeholder={emailMessage}
      ></TextareaAutosize>
      <Submit
        className={cx(
          !askEmail && classes.disabled,
          !responseMessage && classes.disabled,
          askEmail && classes.askQuestion
        )}
        onDone={contactUs}
        children={'Submit'}
      />
      <TextareaAutosize
        className={cx(submittedQuestion && classes.disabled, !submittedQuestion && classes.input)}
        defaultValue={message}
      ></TextareaAutosize>
      <div
        className={cx(
          responseMessage && classes.disabled,
          submittedQuestion && classes.disabled,
          !responseMessage && classes.response
        )}
      >
        {response}
      </div>
    </div>
  )
}

const useStyles = createUseStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '0 auto',
  },

  input: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: '1.5rem',
    resize: 'none',
    border: 'none',
    borderRadius: theme.defaultBorderRadius,
    marginBottom: '0.3rem',
    marginTop: '0.3rem',
    overflow: 'hidden',
    fontWeight: 500,
    padding: '0.9375rem 0rem',
    borderTop: 'none',
    borderBottom: '2px solid',
    borderRadius: '0rem',
    '&::-webkit-input-placeholder': {
      color: 'white',
    },
    '&:focus-visible': {
      outline: '-webkit-focus-ring-color auto 0px;',
    },
  },
  emailMessage: {
    placeholder: 'block',
  },
  disabled: {
    display: 'none',
  },
  askQuestion: {
    display: 'flex',
    width: 'fit-content',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.colors.darkModeGray,
    gap: '0.5rem',
    backgroundColor: theme.colors.encivYellow,
    borderRadius: '1.75rem',
    fontSize: '1.25rem',
    fontWeight: '700',
    marginTop: '0.3rem',
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
    '&:focus': {
      outline: theme.focusOutline,
    },
  },

  response: {
    fontFamily: 'Montserrat',
    fontSize: '1.25rem',
    marginTop: '0.3rem',
    padding: '1.25rem',
    border: '0.3rem solid #0088dd',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
