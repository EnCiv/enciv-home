import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import parse from 'html-react-parser'
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
  const replace = domNode => {
    if (domNode.type === 'tag' && domNode.name === 'signupform') {
      return vState === 'thumbnail' ? null : <SignupForm style={{ backgroundColor: 'unset' }} />
    }
  }

  return (
    <div className={cx(classes.articleBlock, classes[mode], classes[vState], className)} {...otherProps}>
      <div className={cx(classes.elipsis, classes[mode], classes[vState])}>{'...'}</div>
      <div className={cx(classes.wrapper, classes[vState])}>
        <div className={cx(classes.article, classes[vState])}>
          <h1>{parse(article.title ?? '')}</h1>
          {article.date && <div className={classes.date}>{new Date(article.date).toLocaleDateString()}</div>}
          <div className={classes.author}>{article.authorName}</div>
          <div className={classes.content}> {parse(article.content ?? '', { replace })}</div>
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
    textAlign: 'left',
    padding: '5.25rem 2rem 8rem',
    minHeight: 'auto',
    borderTop: '1px solid #e6e1d9',
    '$thumbnail&': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 'auto',
      overflow: 'hidden',
      boxSizing: 'border-box',
    },
    [`@media (max-width: 48rem)`]: {
      padding: '4rem 1.5rem 5rem',
    },
  },
  wrapper: {
    maxWidth: '80rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
    '& $thumbnail': {
      maxWidth: 'auto',
    },
  },
  cta: {
    padding: '3rem 0 4rem',
    '& $thumbnail': {
      display: 'none',
    },
    '& h3': {
      color: '#80664a',
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
  date: {
    '$thumbnail &': {
      display: 'none',
    },
  },
  author: {
    color: '#80664a',
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
    },
    '& h1': {
      color: '#80664a',
      fontFamily: 'Newsreader, serif',
      textAlign: 'center',
      fontSize: '3.4375rem',
      fontWeight: 600,
      lineHeight: 1.1,
      padding: 0,
      margin: '0 auto 3rem',
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
      color: '#80664a',
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
    '& h3': {
      color: '#80664a',
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
    '& h4': {
      color: '#80664a',
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
    '& h5': {
      color: '#80664a',
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
      color: '#80664a',
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
      color: '#80664a',
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.375rem',
      textAlign: 'left',
      lineHeight: 1.6,
      margin: '0 0 1.5rem',
      '$thumbnail &': {
        lineHeight: '150%',
        padding: 0,
        margin: 0,
        overflowWrap: 'anywhere',
      },
    },
    '& a': {
      color: '#9b5b13',
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
      color: '#80664a',
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
    [`@media (max-width: 48rem)`]: {
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
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
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
