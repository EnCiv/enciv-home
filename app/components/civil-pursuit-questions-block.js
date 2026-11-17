// https://github.com/EnCiv/enciv-home/issues/80
import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import Block from './block'
import CivilPursuitQuestion from './civil-pursuit-question'

const GET_ERROR_MSG = 'Nothing available at this time'

export default function CivilPursuitQuestionsBlock(props) {
  const {
    className,
    mode = 'dark',
    subject = '',
    description = '',
    imageUrl = '/assets/images/home-national-deliberations.png',
    variant = 'default',
    ...otherProps
  } = props
  const [questions, setQuestions] = useState(undefined)
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const [isImageVisible, setIsImageVisible] = useState(false)
  const subjectCharacterCount = Math.max(Array.from(subject).length, 1)
  const subjectRevealDuration = Math.min(2.4, Math.max(0.9, subjectCharacterCount * 0.03))
  const classes = useStylesFromThemeFunction({
    variant,
    isVisible,
    subjectCharacterCount,
    subjectRevealDuration,
  })

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

  useEffect(() => {
    if (variant !== 'homepage' || !contentRef.current) return
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
      { threshold: 0.15 }
    )
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [variant])

  useEffect(() => {
    if (variant !== 'homepage' || !imageRef.current) return
    if (!('IntersectionObserver' in window)) {
      setIsImageVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [variant])

  return (
    <Block mode={mode} className={cx(variant === 'homepage' && classes.homepageBlock, className)} {...otherProps}>
      <div ref={contentRef} className={classes.civilPursuitQuestionsBlock}>
        {subject && <h2 className={classes.subject}>{subject}</h2>}
        {variant === 'homepage' && (
          <div
            ref={imageRef}
            className={cx(classes.homepageImageFrame, isImageVisible && classes.homepageImageVisible)}
          >
            <img
              className={classes.homepageImage}
              src={imageUrl}
              alt="Crowd gathered on the National Mall for the 1963 March on Washington"
              loading="lazy"
            />
          </div>
        )}
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
  homepageBlock: {
    backgroundColor: '#E4E6E3',
    borderBottom: '0.375rem solid #fff',
  },
  civilPursuitQuestionsBlock: props => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
    ...(props.variant === 'homepage'
      ? {
          textAlign: 'left',
          paddingTop: '2rem',
          opacity: props.isVisible ? 1 : 0,
          transform: props.isVisible ? 'translateY(0)' : 'translateY(1.5rem)',
          transition: 'opacity 650ms ease, transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          '@media (max-width: 48rem)': {
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
          },
          '@media (prefers-reduced-motion: reduce)': {
            opacity: 1,
            transform: 'none',
            transition: 'none',
          },
        }
      : {}),
  }),
  homepageImageFrame: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    aspectRatio: '16 / 9',
    opacity: 0,
    transform: 'translateY(1.5rem)',
    transition: 'opacity 650ms ease, transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1)',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      boxShadow: 'inset 0 0 0.75rem rgba(0, 0, 0, 0.12)',
      transition: 'box-shadow 350ms ease',
    },
    '&:hover img, &:focus-within img': {
      transform: 'scale(1.06)',
    },
    '&:hover::after, &:focus-within::after': {
      boxShadow: 'inset 0 0 1.5rem rgba(0, 0, 0, 0.24)',
    },
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      transition: 'none',
      '& img, &:hover img, &:focus-within img': {
        transform: 'none',
        transition: 'none',
      },
      '&::after': {
        transition: 'none',
      },
    },
  },
  homepageImageVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  homepageImage: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
  },
  subject: props => ({
    fontSize: '3rem',
    fontFamily: 'Newsreader, serif',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '3.6875rem',
    marginTop: 0,
    marginBottom: '1rem',
    ...(props.variant === 'homepage'
      ? {
          color: '#4A463F',
          textAlign: 'center',
          fontSize: '3.4375rem',
          fontWeight: 400,
          lineHeight: 1.1,
          marginBottom: '1rem',
          opacity: props.isVisible ? 1 : 0,
          clipPath: props.isVisible ? 'inset(0)' : 'none',
          animation: props.isVisible
            ? `$nationalTitleFade 600ms ease-out both, $nationalTitleType ${props.subjectRevealDuration}s steps(${props.subjectCharacterCount}, end) both`
            : 'none',
          '@media (prefers-reduced-motion: reduce)': {
            opacity: 1,
            clipPath: 'none',
            animation: 'none',
          },
        }
      : {}),
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      textAlign: 'center',
    },
    ...(props.variant === 'homepage'
      ? {
          '@media (max-width: 48rem)': {
            fontSize: '2.5rem',
            marginBottom: '2rem',
          },
        }
      : {}),
  }),
  description: props => ({
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
    ...(props.variant === 'homepage'
      ? {
          color: '#4A463F',
          fontSize: '1.375rem',
          lineHeight: 1.6,
          maxWidth: '72.8rem',
          margin: '0 0 1rem',
        }
      : {}),
  }),
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
  '@keyframes nationalTitleFade': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes nationalTitleType': {
    from: { clipPath: 'inset(0 100% 0 0)' },
    to: { clipPath: 'inset(0)' },
  },
}))
