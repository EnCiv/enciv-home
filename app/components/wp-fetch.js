import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import ReactHtmlParser from 'react-html-parser'
const apiFetch = require('@wordpress/api-fetch').default

export default function WpFetch(props) {
  const { position = 0 } = props
  const [article, setArticle] = useState(null)
  const classes = useStylesFromThemeFunction()
  useEffect(() => {
    apiFetch({ path: 'https://enciv.org/wp-json/wp/v2/posts' }, { mode: 'no-cors' }).then(posts => {
      debugger
      if (posts.length && posts[position]) {
        setArticle(posts[position])
      }
    })
  }, [position])
  if (!article) return null

  const rendered = article.content.rendered
  const html = rendered.replace(/\[.*?\]/g, '')
  return (
    <div className={classes.wpFetch}>
      <h1>{article.title.rendered}</h1>
      <div>{ReactHtmlParser(html)}</div>
    </div>
  )
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  wpFetch: {
    '& img': {
      float: 'left',
      paddingRight: '1rem',
      paddingBottom: '1rem',
    },
  },
}))
