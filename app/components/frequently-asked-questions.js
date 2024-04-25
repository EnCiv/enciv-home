import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

function Opener(props) {
  const { classes, answer, active } = props
  const pRef = useRef()
  return (
    <div
      style={{
        overflow: 'hidden',
        maxHeight: active ? (pRef.current.getBoundingClientRect().height || 0) + 'px' : '0px',
        transition: 'all 0.5s linear',
      }}
    >
      <p ref={pRef} className={classes.answerStyle}>
        {answer}
      </p>
    </div>
  )
}

export default function FrequentlyAskedQuestions(props) {
  const [active, setActive] = useState(false)
  const { className, faqs, mode = 'dark', ...otherProps } = props
  const classes = useStyles()

  return (
    <div className={cx(classes.faq, classes[mode], className)} {...otherProps}>
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          <h2 className={classes.headerStyle}>Frequently Asked Questions</h2>
          {faqs &&
            faqs.map(value => (
              <div>
                <div
                  className={classes.questionLine}
                  key={value.question}
                  onClick={() => {
                    active === value.question ? setActive(false) : setActive(value.question)
                  }}
                >
                  <h3 className={classes.questionStyle}>{value.question}</h3>
                  {active === value.question ? <p className={classes.caret}>^</p> : <p className={classes.caret}>v</p>}
                </div>
                <Opener classes={classes} answer={value.answer} active={active === value.question} />
                <hr></hr>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

const useStyles = createUseStyles(theme => ({
  faq: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    whiteSpace: 'pre-line',
    paddingTop: '4rem',
  },
  wrapper: {
    maxWidth: '72rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  innerWrapper: {
    marginLeft: '2rem',
    marginRight: '2rem',
  },
  caret: { display: 'flex', paddingRight: '2rem', cursor: 'pointer' },

  headerStyle: {
    textAlign: 'center',
    paddingTop: '1rem',
    fontSize: '3rem',
  },

  answerStyle: {
    fontFamily: 'Inter',
    whiteSpace: 'pre-wrap',
    paddingRight: '2rem',
    fontWeight: '500',
    fontSize: '1.5rem',
    paddingBottom: '1rem',
    margin: 0, // force 0 so opener height calculation is right
  },

  questionLine: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  questionStyle: {
    //fontWeight: '300',
    display: 'inline-block',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 500,
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: theme.colors.darkModeGray,
  },
}))