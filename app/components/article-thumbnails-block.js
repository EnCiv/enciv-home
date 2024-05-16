import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import ArticleBlock from './article-block'
import cx from 'classnames'
import CloseX from './close-x'

export default function ArticleThumbnailsBlock(props) {
  const { articles = [{}, {}, {}, {}, {}, {}, {}], className, mode = 'dark' } = props
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
            {articles.map(article => (
              <button
                key={article._id}
                className={cx(classes.thumbnail, classes[thumbMode])}
                tabIndex={0}
                onClick={() => {
                  setTheArticle(article)
                }}
              >
                <ArticleBlock article={article} mode={thumbMode} vState="thumbnail" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  articlesBlock: {
    position: 'relative',
    textAlign: 'center',
    paddingTop: '1rem',
    paddingBottom: '4rem',
    minHeight: '65rem',
  },
  wrapper: {
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
    '& $thumbnail': {
      maxWidth: 'auto',
    },
  },
  thumbnail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.9375rem',
    alignSelf: 'stretch',
    padding: '2rem!important',
    borderRadius: '1rem',
    maxHeight: '20rem',
    minHeight: '20rem',
    cursor: 'pointer',
    '&:focus': {
      outline: theme.focusOutline,
    },
  },
  article: {},
  informationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(calc(min(100%,20rem)), 1fr))',
    gap: '2rem',
    width: '100%',
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: '#F2F2F2',
    color: theme.colors.darkModeGray,
  },
}))
