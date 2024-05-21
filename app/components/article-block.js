import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import ReactHtmlParser from 'react-html-parser'
import cx from 'classnames'
import ActionButton from './action-button'

export default function ArticleBlock(props) {
  const { article = {}, className, mode = 'dark', vState, ...otherProps } = props
  const classes = useStylesFromThemeFunction()
  return (
    <div className={cx(classes.articleBlock, classes[mode], classes[vState], className)} {...otherProps}>
      <div className={cx(classes.elipsis, classes[mode], classes[vState])}>{'...'}</div>
      <div className={cx(classes.wrapper, classes[vState])}>
        <div className={cx(classes.article, classes[vState])}>
          <h1>{ReactHtmlParser(article.title)}</h1>
          <div>{ReactHtmlParser(article.content)}</div>
        </div>
        {vState !== 'thumbnail' && (
          <div className={cx(classes.cta, classes[vState])}>
            <h3>Want to learn more about about what EnCiv's doing to unite us?</h3>
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
    '$thumbnail&': {
      display: 'block',
      position: 'absolute',
      bottom: '0',
      right: '0',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      lineHeight: '2rem',
    },
  },
  articleBlock: {
    position: 'relative',
    textAlign: 'center',
    paddingTop: '1rem',
    paddingBottom: '4rem',
    minHeight: '65rem',
    '$thumbnail&': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 'auto',
      overflow: 'hidden',
      boxSizing: 'border-box',
    },
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
  cta: {
    paddingBottom: '4rem',
    marginLeft: '2rem',
    marginRight: '2rem',
    '& $thumbnail': {
      display: 'none',
    },
    '& h3': {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 400,
      paddingTop: '4rem',
      paddingBottom: '4rem',
      textAlign: 'center',
      fontSize: '2rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
  },
  article: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    leadingTrim: 'both',
    textEdge: 'cap',
    textAlign: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
    '$thumbnail &': {
      margin: 0,
    },
    '& h1': {
      textAlign: 'center',
      fontSize: '4rem',
      lineHeight: '5rem',
      paddingTop: '4rem',
      paddingBottom: '4rem',
      '$thumbnail &': {
        fontSize: '1.75rem',
        lineHeight: '2rem',
        padding: 0,
        margin: 0,
      },
    },
    '& h2': {
      textAlign: 'left',
      fontSize: '3rem',
      lineHeight: '3.5rem',
      paddingBottom: '1.5rem',
      borderBottom: `${theme.colors.encivYellow} 0.25rem solid`,
      marginBlockEnd: '2rem',
    },
    '& h3': {
      textAlign: 'left',
      fontSize: '2rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h4': {
      textAlign: 'left',
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h5': {
      textAlign: 'left',
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h6': {
      textAlign: 'left',
      fontSize: '1.25rem',
      marginBlockEnd: 0,
    },
    '& p': {
      fontFamily: 'Inter',
      fontSize: '1rem',
      textAlign: 'left',
      lineHeight: '200%',
    },
    '& a': {
      color: '#B1890F',
    },
    '& a:visited': {
      color: '#413207',
    },
    '& img': {
      float: 'left',
      paddingRight: '2rem',
      marginTop: '.6rem', // to align with the top of text in the same line - considering the line height
      '$thumbnail &': {
        display: 'none',
      },
    },
    '& ul': {
      textAlign: 'left',
      lineHeight: '150%',
    },
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
