import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import HeroBlock from '../components/hero-block'
import ActionButton from '../components/action-button'
import { BrevoHelmet } from '../components/brevo-join'
import MarkDown from 'markdown-to-jsx'
import { breakpoints } from '../theme'
import { getAnimatedHeadingStyles, getRevealTiming, titleRevealKeyframes, useRevealOnView } from '../components/animated-heading'

function ToolsActionButton({ style = {}, ...props }) {
  return (
    <ActionButton
      {...props}
      style={{
        ...style,
        minHeight: '3.5rem',
        padding: '1rem 1.75rem',
        fontSize: '1.375rem',
        lineHeight: '1.5rem',
        marginTop: '1.5rem',
      }}
    />
  )
}

function AnimatedMarkdownHeading({ as: Element = 'h2', className, children, ...otherProps }) {
  const { ref: headingRef, isVisible } = useRevealOnView()
  const headingClasses = useAnimatedHeadingStyles({ isVisible, ...getRevealTiming(children) })

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
  const isToolsPage = subject === 'Our Tools'
  const contentRef = useRef(null)
  const [toolsIntro = '', ...toolSections] = isToolsPage ? (description || '').split(/(?=^###\s)/m) : []
  const markdownOptions = {
    overrides: {
      h2: { component: AnimatedMarkdownHeading },
      h3: { component: AnimatedMarkdownHeading, props: { as: 'h3' } },
      ActionButton: { component: isToolsPage ? ToolsActionButton : ActionButton },
    },
  }
  const renderMarkdown = content => <MarkDown options={markdownOptions}>{content}</MarkDown>

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
      <div ref={contentRef}>
        {isToolsPage ? (
          <>
            <section className={classes.toolsIntroSection}>
              <div className={classes.aboutContent}>{renderMarkdown(toolsIntro)}</div>
            </section>
            {[...toolSections].reverse().map((toolSection, index) => (
              <section
                className={cx(classes.toolsSection, index % 2 === 1 && classes.toolsSectionAlternate)}
                key={toolSection.slice(0, 40)}
              >
                <div className={cx(classes.aboutContent, classes.toolsContent)}>{renderMarkdown(toolSection)}</div>
              </section>
            ))}
          </>
        ) : (
          <section className={classes.aboutSection}>
            <div className={classes.aboutContent}>{renderMarkdown(description)}</div>
          </section>
        )}
      </div>
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
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '4rem 1.5rem 5rem',
    },
  },
  toolsIntroSection: {
    backgroundColor: '#fafaf9',
    borderTop: '1px solid #e6e1d9',
    padding: '5.25rem 2rem',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '4rem 1.5rem',
    },
  },
  toolsSection: {
    backgroundColor: '#fff',
    borderTop: '1px solid #e6e1d9',
    padding: '5rem 2rem 6rem',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '4rem 1.5rem 5rem',
    },
  },
  toolsSectionAlternate: {
    backgroundColor: '#fafaf9',
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
    [`@media (max-width: ${breakpoints.tablet})`]: {
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
  toolsContent: {
    maxWidth: '72.8rem',
    '& h3': {
      fontSize: '2.625rem',
      margin: '0 0 1.25rem',
      paddingTop: 0,
      borderTop: 0,
      '&::after': {
        content: '""',
        display: 'block',
        width: '1.25rem',
        height: '0.125rem',
        backgroundColor: '#FF9114',
        marginTop: '1rem',
      },
    },
    '& h3 + p': {
      fontFamily: 'Newsreader, serif',
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.3,
      marginBottom: '1.5rem',
    },
    '& hr': {
      width: 'min(100%, 64.5rem)',
      height: '1px',
      border: 0,
      backgroundColor: '#c9b99f',
      margin: '2.5rem auto 3rem',
    },
    '& p b, & p strong': {
      color: '#5f523f',
      fontWeight: 600,
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      '& h3': {
        fontSize: '2.125rem',
        marginTop: '3rem',
        paddingTop: '2.5rem',
      },
      '& h3 + p': {
        fontSize: '1.25rem',
      },
    },
  },
})

const useAnimatedHeadingStyles = createUseStyles({
  heading: props => getAnimatedHeadingStyles(props),
  ...titleRevealKeyframes,
})
