import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import ReactHtmlParser from 'react-html-parser'
import cx from 'classnames'
import ActionButton from './action-button'
import { SignupForm } from './brevo-join'

/**
 * article format
    "article": {
      "title": "Citizens Can Lead the Way on Civility",
      "date": "2018-02-14T10:36:03",
      "modified": "2019-01-19T02:08:32",
      "authorName": "Adolf Gundersen",
      "status": "publish",
      "content": "<p><p>&nbsp;</p>\n<div style=\"width: 276px\" class=\"wp-caption alignleft\"><img loading=\"lazy\" decoding=\"async\" class=\"\" title=\"Empowering European Citizens, Module 2 in Malmö by Demokratikollektivet Watch it!\" src=\"https://res.cloudinary.com/hf6mryjpf/image/upload/v1717007740/wp-import/6864772579_28578967b1_citizen-meeting.jpg\" alt=\"citizen meeting photo\" width=\"266\" height=\"199\" /><p class=\"wp-caption-text\"><small>Photo by <a href=\"http://www.flickr.com/photos/46060166@N04/6864772579\" target=\"_blank\" rel=\"noopener\">Demokratikollektivet Watch it!</a> <a title=\"Attribution-ShareAlike License\" href=\"http://creativecommons.org/licenses/by-sa/2.0/\" target=\"_blank\" rel=\"nofollow noopener\"><img decoding=\"async\" src=\"https://res.cloudinary.com/hf6mryjpf/image/upload/v1716941116/wp-import/cc.png\" /></a></small></p></div>\n<p>Take a few minutes to read this non-partisan <a href=\"http://lacrossetribune.com/news/opinion/adolf-g-gundersen-citizens-can-lead-the-way-on-civility/article_bf3bcd53-cf07-5f4a-b892-31accaa3f256.html\">editorial</a> in favor of civil discussion and I think you&#8217;ll agree that it&#8217;s even more relevant today than when I wrote it four years ago.  The gist of it is that when it comes to civil discussion, it&#8217;s up to us&#8211;not journalists or politicians.</p>\n",
      "tagNames": [
        "citizens",
        "civil discussion"
      ],
      "categoryNames": [
        "Strategy and Vision"
      ]
    }
 */

export default function ArticleBlock(props) {
  const { article = {}, className, mode = 'dark', vState, ...otherProps } = props
  const classes = useStylesFromThemeFunction()
  // to allow articles to embed a signup form - but not in the thumbnail
  const transform = node => {
    if (node.type === 'tag' && node.name === 'signupform') {
      return vState === 'thumbnail' ? null : <SignupForm />
    }
  }

  return (
    <div className={cx(classes.articleBlock, classes[mode], classes[vState], className)} {...otherProps}>
      <div className={cx(classes.elipsis, classes[mode], classes[vState])}>{'...'}</div>
      <div className={cx(classes.wrapper, classes[vState])}>
        <div className={cx(classes.article, classes[vState])}>
          <h1>{ReactHtmlParser(article.title)}</h1>
          {article.date && <div className={classes.date}>{new Date(article.date).toLocaleDateString()}</div>}
          <div className={classes.author}>{article.authorName}</div>
          <div className={classes.content}>{ReactHtmlParser(article.content, { transform })}</div>
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
  content: {
    paddingTop: '5rem',
    '$thumbnail &': {
      paddingTop: 0,
    },
  },
  date: {
    '$thumbnail &': {
      display: 'none',
    },
  },
  author: {
    fontSize: '1.25rem',
    paddingTop: '1rem',
    fontWeight: '500',
    '$thumbnail &': {
      display: 'none',
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
      paddingBottom: '1rem',
      marginBottom: 0,
      '$thumbnail &': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        marginBottom: '.5rem',
        overflowWrap: 'anywhere',
      },
    },
    '& h2': {
      textAlign: 'left',
      fontSize: '3rem',
      lineHeight: '3.5rem',
      paddingBottom: '1.5rem',
      borderBottom: `${theme.colors.encivYellow} 0.25rem solid`,
      marginBlockEnd: '2rem',
      '$thumbnail &': {
        fontFamily: 'Inter',
        fontSize: '1rem',
        fontWeight: 'normal',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
        borderBottom: 'none',
      },
    },
    '& h3': {
      textAlign: 'left',
      fontSize: '2rem',
      fontWeight: 600,
      marginBlockEnd: 0,
      '$thumbnail &': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& h4': {
      textAlign: 'left',
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBlockEnd: 0,
      '$thumbnail &': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& h5': {
      textAlign: 'left',
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBlockEnd: 0,
      '$thumbnail &': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& h6': {
      textAlign: 'left',
      fontSize: '1.25rem',
      marginBlockEnd: 0,
      '$thumbnail &': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& p': {
      fontFamily: 'Inter',
      fontSize: '1rem',
      textAlign: 'left',
      lineHeight: '200%',
      '$thumbnail &': {
        lineHeight: '150%',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& a': {
      color: '#B1890F',
      '$thumbnail &': {
        padding: 0,
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
      marginTop: '.6rem', // to align with the top of text in the same line - considering the line height
      '$thumbnail &': {
        display: 'none',
      },
    },
    '& ul': {
      textAlign: 'left',
      lineHeight: '150%',
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
