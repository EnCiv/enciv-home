import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import HeroBlock from '../components/hero-block'
import ActionButton from '../components/action-button'
import { BrevoHelmet } from '../components/brevo-join'
import MarkDown from 'markdown-to-jsx'

function AnimatedMarkdownHeading({ as: Element = 'h2', className, children, ...otherProps }) {
  const headingRef = useRef(null)
  const [isVisible, setIsVisible] = React.useState(false)
  const characterCount = Math.max(Array.from(String(children)).length, 1)
  const duration = Math.min(2.4, Math.max(0.9, characterCount * 0.03))
  const headingClasses = useAnimatedHeadingStyles({ isVisible, duration, steps: characterCount })

  useEffect(() => {
    if (!headingRef.current) return
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
      { threshold: 0.25 }
    )
    observer.observe(headingRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Element
      ref={headingRef}
      className={[className, headingClasses.heading].filter(Boolean).join(' ')}
      {...otherProps}
    >
      {children}
    </Element>
  )
}

export default function About(props) {
  const {
    subject,
    description,
    location,
    imgUrl,
    height = '32rem',
    textColor = '#fff',
    textShadow = '0 0.125rem 0.5rem rgba(0, 0, 0, 0.45)',
  } = props
  const classes = useStyles()
  const contentRef = useRef(null)

  useEffect(() => {
    const images = contentRef.current?.querySelectorAll('img')
    if (!images?.length) return

    const reveal = image => {
      image.dataset.visible = 'true'
    }
    if (!('IntersectionObserver' in window)) {
      images.forEach(reveal)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    images.forEach(image => observer.observe(image))
    return () => observer.disconnect()
  }, [description])

  return (
    <div className={classes.about}>
      <BrevoHelmet />
      <HeroBlock
        mode="dark"
        variant="homepage"
        subject={subject}
        actionText=""
        height={height}
        textColor={textColor}
        textShadow={textShadow}
        showScrollCue={false}
        imgUrl={
          imgUrl ||
          'https://res.cloudinary.com/hf6mryjpf/image/upload/v1712344746/assets/deliberation-at-the-capital_pxodcm.png'
        }
      />
      <section className={classes.aboutSection}>
        <div className={classes.aboutContent} ref={contentRef}>
          <MarkDown
            options={{
              overrides: {
                h2: { component: AnimatedMarkdownHeading },
                h3: { component: AnimatedMarkdownHeading, props: { as: 'h3' } },
                ActionButton: { component: ActionButton },
              },
            }}
          >
            {description}
          </MarkDown>
        </div>
      </section>
    </div>
  )
}

const useStyles = createUseStyles({
  about: {
    backgroundColor: '#fff',
  },
  aboutSection: {
    backgroundColor: '#fafaf9',
    borderTop: '1px solid #e6e1d9',
    padding: '5.25rem 2rem 8rem',
    [`@media (max-width: 48rem)`]: {
      padding: '4rem 1.5rem 5rem',
    },
  },
  aboutContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    color: '#80664a',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.375rem',
    lineHeight: 1.6,
    '& p': {
      margin: '0 0 1.5rem',
    },
    '& p:last-child': {
      marginBottom: 0,
    },
    '& b, & strong': {
      fontWeight: 600,
    },
    '& a': {
      color: '#9b5b13',
    },
    '& h2': {
      color: '#80664a',
      fontFamily: 'Newsreader, serif',
      fontSize: '3.4375rem',
      lineHeight: 1.1,
      fontWeight: 400,
      textAlign: 'center',
      margin: '0 auto 3rem',
      '&::after': {
        content: '""',
        display: 'block',
        width: '1.25rem',
        height: '0.125rem',
        backgroundColor: '#FF9114',
        margin: '2rem auto 0',
      },
    },
    '& h3': {
      color: '#80664a',
      fontFamily: 'Newsreader, serif',
      fontSize: '2.625rem',
      lineHeight: 1.15,
      fontWeight: 400,
      textAlign: 'left',
      margin: '4rem 0 1.5rem',
      paddingTop: '3rem',
      borderTop: '1px solid #e6e1d9',
    },
    '& div:has(> img)': {
      display: 'grid',
      gridTemplateColumns: '8rem minmax(0, 1fr)',
      alignItems: 'start',
      gap: '1.5rem',
      clear: 'both !important',
      overflow: 'visible !important',
      margin: '2.5rem 0 !important',
    },
    '& div:has(> img) p': {
      margin: 0,
    },
    '& img': {
      display: 'block',
      width: '8rem !important',
      height: '8rem !important',
      aspectRatio: '1',
      objectFit: 'cover',
      float: 'none !important',
      margin: '0 !important',
      borderRadius: '1.5rem',
      border: '1px solid #e6e1d9',
      boxSizing: 'border-box',
      opacity: 0,
      transform: 'translateY(1.5rem)',
      transition: 'opacity 650ms ease, transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1)',
    },
    '& img[data-visible="true"]': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '& img[data-visible="true"]:hover': {
      transform: 'scale(1.06)',
    },
    '@media (max-width: 48rem)': {
      '& h2': {
        fontSize: '2.5rem',
        marginBottom: '2rem',
      },
      '& h3': {
        fontSize: '2.125rem',
        marginTop: '3rem',
        paddingTop: '2.5rem',
      },
      '& div:has(> img)': {
        gap: '1rem',
      },
    },
    [`@media (max-width: 36rem)`]: {
      fontSize: '1.125rem',
      '& div:has(> img)': {
        gridTemplateColumns: '1fr',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      '& img': {
        opacity: 1,
        transform: 'none',
        animation: 'none',
        transition: 'none',
      },
    },
  },
})

const useAnimatedHeadingStyles = createUseStyles({
  heading: props => ({
    opacity: props.isVisible ? 1 : 0,
    clipPath: props.isVisible ? 'inset(0)' : 'none',
    animation: props.isVisible
      ? `$aboutTitleFade 600ms ease-out both, $aboutTitleType ${props.duration}s steps(${props.steps}, end) both`
      : 'none',
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      clipPath: 'none',
      animation: 'none',
    },
  }),
  '@keyframes aboutTitleFade': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes aboutTitleType': {
    from: { clipPath: 'inset(0 100% 0 0)' },
    to: { clipPath: 'inset(0)' },
  },
})
