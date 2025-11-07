// https://github.com/EnCiv/enciv-home/issues/80
import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import Block from './block'
import CivilPursuitQuestion from './civil-pursuit-question'
import { MarkdownWithImage } from './markdown-block'

const GET_ERROR_MSG = 'Nothing available at this time'

export default function CivilPursuitQuestionsBlock(props) {
  const { className, mode = 'dark', subject = '', description = '', ...otherProps } = props
  const classes = useStylesFromThemeFunction()
  const [questions, setQuestions] = useState(undefined)

  useEffect(() => {
    // Fetch questions from socket API
    if (typeof window !== 'undefined' && window.socket) {
      window.socket.emit('get-civil-pursuit-questions', response => {
        if (response && Array.isArray(response)) {
          setQuestions(response)
        } else setQuestions(GET_ERROR_MSG)
      })
    }
  }, [])

  return (
    <Block mode={mode} className={className} {...otherProps}>
      <div className={classes.civilPursuitQuestionsBlock}>
        {subject && <h2 className={classes.subject}>{subject}</h2>}
        {description && <div className={classes.description}>{description}</div>}
        {!questions ? (
          <div className={classes.loading}>Loading ...</div>
        ) : questions === GET_ERROR_MSG ? (
          <div className={classes.empty}>{GET_ERROR_MSG}</div>
        ) : questions.length === 0 ? (
          <div className={classes.empty}>Nothing available at this time</div>
        ) : (
          questions.map(question => (
            <CivilPursuitQuestion
              key={question._id}
              subject={question.subject}
              path={question.path}
              mode={mode}
              className={classes.question}
            />
          ))
        )}
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
    marginBottom: '1rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      textAlign: 'center',
    },
  },
  description: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    leadingTrim: 'both',
    textEdge: 'cap',
    textAlign: 'left',
    whiteSpace: 'pre-line',
    marginBottom: '2rem',
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
