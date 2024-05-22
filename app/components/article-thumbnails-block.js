import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import ArticleBlock from './article-block'
import cx from 'classnames'
import CloseX from './close-x'
import { Components } from 'civil-pursuit'
const { TextButton } = Components

export default function ArticleThumbnailsBlock(props) {
  const { articles = [{}, {}, {}, {}, {}, {}, {}], className, mode = 'dark', loadMore } = props
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
                  location.href = article.path
                }}
              >
                <ArticleBlock article={article} mode={thumbMode} vState="thumbnail" />
              </button>
            ))}
          </div>
        )}
        <TextButton className={cx(classes.loadMoreButton, classes[mode])} onDone={loadMore}>
          Load More
        </TextButton>
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
    paddingLeft: '4rem',
    paddingRight: '4rem',
    boxSizing: 'content-box',
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
    aspectRatio: '3/4',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:focus': {
      outline: theme.focusOutline,
    },
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      aspectRatio: '4/3',
    },
  },
  article: {},
  informationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(calc(min(100%,14rem)), 1fr))',
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
  loadMoreButton: {
    marginTop: '4rem',
  },
}))
