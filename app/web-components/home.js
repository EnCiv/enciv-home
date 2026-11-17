import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import HeroBlock from '../components/hero-block'
import ActionButton from '../components/action-button'
import BrevoCommunity from '../components/brevo-community'
import CivilPursuitQuestionsBlock from '../components/civil-pursuit-questions-block'
import FrequentlyAskedQuestions from '../components/frequently-asked-questions'
import { BrevoHelmet } from '../components/brevo-join'
import { breakpoints } from '../theme'
import { getAnimatedHeadingStyles, getRevealTiming, titleRevealKeyframes, useRevealOnView } from '../components/animated-heading'

const concerns = [
  {
    text: 'We’re fed up with (and frankly scared of) the current political system',
    image: '/assets/images/home-concern-1.webp',
  },
  {
    text: 'Sick of partisan gridlock that stops real policy and productive discussion',
    image: '/assets/images/home-concern-2.webp',
  },
  {
    text: 'Done with the media that only presents the most viral candidate moments and polarized takes',
    image: '/assets/images/home-concern-3.webp',
  },
  {
    text: 'There is currently no cross-partisan discourse to address the biggest problems facing our country',
    image: '/assets/images/home-concern-4.webp',
  },
]

function AnimatedHeading({ as: Element = 'h2', className, children, ...otherProps }) {
  const { ref: headingRef, isVisible } = useRevealOnView()
  const headingClasses = useAnimatedHeadingStyles({ isVisible, ...getRevealTiming(children) })

  return (
    <Element ref={headingRef} className={cx(headingClasses.heading, className)} {...otherProps}>
      {children}
    </Element>
  )
}

function RevealImage({ className, src, alt = '' }) {
  const classes = useRevealImageStyles()
  const imageRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!imageRef.current) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
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
    observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={imageRef}
      className={cx(classes.imageFrame, className, { [classes.visible]: isVisible })}
    >
      <img className={classes.image} src={src} alt={alt} loading="lazy" />
    </div>
  )
}

export default function Home(props) {
  const { location, blocks } = props
  const classes = useStyles()
  const hero = blocks?.find(block => block.key === 'HeroBlock') || {}
  const deliberations = blocks?.find(block => block.key === 'CivilPursuitQuestionsBlock')
  const faq = blocks?.find(block => block.key === 'Faq')
  const { key: heroKey, ...heroProps } = hero
  const { key: deliberationsKey, ...deliberationsProps } = deliberations || {}
  const { key: faqKey, ...faqProps } = faq || {}

  return (
    <div className={classes.home}>
      <BrevoHelmet />
      <BrevoCommunity location={location} />
      <HeroBlock key={heroKey} {...heroProps} variant="homepage" />

      {deliberations && (
        <CivilPursuitQuestionsBlock key={deliberationsKey} {...deliberationsProps} variant="homepage" />
      )}

      <section className={classes.mission} aria-labelledby="home-mission-title">
        <div className={classes.missionInner}>
          <div className={classes.missionArtwork} aria-hidden="true">
            <svg className={classes.missionCircles} width="365" height="365" viewBox="0 0 365 365" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle opacity="0.1" cx="182.5" cy="182.5" r="181.34" fill="#FF9114" strokeWidth="2.32056" stroke="#FF9114" />
              <circle opacity="0.1" cx="183" cy="182.625" r="136.13" fill="#FF9114" strokeWidth="1.74042" stroke="#FF9114" />
              <circle opacity="0.2" cx="183" cy="182.63" r="107.169" fill="#FF9114" strokeWidth="2.61063" stroke="#FF9114" />
              <circle opacity="0.3" cx="183.375" cy="182.997" r="80.8349" fill="#FF9114" strokeWidth="3.48084" stroke="#FF9114" />
              <circle opacity="0.5" cx="183" cy="182.624" r="57.1884" fill="#FF9114" strokeWidth="3.48084" stroke="#FF9114" />
              <circle opacity="0.6" cx="183.375" cy="182.999" r="39.8628" fill="#FF9114" strokeWidth="4.35105" stroke="#FF9114" />
              <circle opacity="0.7" cx="183.375" cy="183" r="22.9127" fill="#FF9114" strokeWidth="5.22125" stroke="#FF9114" />
            </svg>
          </div>
          <div className={classes.missionCopy}>
            <AnimatedHeading className={classes.missionTitle} id="home-mission-title">
              Our Mission
            </AnimatedHeading>
            <p>
              We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the
              People out of the political process.
            </p>
            <p>
              EnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across
              the political spectrum to collaborate at scale to identify and address our toughest problems and drive
              tangible outcomes.
            </p>
            <ActionButton>Subscribe for free</ActionButton>
          </div>
        </div>
      </section>

      <section className={classes.speakSection} aria-labelledby="home-speak-title">
        <AnimatedHeading className={classes.speakTitle} id="home-speak-title">
          When we speak as One
        </AnimatedHeading>
        <div className={classes.concerns}>
          {concerns.map(({ text, image }) => (
            <article className={classes.concern} key={text}>
              <RevealImage className={classes.concernImage} src={image} />
              <div className={classes.concernRule} aria-hidden="true" />
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className={classes.rule} />
        <div className={classes.feature}>
          <RevealImage
            className={classes.featureImage}
            src="/assets/images/home-feature-65-percent.webp"
          />
          <div className={classes.featureCopy}>
            <AnimatedHeading as="h3" className={classes.featureTitle}>
              65% of our country believes the current system is on the wrong track.
            </AnimatedHeading>
            <div className={classes.shortRule} />
            <div className={classes.featureDescription}>
              <p>Together, we can fix it.</p>
              <p>
                To overcome the forces polarizing us, we must have national discussions that organize, rather than
                suppress, differing voices and delve into the value of these perspectives to find the awesome solutions
                that unite us.
              </p>
              <p>
                Join EnCiv to become part of a community of diverse, dedicated volunteers helping to foster this
                deliberation until politicians listen when we speak as one.
              </p>
            </div>
            <ActionButton>Join the community</ActionButton>
          </div>
        </div>
      </section>
      {faq && <FrequentlyAskedQuestions key={faqKey} {...faqProps} />}
    </div>
  )
}

const useStyles = createUseStyles({
  home: {
    backgroundColor: '#fff',
  },
  mission: {
    padding: '9rem 2rem',
    backgroundColor: '#fff',
    borderTop: '1px solid #e6e1d9',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '5rem 1.5rem',
    },
  },
  missionInner: {
    maxWidth: '72.8rem',
    minHeight: '22.8rem',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(18rem, 0.9fr) minmax(0, 1fr)',
    gap: '3rem',
    alignItems: 'center',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: '1fr',
      gap: '2.5rem',
    },
  },
  missionArtwork: {
    minHeight: '22rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      display: 'block',
      width: 'min(100%, 22.8125rem)',
      height: 'auto',
      aspectRatio: '1',
      overflow: 'visible',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      minHeight: '8rem',
    },
  },
  missionCircles: {
    '& circle': {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animation: '$circleWave 4s ease-in-out infinite',
    },
    '& circle:nth-child(6)': { animationDelay: '0.35s' },
    '& circle:nth-child(5)': { animationDelay: '0.7s' },
    '& circle:nth-child(4)': { animationDelay: '1.05s' },
    '& circle:nth-child(3)': { animationDelay: '1.4s' },
    '& circle:nth-child(2)': { animationDelay: '1.75s' },
    '& circle:nth-child(1)': { animationDelay: '2.1s' },
    '@media (prefers-reduced-motion: reduce)': {
      '& circle': {
        animation: 'none',
      },
    },
  },
  missionCopy: {
    color: '#80664a',
    textAlign: 'center',
    fontSize: '1.5rem',
    lineHeight: 1.5,
    '& p': {
      margin: '0 0 1.5rem',
    },
    '& p:last-of-type': {
      marginBottom: 0,
    },
    '& > button': {
      marginTop: '2rem',
    },
  },
  missionTitle: {
    fontFamily: 'Newsreader, serif',
    fontSize: '3.4375rem',
    lineHeight: 1.1,
    fontWeight: 400,
    margin: '0 0 2rem',
  },
  speakSection: {
    backgroundColor: '#fafaf9',
    padding: '5.25rem 2rem 8rem',
    borderTop: '1px solid #e6e1d9',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '4rem 1.5rem 5rem',
    },
  },
  speakTitle: {
    color: '#80664a',
    fontFamily: 'Newsreader, serif',
    fontSize: '3.4375rem',
    lineHeight: 1.1,
    fontWeight: 400,
    textAlign: 'center',
    margin: '0 auto 5.5rem',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      fontSize: '2.5rem',
      marginBottom: '3rem',
    },
  },
  concerns: {
    maxWidth: '77.75rem',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '2rem',
    [`@media (max-width: 64rem)`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '1.5rem',
    },
    [`@media (max-width: 36rem)`]: {
      gridTemplateColumns: '1fr',
    },
  },
  concern: {
    color: '#80664a',
    fontSize: '1.375rem',
    lineHeight: 1.5,
    textAlign: 'left',
    '& p': {
      minHeight: '11.5rem',
      margin: '1.75rem 0 0',
      [`@media (max-width: 36rem)`]: {
        minHeight: 0,
        marginTop: '1.25rem',
      },
    },
  },
  concernImage: {
    display: 'block',
    width: '100%',
    aspectRatio: '252 / 232',
    borderRadius: '1.5rem',
    backgroundColor: '#f2f0ed',
    border: '1px solid #e6e1d9',
    boxSizing: 'border-box',
  },
  concernRule: {
    width: '1.25rem',
    height: '0.125rem',
    backgroundColor: '#FF9114',
    marginTop: '1rem',
  },
  rule: {
    width: 'min(100%, 64.5rem)',
    height: '1px',
    backgroundColor: '#c9b99f',
    margin: '2rem auto 5rem',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      margin: '2rem auto 3rem',
    },
  },
  feature: {
    maxWidth: '80rem',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    alignItems: 'center',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: '1fr',
      gap: '2rem',
    },
  },
  featureImage: {
    display: 'block',
    width: '100%',
    aspectRatio: '635 / 730',
    borderRadius: '2.25rem',
    backgroundColor: '#f2f0ed',
    border: '1px solid #e6e1d9',
    boxSizing: 'border-box',
  },
  featureCopy: {
    padding: '2rem 0 2rem 3rem',
    color: '#80664a',
    textAlign: 'left',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: 0,
    },
    '& > a, & > button': {
      marginTop: '3rem',
    },
  },
  featureTitle: {
    fontFamily: 'Newsreader, serif',
    fontSize: '2.625rem',
    lineHeight: 1.15,
    fontWeight: 400,
    margin: 0,
    [`@media (max-width: ${breakpoints.tablet})`]: {
      fontSize: '2.125rem',
    },
  },
  shortRule: {
    width: '1.25rem',
    height: '0.125rem',
    backgroundColor: '#FF9114',
    margin: '2.5rem 0',
  },
  featureDescription: {
    fontSize: '1.375rem',
    lineHeight: 1.6,
    '& p': {
      margin: '0 0 1.5rem',
    },
    '& p:first-child': {
      fontWeight: 600,
    },
    '& p:last-child': {
      marginBottom: 0,
    },
  },
  '@keyframes circleWave': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
  },
})

const useAnimatedHeadingStyles = createUseStyles({
  heading: props => getAnimatedHeadingStyles(props),
  ...titleRevealKeyframes,
})

const useRevealImageStyles = createUseStyles({
  imageFrame: {
    position: 'relative',
    overflow: 'hidden',
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
  visible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  image: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
  },
})
