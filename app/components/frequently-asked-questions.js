//https://github.com/EnCiv/enciv-home/issues/20
import React, { useEffect, useId, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import { breakpoints } from '../theme'
import HaveAQuestion from './have-a-question'

export default function FrequentlyAskedQuestions(props) {
  const [active, setActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { className, faqs, mode = 'dark', ...otherProps } = props
  const faqId = useId().replace(/:/g, '')
  const sectionRef = useRef(null)
  const classes = useStyles({ mode, isVisible })

  useEffect(() => {
    if (!sectionRef.current) return
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cx(classes.faq, classes[mode], className)}
      aria-labelledby={`faq-title-${faqId}`}
      {...otherProps}
    >
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          <h2 className={classes.headerStyle} id={`faq-title-${faqId}`}>
            Frequently Asked Questions
          </h2>
          {faqs?.map((value, index) => {
            const isOpen = active === index
            const answerId = `faq-answer-${faqId}-${index}`
            return (
              <article
                className={cx(classes.questionWrapper, isOpen && classes.questionActive)}
                key={value.question}
                style={{ '--faq-delay': isVisible ? `${index * 100}ms` : '0ms' }}
              >
                <button
                  className={classes.questionLine}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setActive(isOpen ? false : index)}
                >
                  <span className={classes.questionStyle}>{value.question}</span>
                  <span className={classes.toggleIcon} aria-hidden="true">
                    {isOpen ? '-' : '+'}
                  </span>
                </button>
                <div
                  className={cx(classes.answerPanel, isOpen && classes.answerOpen)}
                  id={answerId}
                  aria-hidden={!isOpen}
                >
                  <div className={classes.answerContent}>
                    <p className={classes.answerStyle}>{value.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
          <HaveAQuestion mode={mode} />
        </div>
      </div>
    </section>
  )
}

const useStyles = createUseStyles(theme => ({
  faq: {
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    padding: '6rem 2rem 7rem',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '4rem 1.5rem 5rem',
    },
  },
  wrapper: {
    maxWidth: '72.8rem',
    margin: '0 auto',
  },
  innerWrapper: {
    width: '100%',
  },
  headerStyle: props => ({
    fontFamily: 'Newsreader, serif',
    textAlign: 'center',
    color: props.mode === 'dark' ? '#fff' : theme.colors.textBrown,
    fontSize: '3.4375rem',
    fontWeight: 400,
    lineHeight: 1.1,
    margin: '0 0 3.5rem',
    opacity: props.isVisible ? 1 : 0,
    transition: 'opacity 650ms ease',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      fontSize: '2.5rem',
      marginBottom: '2.5rem',
    },
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      transition: 'none',
    },
  }),
  answerStyle: {
    fontFamily: 'Inter, sans-serif',
    whiteSpace: 'pre-wrap',
    fontWeight: 400,
    fontSize: '1.125rem',
    lineHeight: 1.7,
    margin: 0,
  },
  questionWrapper: props => ({
    backgroundColor: '#fff',
    border: '1px solid rgba(64, 54, 46, 0.12)',
    borderRadius: '0.5rem',
    boxShadow: '0 0.25rem 1rem rgba(42, 34, 27, 0.06)',
    marginBottom: '0.875rem',
    overflow: 'hidden',
    opacity: props.isVisible ? 1 : 0,
    transform: props.isVisible ? 'translateX(0)' : 'translateX(-1.25rem)',
    transition:
      'opacity 500ms ease var(--faq-delay, 0ms), transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1) var(--faq-delay, 0ms), box-shadow 250ms ease, border-color 250ms ease',
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    },
  }),
  questionActive: {
    borderColor: 'rgba(190, 132, 28, 0.42)',
    boxShadow: '0 0.75rem 1.75rem rgba(42, 34, 27, 0.12)',
  },
  questionLine: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.375rem 1.5rem',
    border: 0,
    background: 'transparent',
    color: theme.colors.textBrown,
    textAlign: 'left',
    cursor: 'pointer',
    '&:focus-visible': {
      outline: `0.125rem solid ${theme.colors.encivYellow}`,
      outlineOffset: '-0.25rem',
    },
    '&:hover $questionStyle': {
      color: '#9a6412',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '1.125rem 1rem',
    },
  },
  questionStyle: {
    fontFamily: 'Newsreader, serif',
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.3,
    transition: 'color 200ms ease',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      fontSize: '1.25rem',
    },
  },
  toggleIcon: {
    display: 'grid',
    placeItems: 'center',
    flex: '0 0 2.25rem',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: '50%',
    backgroundColor: theme.colors.encivYellow,
    color: theme.colors.darkModeGray,
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.5rem',
    lineHeight: 1,
    fontWeight: 400,
  },
  answerPanel: {
    display: 'grid',
    gridTemplateRows: '0fr',
    opacity: 0,
    transition: 'grid-template-rows 350ms ease, opacity 250ms ease',
  },
  answerOpen: {
    gridTemplateRows: '1fr',
    opacity: 1,
  },
  answerContent: {
    minHeight: 0,
    overflow: 'hidden',
    padding: '0 1.5rem',
    '$answerOpen &': {
      paddingBottom: '1.5rem',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: '#f2f0ed',
    color: theme.colors.darkModeGray,
  },
  '@media (prefers-reduced-motion: reduce)': {
    questionStyle: { transition: 'none' },
    answerPanel: { transition: 'none' },
  },
}))
