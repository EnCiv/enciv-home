import React from 'react'
import ArticleBlock from '../components/article-block'

export default function Article(props) {
  const { subject, description, location, ...otherProps } = props
  return <ArticleBlock mode="light" {...otherProps} />
}
