import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import parse from 'html-react-parser'
import cx from 'classnames'
import { breakpoints } from '../theme'
import ActionButton from './action-button'
import { SignupForm } from './brevo-join'

function getTextContent(node) {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join(' ')
  if (!React.isValidElement(node) || node.type === 'img') return ''
  return getTextContent(node.props.children)
}

export default function ArticleBlock(props) {
  const { article = {}, className, mode = 'dark', vState, articlePage = false, ...otherProps } = props
  const classes = useStylesFromThemeFunction()
  // to allow articles to embed a signup form - but not in the thumbnail
  const replace = domNode => {
    if (domNode.type === 'tag' && domNode.name === 'signupform') {
      return vState === 'thumbnail' ? null : <SignupForm style={{ backgroundColor: 'unset' }} />
    }
  }
  const parsedContent = parse(article.content ?? '', { replace })
  const previewContent = vState === 'thumbnail' ? getTextContent(parsedContent).replace(/\s+/g, ' ').trim() : parsedContent

  return (
    <div className={cx(classes.articleBlock, classes[mode], classes[vState], className)} {...otherProps}>
      <div className={cx(classes.wrapper, classes[vState])}>
        <div
          className={cx(
            classes.article,
            classes[vState],
            (vState === 'thumbnail' || articlePage) && classes.surface,
            vState === 'thumbnail' && classes.previewSurface,
            articlePage && classes.articlePage
          )}
        >
          <h1>{parse(article.title ?? '')}</h1>
          {article.date && <div className={classes.date}>{new Date(article.date).toLocaleDateString()}</div>}
          <div className={classes.author}>{article.authorName}</div>
          <div className={classes.content}>
            {vState === 'thumbnail' ? <p className={classes.previewExcerpt}>{previewContent}</p> : parsedContent}
          </div>
          {vState === 'thumbnail' && (
            <div className={classes.elipsis}>{'...'}</div>
          )}
        </div>
        {vState !== 'thumbnail' && (
          <div className={cx(classes.cta, classes[vState], articlePage && classes.articlePageCta)}>
            <h3>Want to learn more about what EnCiv is doing to unite us?</h3>
            <ActionButton children="Join the Community" />
          </div>
        )}
      </div>
    </div>
  )
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  thumbnail: {},
  elipsis: {
    display: 'none',
  },
  articleBlock: {
    position: 'relative',
    textAlign: 'left',
    padding: '5.25rem 2rem 8rem',
    minHeight: 'auto',
    borderTop: '1px solid #e6e1d9',
    '$thumbnail&': {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      width: '100%',
      height: '100%',
      minHeight: 'auto',
      borderTop: 'none',
      overflow: 'hidden',
      boxSizing: 'border-box',
      backgroundColor: 'transparent',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '4rem 1.5rem 5rem',
    },
  },
  wrapper: {
    maxWidth: '80rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
    '$thumbnail&': {
      flex: '1 1 auto',
      minHeight: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  cta: {
    padding: '3rem 0 4rem',
    '& $thumbnail': {
      display: 'none',
    },
    '& h3': {
      color: '#252a2d',
      fontFamily: 'Newsreader, serif',
      fontStyle: 'normal',
      fontWeight: 400,
      paddingTop: '2rem',
      paddingBottom: '2rem',
      textAlign: 'center',
      fontSize: '2.625rem',
      marginBlockEnd: 0,
    },
  },
  content: {
    paddingTop: 0,
    '$thumbnail &': {
      paddingTop: 0,
    },
  },
  previewExcerpt: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    overflow: 'hidden',
  },
  date: {
    '$thumbnail &': {
      display: 'block',
      color: '#80664a',
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.4,
      flexShrink: 0,
      textAlign: 'center',
      marginBottom: '0.5rem',
    },
  },
  author: {
    color: '#252a2d',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.125rem',
    paddingTop: '0.5rem',
    fontWeight: 600,
    '$thumbnail &': {
      display: 'none',
    },
  },

  article: {
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    leadingTrim: 'both',
    textEdge: 'cap',
    textAlign: 'left',
    margin: 0,
    '$thumbnail &': {
      margin: 0,
      textAlign: 'center',
    },
    '& h1': {
      color: '#252a2d',
      fontFamily: 'Newsreader, serif',
      textAlign: 'center',
      fontSize: '3.4375rem',
      fontWeight: 600,
      lineHeight: 1.1,
      padding: 0,
      margin: '0 auto 3rem',
      '$thumbnail &': {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflow: 'hidden',
        color: '#80664a',
        fontSize: '1.5rem',
        lineHeight: '1.8rem',
        fontWeight: 700,
        flexShrink: 0,
        padding: 0,
        margin: 0,
        marginBottom: '0.75rem',
        overflowWrap: 'anywhere',
        textAlign: 'center',
      },
    },
    '& $previewExcerpt': {
      color: '#80664a',
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.125rem',
      lineHeight: 1.5,
      margin: 0,
      marginTop: '1rem',
      fontStyle: 'italic',
      overflowWrap: 'anywhere',
      textAlign: 'center',
    },
    '& h2': {
      color: '#252a2d',
      fontFamily: 'Newsreader, serif',
      textAlign: 'left',
      fontSize: '2.125rem',
      fontWeight: 400,
      lineHeight: 1.2,
      padding: '2rem 0 0',
      borderTop: '1px solid #e6e1d9',
      margin: '3rem 0 1.25rem',
      '&::after': {
        content: '""',
        display: 'block',
        width: '1.25rem',
        height: '0.125rem',
        backgroundColor: '#FF9114',
        marginTop: '1rem',
      },
      '$thumbnail &': {
        fontFamily: 'Newsreader, serif',
        fontSize: '1rem',
        fontWeight: 'normal',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
        borderBottom: 'none',
      },
    },
    '& h3, & h4, & h5': {
      color: '#252a2d',
      fontFamily: 'Newsreader, serif',
      textAlign: 'left',
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.3,
      margin: '2rem 0 0.75rem',
      '$thumbnail &': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& h6': {
      color: '#252a2d',
      fontFamily: 'Newsreader, serif',
      textAlign: 'left',
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.3,
      margin: '2rem 0 0.75rem',
      '$thumbnail &': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& p': {
      color: '#252a2d',
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.375rem',
      textAlign: 'left',
      lineHeight: 1.6,
      margin: '0 0 1.5rem',
      '$thumbnail &': {
        color: '#80664a',
        lineHeight: '1.5',
        fontSize: '1.125rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& a': {
      color: '#9b5b13',
      '$thumbnail &': {
        padding: 0,
        fontSize: '1rem',
        lineHeight: '1.5rem',
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& a:visited': {
      color: '#413207',
    },
    '& img': {
      float: 'left',
      paddingRight: '2rem',
      marginTop: '.6rem',
      '$thumbnail &': {
        display: 'none',
      },
    },
    '& ul': {
      textAlign: 'left',
      color: '#252a2d',
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.375rem',
      lineHeight: 1.6,
      paddingLeft: '1.5rem',
      margin: '0 0 1.5rem',
      '$thumbnail &': {
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& table': {
      '$thumbnail &': {
        display: 'none',
      },
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      '& h1': {
        fontSize: '2.5rem',
        marginBottom: '2rem',
      },
      '& h2': {
        fontSize: '1.75rem',
        marginTop: '2.5rem',
        paddingTop: '1.5rem',
      },
      '& h3, & h4, & h5, & h6': {
        fontSize: '1.25rem',
      },
      '& p, & ul': {
        fontSize: '1rem',
      },
    },
  },
  surface: {
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#fff #d6d1c8 #d6d1c8 #fff',
    borderRadius: '0.25rem',
    boxShadow: 'inset 0 0.125rem 0.25rem rgba(38, 42, 45, 0.06)',
  },
  previewSurface: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    position: 'relative',
    height: '100%',
    minHeight: 0,
    padding: '1.25rem',
    overflow: 'hidden',
    '& $elipsis': {
      display: 'block',
      position: 'absolute',
      bottom: '0.25rem',
      right: '0.25rem',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      lineHeight: '2rem',
    },
  },
  articlePage: {
    padding: '2rem',
    textAlign: 'center',
    '& h1': {
      color: '#80664a',
      fontFamily: 'Newsreader, serif',
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.1,
      margin: '0 auto 1rem',
    },
    '& $date': {
      display: 'block',
      color: '#80664a',
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.4,
      textAlign: 'center',
      marginBottom: '0.5rem',
    },
    '& $author': {
      color: '#80664a',
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
      textAlign: 'center',
    },
    '& $content': {
      marginTop: '1.5rem',
      '& p': {
        color: '#80664a',
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.125rem',
        fontStyle: 'italic',
        lineHeight: 1.6,
        textAlign: 'center',
        margin: '0 auto 1.5rem',
      },
      '& h2, & h3, & h4, & h5, & h6': {
        color: '#80664a',
        textAlign: 'center',
      },
      '& ul': {
        textAlign: 'center',
        listStylePosition: 'inside',
      },
      '& img': {
        display: 'block',
        float: 'none',
        height: 'auto',
        maxWidth: '100%',
        margin: '1.5rem auto',
        paddingRight: 0,
      },
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '1.25rem',
      '& h1': {
        fontSize: '2.25rem',
      },
    },
  },
  articlePageCta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.5rem',
    padding: '2.5rem 1.5rem',
    borderTop: '1px solid #c9b99f',
    borderRadius: '0.25rem',
    backgroundColor: '#f2f0ed',
    textAlign: 'center',
    '& h3': {
      maxWidth: '40rem',
      color: '#80664a',
      fontFamily: 'Newsreader, serif',
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.25,
      margin: 0,
      padding: 0,
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '2rem 1rem',
      '& h3': {
        fontSize: '1.5rem',
      },
    },
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
    '& $previewSurface': {
      backgroundColor: '#303438',
      borderColor: '#454a4d',
    },
    '& $article': {
      color: 'white',
      '& h1, & h2, & h3, & h4, & h5, & h6, & p, & ul': {
        color: 'white',
      },
      '& a': {
        color: theme.colors.encivYellow,
      },
    },
    '& $cta h3': {
      color: 'white',
    },
  },
  light: {
    backgroundColor: '#fafaf9',
    color: '#80664a',
  },
}))
