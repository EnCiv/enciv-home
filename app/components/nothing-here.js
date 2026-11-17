// https://github.com/EnCiv/main-design/issues/97
import React from 'react'
import { createUseStyles } from 'react-jss'
import { breakpoints } from '../theme'

function NothingHere() {
  const classes = useStyles()
  return (
    <main id="main-content" className={classes.notFoundMain} tabIndex="-1">
      <section className={classes.notFound} aria-labelledby="not-found-title">
        <div className={classes.copy}>
          <p className={classes.eyebrow}>
            <span>404</span>
            <span className={classes.eyebrowRule} aria-hidden="true" />
            Page not found
          </p>
          <h1 id="not-found-title">We couldn't find that page.</h1>
          <p className={classes.description}>
            The address may be outdated, or the page may have moved. Start again at Home or explore our Articles.
          </p>
          <div className={classes.actions}>
            <a className={classes.primaryLink} href="/">
              Go to Home
            </a>
            <a className={classes.secondaryLink} href="/articles">
              Browse Articles <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <figure className={classes.visual}>
          <img
            src="/assets/images/home-national-deliberations.webp"
            alt="Crowd gathered on the National Mall for the 1963 March on Washington"
          />
          <figcaption>There are still plenty of ways to join the conversation.</figcaption>
        </figure>
      </section>
    </main>
  )
}

const useStyles = createUseStyles({
  notFoundMain: {
    flex: '1 0 auto',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fafaf9',
    borderTop: '1px solid #e6e1d9',
  },
  notFound: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    alignItems: 'center',
    gap: '4rem',
    width: 'calc(100% - 3rem)',
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '4.5rem 0 5rem',
    boxSizing: 'border-box',
    [`@media (max-width: ${breakpoints.tablet})`]: {
      gridTemplateColumns: '1fr',
      gap: '2.5rem',
      width: 'calc(100% - 2rem)',
      padding: '3rem 0 4rem',
    },
  },
  copy: {
    maxWidth: '39rem',
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    margin: 0,
    color: '#80664a',
    fontSize: '0.875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  eyebrowRule: {
    display: 'inline-block',
    width: '1.25rem',
    height: '0.125rem',
    backgroundColor: '#ff9114',
  },
  description: {
    maxWidth: '35rem',
    margin: '1.5rem 0 0',
    color: '#5d5d5c',
    fontSize: '1.25rem',
    lineHeight: 1.6,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  primaryLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '3.25rem',
    padding: '0.75rem 1.25rem',
    boxSizing: 'border-box',
    borderRadius: '0.375rem',
    backgroundColor: '#ffc315',
    color: '#343433',
    fontSize: '1rem',
    fontWeight: 700,
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#ffd34f',
    },
    '&:focus-visible': {
      outline: '0.1875rem solid #80664a',
      outlineOffset: '0.1875rem',
    },
  },
  secondaryLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#343433',
    fontWeight: 600,
    textDecoration: 'underline',
    textUnderlineOffset: '0.25rem',
    '&:focus-visible': {
      outline: '0.1875rem solid #80664a',
      outlineOffset: '0.1875rem',
    },
  },
  visual: {
    margin: 0,
    '& img': {
      display: 'block',
      width: '100%',
      aspectRatio: '5 / 4',
      objectFit: 'cover',
      objectPosition: 'center 68%',
      borderRadius: '1.5rem',
      border: '1px solid #e6e1d9',
      boxSizing: 'border-box',
    },
    '& figcaption': {
      marginTop: '0.75rem',
      color: '#80664a',
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
  },
})

export default NothingHere