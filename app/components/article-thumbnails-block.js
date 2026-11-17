import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import ArticleBlock from './article-block'
import cx from 'classnames'
import CloseX from './close-x'
import { Components } from 'civil-pursuit'
const { PrimaryButton } = Components

export default function ArticleThumbnailsBlock(props) {
  const {
    articles = [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }, { _id: 5 }, { _id: 6 }, { _id: 7 }],
    className,
    mode = 'dark',
    loadMore,
  } = props
  const thumbMode = mode === 'dark' ? 'light' : 'dark'
  const classes = useStylesFromThemeFunction()
  const [theArticle, setTheArticle] = useState(null)
  return (
    <div className={cx(classes.articlesBlock, classes[mode], className)}>
      <div className={classes.wrapper}>
        {theArticle ? (
          <>
            <ArticleBlock key={theArticle._id} article={theArticle} mode={mode} />
            <CloseX onClick={() => setTheArticle(null)} />
          </>
        ) : (
          <div className={classes.informationGrid}>
            {articles.map((article, index) => (
              <button
                key={article._id}
                className={cx(classes.thumbnail, classes[thumbMode])}
                style={{ animationDelay: `${(index % 10) * 70}ms` }}
                onClick={() => {
                  location.href = article.path
                }}
              >
                <ArticleBlock article={article} mode={thumbMode} vState="thumbnail" />
              </button>
            ))}
          </div>
        )}
        <PrimaryButton className={classes.loadMoreButton} onDone={loadMore}>
          Load More
        </PrimaryButton>
      </div>
    </div>
  )
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  articlesBlock: {
    position: 'relative',
    textAlign: 'center',
    paddingTop: '4rem',
    paddingBottom: '4rem',
    minHeight: '65rem',
  },
  wrapper: {
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    boxSizing: 'border-box',
    whiteSpace: 'pre-line',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  thumbnail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '0.9375rem',
    alignSelf: 'stretch',
    minWidth: 0,
    padding: '1.5rem!important',
    borderRadius: '0.5rem',
    border: '1px solid #e6e1d9',
    boxShadow: '0 0.5rem 1.25rem rgba(38, 42, 45, 0.16)',
    width: '100%',
    height: '22rem',
    minHeight: '22rem',
    boxSizing: 'border-box',
    overflow: 'hidden',
    cursor: 'pointer',
    transform: 'scale(1)',
    transformOrigin: 'center',
    animation: '$articleFadeIn 450ms ease both',
    transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, filter 180ms ease',
    filter: 'drop-shadow(0 0.2rem 0.4rem rgba(38, 42, 45, 0.12))',
    '&:hover, &:focus-visible': {
      transform: 'translateY(-0.125rem) scale(1.025)',
      borderColor: '#c9b99f',
      boxShadow: '0 1rem 2rem rgba(38, 42, 45, 0.24)',
      filter: 'drop-shadow(0 0.4rem 0.8rem rgba(38, 42, 45, 0.18))',
      zIndex: 1,
    },
    '&:focus-visible': {
      outline: theme.focusOutline,
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      animation: 'none',
      '&:hover, &:focus-visible': {
        transform: 'none',
        filter: 'none',
      },
    },
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      padding: '1.25rem!important',
    },
  },
  article: {},
  informationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
    gap: '2rem',
    width: '100%',
    justifyContent: 'center',
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: '#f2f0ed',
    color: theme.colors.darkModeGray,
  },
  loadMoreButton: {
    marginTop: '4rem',
  },
  '@keyframes articleFadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}))
