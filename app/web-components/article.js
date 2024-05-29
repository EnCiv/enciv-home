import React from 'react'
import ArticleBlock from '../components/article-block'
import { BrevoHelmet } from '../components/brevo-join'

export default function Article(props) {
  const { subject, description, location, ...otherProps } = props
  return (
    <>
      <BrevoHelmet />
      <ArticleBlock mode="light" {...otherProps} />
    </>
  )
}
