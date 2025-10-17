// https://github.com/EnCiv/enciv-home/issues/80
import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import Block from './block'
import CivilPursuitQuestion from './civil-pursuit-question'

export default function CivilPursuitQuestionsBlock(props) {
  const { className, mode = 'dark', subject = '', ...otherProps } = props
  const classes = useStylesFromThemeFunction()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch questions from socket API
    if (typeof window !== 'undefined' && window.socket) {
      window.socket.emit('get-civil-pursuit-questions', response => {
        if (response && Array.isArray(response)) {
          setQuestions(response)
        }
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <Block mode={mode} className={className} {...otherProps}>
        <div className={classes.civilPursuitQuestionsBlock}>
          {subject && <h2 className={classes.subject}>{subject}</h2>}
          <div className={classes.loading}>Loading questions...</div>
        </div>
      </Block>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <Block mode={mode} className={className} {...otherProps}>
        <div className={classes.civilPursuitQuestionsBlock}>
          {subject && <h2 className={classes.subject}>{subject}</h2>}
          <div className={classes.empty}>No questions available at this time.</div>
        </div>
      </Block>
    )
  }

  return (
    <Block mode={mode} className={className} {...otherProps}>
      <div className={classes.civilPursuitQuestionsBlock}>
        {subject && <h2 className={classes.subject}>{subject}</h2>}
        {questions.map(question => (
          <CivilPursuitQuestion
            key={question._id}
            subject={question.subject || question.title || 'Untitled Question'}
            path={question.path || '#'}
            mode={mode}
            className={classes.question}
          />
        ))}
      </div>
    </Block>
  )
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  civilPursuitQuestionsBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    textAlign: 'center',
  },
  subject: {
    fontSize: '3rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '3.6875rem',
    marginTop: 0,
    marginBottom: '2rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      textAlign: 'center',
    },
  },
  question: {
    // Additional styling for individual questions within the block if needed
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.25rem',
    fontFamily: 'Inter, sans-serif',
    padding: '2rem',
  },
  empty: {
    textAlign: 'center',
    fontSize: '1.25rem',
    fontFamily: 'Inter, sans-serif',
    padding: '2rem',
    fontStyle: 'italic',
  },
}))
