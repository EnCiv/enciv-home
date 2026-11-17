// https://github.com/EnCiv/enciv-home/issues/97
import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from '../components/action-button'
import { getAnimatedHeadingStyles, getRevealTiming, titleRevealKeyframes, useRevealOnView } from '../components/animated-heading'
import { breakpoints } from '../theme'

function AnimatedHeading({ as: Element = 'h2', className, children, ...otherProps }) {
  const { ref: headingRef, isVisible } = useRevealOnView()
  const headingClasses = useAnimatedHeadingStyles({ isVisible, ...getRevealTiming(children) })

  return (
    <Element ref={headingRef} className={cx(headingClasses.heading, className)} {...otherProps}>
      {children}
    </Element>
  )
}

function RevealImage({ className, imageClassName, interactive = true, src, alt = '' }) {
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
      className={cx(classes.imageFrame, className, { [classes.visible]: isVisible, [classes.nonInteractive]: !interactive })}
    >
      <img className={cx(classes.image, imageClassName)} src={src} alt={alt} loading="lazy" />
    </div>
  )
}

function RevealStep({ className, children, delay }) {
  const classes = useStepRevealStyles()
  const { ref, isVisible } = useRevealOnView(0.15)

  return (
    <article
      ref={ref}
      className={cx(className, isVisible && classes.visible)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </article>
  )
}

function ProcessIcon({ name }) {
  if (name === 'grouping') {
    return (
      <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14.0531 11.9656C13.8924 12.46 13.4317 12.7947 12.9118 12.7947H1.2023C0.0398325 12.7947 -0.443499 14.2823 0.496958 14.9656L9.97013 21.8482C10.3907 22.1538 10.5667 22.6954 10.4061 23.1899L6.78763 34.3262C6.4284 35.4318 7.69378 36.3512 8.63423 35.6679L18.1074 28.7852C18.528 28.4796 19.0975 28.4796 19.5181 28.7852L28.9913 35.6679C29.9317 36.3512 31.1971 35.4318 30.8379 34.3262L27.2194 23.1899C27.0588 22.6954 27.2348 22.1538 27.6554 21.8482L37.1285 14.9656C38.069 14.2823 37.5857 12.7947 36.4232 12.7947H24.7137C24.1938 12.7947 23.7331 12.46 23.5724 11.9656L19.954 0.82918C19.5948 -0.276392 18.0307 -0.276394 17.6715 0.829179L14.0531 11.9656ZM18.8127 7.67214L17.0964 12.9544C16.5074 14.7673 14.818 15.9947 12.9118 15.9947H7.35767L11.851 19.2594C13.3932 20.3798 14.0385 22.3658 13.4494 24.1787L11.7331 29.461L16.2265 26.1964C17.7686 25.0759 19.8569 25.0759 21.399 26.1964L25.8924 29.461L24.1761 24.1787C23.587 22.3658 24.2323 20.3798 25.7745 19.2594L30.2678 15.9947H24.7137C22.8075 15.9947 21.1181 14.7673 20.5291 12.9544L18.8127 7.67214Z" fill="#C2C2C2" fillRule="evenodd" clipRule="evenodd" />
      </svg>
    )
  }

  if (name === 'rate') {
    return (
      <svg width="31" height="34" viewBox="0 0 31 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M26.273 3.77141L26.5162 2.14215C26.6845 1.014 25.8106 0 24.6699 0H5.34588C4.20523 0 3.33133 1.014 3.49967 2.14215L3.74278 3.77141H26.273ZM27.6646 8.9143L27.9077 7.285C28.0761 6.15686 27.2021 5.14285 26.0615 5.14285H3.25865C2.11804 5.14285 1.2441 6.15686 1.41244 7.285L1.65555 8.9143H27.6646ZM23.6181 29.8667H6.39756L4.0329 14.019H25.9828L23.6181 29.8667ZM4.78879 33.6C3.86423 33.6 3.079 32.9232 2.94254 32.0088L0.0208192 12.4279C-0.147517 11.2997 0.7264 10.2857 1.86705 10.2857H28.1487C29.2893 10.2857 30.1632 11.2997 29.9949 12.4279L27.0732 32.0088C26.9367 32.9232 26.1515 33.6 25.2269 33.6H4.78879Z" fill="#C2C2C2" fillRule="evenodd" clipRule="evenodd" />
      </svg>
    )
  }

  if (name === 'compare') {
    return (
      <svg width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16.6667 1.71362C16.6667 0.76722 15.9205 0 15 0C14.0795 0 13.3333 0.76722 13.3333 1.71362V3.42723H3.33333C1.49238 3.42723 0 4.96165 0 6.85446V27.4178C0 29.3107 1.49238 30.8451 3.33333 30.8451H13.3333V32.5587C13.3333 33.5051 14.0795 34.2723 15 34.2723C15.9205 34.2723 16.6667 33.5051 16.6667 32.5587V1.71362ZM3.33333 6.85446H13.3333V27.4178H3.33333V6.85446Z" fill="#C2C2C2" />
        <path d="M21.6667 3.42188C20.7462 3.42188 20 4.18909 20 5.13549C20 6.08189 20.7462 6.84911 21.6667 6.84911H26.6667V27.4125H21.6667C20.7462 27.4125 20 28.1797 20 29.1261C20 30.0725 20.7462 30.8397 21.6667 30.8397H26.6667C28.5077 30.8397 30 29.3053 30 27.4125V6.84911C30 4.9563 28.5077 3.42188 26.6667 3.42188H21.6667Z" fill="#C2C2C2" />
      </svg>
    )
  }

  return (
    <svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M35.5996 17.2882C35.0472 17.2882 34.5996 17.7271 34.5996 18.2686C34.5996 26.918 27.422 33.9549 18.5996 33.9549C9.77721 33.9549 2.59961 26.918 2.59961 18.2686C2.59961 9.61921 9.77721 2.58235 18.5996 2.58235C22.27 2.58235 25.75 3.78901 28.5744 6.00588L25.532 6.80509C24.9984 6.94509 24.682 7.48313 24.8248 8.00588C24.9444 8.44392 25.3488 8.73293 25.7904 8.73293C25.876 8.73293 25.9632 8.72195 26.0496 8.6996L30.8792 7.43097C31.3064 7.31882 31.6204 6.91725 31.6204 6.48392V1.58195C31.6204 1.04039 31.1728 0.601562 30.6204 0.601562C30.068 0.601562 29.6204 1.04039 29.6204 1.58195V4.3196C26.4796 1.92392 22.6428 0.621563 18.5996 0.621563C8.67441 0.621563 0.599609 8.53803 0.599609 18.2686C0.599609 27.9992 8.67441 35.9157 18.5996 35.9157C28.5248 35.9157 36.5996 27.9992 36.5996 18.2686C36.5996 17.7271 36.152 17.2882 35.5996 17.2882Z" fill="#C2C2C2" fillRule="evenodd" clipRule="evenodd" />
      <path d="M18.5995 10.3125C10.2483 10.3125 6.82871 17.5603 6.68751 17.869C6.57031 18.1247 6.57031 18.4172 6.68751 18.6729C6.82911 18.9815 10.2483 26.2294 18.5995 26.2294C26.9507 26.2294 30.3703 18.9815 30.5115 18.6729C30.6287 18.4172 30.6287 18.1247 30.5115 17.869C30.3703 17.5603 26.9507 10.3125 18.5995 10.3125ZM18.5995 24.2686C12.5199 24.2686 9.50551 19.6854 8.71991 18.2713C9.50671 16.8545 12.5215 12.2733 18.5995 12.2733C24.6771 12.2733 27.6919 16.8541 28.4791 18.2709C27.6919 19.6878 24.6771 24.2686 18.5995 24.2686Z" fill="#C2C2C2" fillRule="evenodd" clipRule="evenodd" />
      <path d="M18.5996 14.3516C16.394 14.3516 14.5996 16.1108 14.5996 18.2731C14.5996 20.4355 16.394 22.1947 18.5996 22.1947C20.8052 22.1947 22.5996 20.4355 22.5996 18.2731C22.5996 16.1108 20.8052 14.3516 18.5996 14.3516ZM18.5996 20.2339C17.4968 20.2339 16.5996 19.3543 16.5996 18.2731C16.5996 17.192 17.4968 16.3123 18.5996 16.3123C19.7024 16.3123 20.5996 17.192 20.5996 18.2731C20.5996 19.3543 19.7024 20.2339 18.5996 20.2339Z" fill="#C2C2C2" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  )
}

export default function CivilPursuitPage() {
  const classes = useStyles()

  return (
    <div className={classes.civilPage}>
      <section className={classes.civilHero} aria-labelledby="civil-pursuit-title">
        <img className={classes.civilHeroImage} src="/assets/images/civil-pursuit-hero.webp" alt="" />
        <div className={classes.civilHeroShade} />
        <div className={classes.civilHeroContent}>
          <AnimatedHeading as="h1" className={classes.heroTitle} id="civil-pursuit-title">
            Civic Pursuit
          </AnimatedHeading>
          <p>Our non-partisan platform for civic debate</p>
        </div>
      </section>

      {/* Temporarily hidden until trust-logo approvals are finalized.
      <section className={classes.civilTrustedBy} aria-label="Trusted by">
        <span className={classes.trustedLabel}>Trusted by</span>
        <span className={classes.whiteHouseMark}>THE WHITE HOUSE</span>
        <img src="/assets/images/civil-pursuit-pbs.webp" alt="PBS" />
        <img src="/assets/images/civil-pursuit-childrens-network.webp" alt="Children's Miracle Network Hospitals" />
      </section>
      */}

      <section className={classes.productOverview} aria-labelledby="community-priorities-title">
        <div className={classes.productIntro}>
          <AnimatedHeading id="community-priorities-title">Your Guide to Community Priorities</AnimatedHeading>
          <p>Our tool best emulates in-person deliberation to quickly figure out community priorities.</p>
        </div>
        <div className={classes.productSteps}>
          {[
            ['Grouping', 'Group similar responses.', 'grouping'],
            ['Rate', 'Quickly evaluate suitability of a response.', 'rate'],
            ['Compare', 'Easily sort through responses to find a relevant response.', 'compare'],
            ['Review', 'We offer a digestible, comprehensive end result.', 'review'],
          ].map(([title, description, iconName], index) => (
            <RevealStep className={classes.productStep} delay={index * 130} key={title}>
              <span className={classes.stepIcon}>
                <ProcessIcon name={iconName} />
              </span>
              <h3>{title}</h3>
              <p><br />{description}</p>
            </RevealStep>
          ))}
        </div>
        <div className={classes.productDemo}>
          <RevealImage
            className={classes.phoneFrame}
            imageClassName={classes.phoneMockup}
            src="/assets/images/civil-pursuit-phone.webp"
            alt="Civil Pursuit discussion interface on a phone"
          />
        </div>
        <div className={classes.productStart}>
          <ActionButton action="/national-deliberations" className={classes.pageActionButton} size="large">
            Start Discussion
          </ActionButton>
        </div>
      </section>

      <section className={classes.buildCallout} aria-labelledby="build-with-civil-pursuit">
        <RevealImage
          className={classes.buildImage}
          imageClassName={classes.buildImageContent}
          src="/assets/images/civil-pursuit-discussions.webp"
          alt="A Civil Pursuit discussion overview"
        />
        <div className={classes.buildCopy}>
          <AnimatedHeading as="h2" id="build-with-civil-pursuit">
            Not ready to participate but want to build?
          </AnimatedHeading>
          <p>We offer a centralized platform for all your discussions and our built-in discussion prompt creator.</p>
          <ActionButton action="https://cc.enciv.org" className={classes.pageActionButton}>
            Register Now
          </ActionButton>
        </div>
      </section>

      <section className={classes.volunteerSection} aria-labelledby="volunteer-title">
        <div className={classes.volunteerCopy}>
          <AnimatedHeading as="h2" id="volunteer-title">
            Volunteer with Us
          </AnimatedHeading>
          <p>We’re always looking for the following roles:</p>
          <ul>
            <li>Backend Developer</li>
            <li>Marketing Director</li>
            <li>Grant Writer</li>
          </ul>
          <p>
            Write to us at <a href="mailto:volunteer@enciv.org">volunteer@enciv.org</a>. Include your resumé and a brief
            description why you’d like to join our team.
          </p>
        </div>
        <div className={classes.volunteerImageRotator}>
          <RevealImage
            className={classes.volunteerImageFrame}
            imageClassName={classes.volunteerImage}
            interactive={false}
            src="/assets/images/civil-pursuit-volunteer.webp"
            alt=""
          />
        </div>
      </section>
    </div>
  )
}

const useStyles = createUseStyles({
  civilPage: {
    color: '#343433',
    fontFamily: 'Inter, sans-serif',
  },
  civilHero: {
    position: 'relative',
    minHeight: '45.75rem',
    height: 'min(51vw, 45.75rem)',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    backgroundColor: '#252525',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '14%',
      background: 'linear-gradient(to bottom, rgba(246,245,242,0) 0%, #f6f5f2 100%)',
      zIndex: 2,
      pointerEvents: 'none',
    },
    '&:hover $civilHeroImage': {
      transform: 'scale(1.04)',
    },
    '&:hover $civilHeroShade': {
      boxShadow: 'inset 0 0 1.75rem rgba(0,0,0,.34)',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      minHeight: '35rem',
      height: '56vw',
    },
    '@media (max-width: 38rem)': {
      minHeight: '31rem',
      height: '72vh',
    },
  },
  civilHeroImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 44%',
    filter: 'grayscale(1)',
    transform: 'scale(1.04)',
    animation: '$heroImageReveal 900ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards',
    transition: 'transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
    '@media (prefers-reduced-motion: reduce)': {
      transform: 'none',
      animation: 'none',
    },
  },
  civilHeroShade: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    background: 'linear-gradient(90deg, rgba(0,0,0,.76) 0%, rgba(0,0,0,.42) 48%, rgba(0,0,0,.04) 100%), linear-gradient(0deg, rgba(0,0,0,.48), transparent 62%)',
  },
  civilHeroContent: {
    position: 'relative',
    zIndex: 3,
    width: 'min(calc(100% - 4rem), 80rem)',
    margin: '0 auto',
    padding: '0 0 5.5rem',
    '& $heroTitle': {
      color: '#fbbc0d',
      fontFamily: 'Newsreader, serif',
      fontSize: '4.6875rem',
      fontWeight: 600,
      lineHeight: 1.07,
      margin: 0,
    },
    '& p': {
      color: '#fff9e8',
      fontSize: '1.5rem',
      margin: '1rem 0 0',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      paddingBottom: '3.5rem',
      width: 'calc(100% - 3rem)',
      '& $heroTitle': { fontSize: '3.5rem' },
      '& p': { fontSize: '1.25rem' },
    },
    '@media (max-width: 38rem)': {
      paddingBottom: '2.5rem',
      width: 'calc(100% - 2.5rem)',
      '& $heroTitle': { fontSize: '2.75rem' },
      '& p': { fontSize: '1.125rem' },
    },
  },
  heroTitle: {},
  civilTrustedBy: {
    minHeight: '6.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
    padding: '1rem 2rem',
    backgroundColor: '#fff',
    '& img': {
      width: '8.5rem',
      height: '3rem',
      objectFit: 'contain',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      gap: '1.5rem',
      flexWrap: 'wrap',
    },
    '@media (max-width: 38rem)': {
      gap: '1rem',
      '& img': { width: '6.5rem' },
    },
  },
  trustedLabel: {
    color: '#80664a',
    fontSize: '1.125rem',
  },
  whiteHouseMark: {
    width: '4rem',
    color: '#343433',
    fontFamily: 'Georgia, serif',
    fontSize: '0.5rem',
    fontWeight: 700,
    lineHeight: 1.15,
    textAlign: 'center',
  },
  productOverview: {
    padding: '5.5rem max(2rem, calc((100% - 74.25rem) / 2)) 4rem',
    backgroundColor: '#f6f5f2',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '4rem 1.5rem 3rem',
    },
    '@media (max-width: 38rem)': {
      padding: '3rem 1.25rem 2.5rem',
    },
  },
  productIntro: {
    maxWidth: '72.8rem',
    margin: '0 auto 3rem',
    '& h2': {
      color: '#80664a',
      fontFamily: 'Newsreader, serif',
      fontSize: '3.375rem',
      fontWeight: 400,
      lineHeight: 1.1,
      margin: 0,
    },
    '& p': {
      maxWidth: '38rem',
      color: '#5d5d5c',
      fontSize: '1.5rem',
      lineHeight: 1.35,
      margin: '1rem 0 0',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      marginBottom: '2.5rem',
      '& h2': { fontSize: '2.5rem' },
      '& p': { fontSize: '1.25rem' },
    },
    '@media (max-width: 38rem)': {
      '& h2': { fontSize: '2rem' },
      '& p': { fontSize: '1.125rem' },
    },
  },
  productSteps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '1.5rem',
    maxWidth: '72.8rem',
    margin: '0 auto 2rem',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    '@media (max-width: 38rem)': {
      gridTemplateColumns: '1fr',
    },
  },
  productStep: {
    minHeight: '12rem',
    padding: '1.5rem',
    backgroundColor: '#fff',
    border: '1px solid rgba(52,52,51,.44)',
    borderRadius: '0.5rem',
    boxSizing: 'border-box',
    opacity: 0,
    transform: 'translateY(1.5rem)',
    transition: 'opacity 650ms ease, transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1)',
    '& h3': {
      fontSize: '1.5rem',
      fontWeight: 400,
      margin: '1rem 0 0',
    },
    '& p': {
      fontSize: '1rem',
      lineHeight: 1.35,
      margin: 0,
    },
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    },
  },
  stepIcon: {
    display: 'inline-flex',
    width: '2.375rem',
    height: '2.3125rem',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      display: 'block',
    },
  },
  productDemo: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    aspectRatio: '1188 / 860',
    maxWidth: '74.25rem',
    margin: '0 auto',
    overflow: 'hidden',
    borderRadius: '1.875rem',
    backgroundColor: '#e9e8e4',
    '@media (max-width: 38rem)': {
      aspectRatio: '4 / 5',
      borderRadius: '1rem',
    },
  },
  phoneMockup: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top center',
    filter: 'drop-shadow(0 1.5rem 3rem rgba(0,0,0,.2))',
  },
  phoneFrame: {
    width: 'min(86%, 48rem)',
    aspectRatio: '0.6',
    flex: '0 0 auto',
    '@media (max-width: 38rem)': {
      width: '100%',
    },
  },
  productStart: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '2rem',
  },
  pageActionButton: {
    boxSizing: 'border-box',
  },
  buildCallout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(18rem, .8fr)',
    alignItems: 'center',
    gap: '3rem',
    padding: '5rem max(2rem, calc((100% - 74.25rem) / 2))',
    backgroundColor: '#fff',
    '& > $buildImage': {
      display: 'block',
      width: '100%',
      aspectRatio: '837 / 604',
      border: '0.75rem solid rgba(12,40,170,.05)',
      borderRadius: '1.875rem',
      boxSizing: 'border-box',
      '& img': { objectFit: 'cover' },
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: '1fr',
      gap: '2rem',
      padding: '4rem 1.5rem',
      '& > $buildImage': { maxWidth: '52rem', margin: '0 auto' },
    },
    '@media (max-width: 38rem)': {
      padding: '3rem 1.25rem',
      '& > $buildImage': { borderWidth: '0.5rem', borderRadius: '1rem' },
    },
  },
  buildImage: {
    '& img': { objectFit: 'cover' },
  },
  buildCopy: {
    '& h2': {
      color: '#80664a',
      fontFamily: 'Newsreader, serif',
      fontSize: '3.4375rem',
      fontWeight: 400,
      lineHeight: 1.1,
      margin: 0,
    },
    '& p': {
      fontSize: '1.375rem',
      lineHeight: 1.35,
      margin: '1.5rem 0 0',
    },
    '& > a, & > button': { marginTop: '2rem' },
    '@media (max-width: 38rem)': {
      '& h2': { fontSize: '2.25rem' },
      '& p': { fontSize: '1.125rem' },
    },
  },
  volunteerSection: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(18rem, .8fr)',
    alignItems: 'center',
    gap: '4rem',
    padding: '4rem max(2rem, calc((100% - 72.8rem) / 2))',
    backgroundColor: '#e7ecff',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: '1fr',
      gap: '2rem',
      padding: '4rem 1.5rem',
      '& > $volunteerImageRotator': { width: 'min(100%, 28rem)', margin: '0 auto' },
    },
    '@media (max-width: 38rem)': {
      padding: '3rem 1.25rem',
    },
  },
  volunteerCopy: {
    '& h2': {
      color: '#0c28aa',
      fontFamily: 'Newsreader, serif',
      fontSize: '3.4375rem',
      fontWeight: 400,
      margin: '0 0 1.5rem',
    },
    '& p, & li': {
      color: '#343433',
      fontSize: '1.375rem',
      lineHeight: 1.35,
    },
    '& ul': {
      margin: '1.5rem 0 2rem',
      paddingLeft: '1.5rem',
    },
    '& a': {
      color: '#343433',
      fontWeight: 700,
      textDecoration: 'none',
    },
    '@media (max-width: 38rem)': {
      '& h2': { fontSize: '2.25rem' },
      '& p, & li': { fontSize: '1.125rem' },
    },
  },
  volunteerImageRotator: {
    width: '100%',
    aspectRatio: '0.85',
  },
  volunteerImageFrame: {
    width: '100%',
    height: '100%',
  },
  volunteerImage: {
    objectFit: 'cover',
    objectPosition: '100% 14%',
    borderRadius: '1rem',
    transform: 'rotate(5deg) scale(1.272)',
  },
  '@keyframes heroImageReveal': {
    from: { opacity: 0, transform: 'scale(1.04)' },
    to: { opacity: 1, transform: 'scale(1)' },
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
      '&::after': { transition: 'none' },
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
  nonInteractive: {
    pointerEvents: 'none',
    '&::after': {
      display: 'none',
    },
  },
})

const useStepRevealStyles = createUseStyles({
  visible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})
