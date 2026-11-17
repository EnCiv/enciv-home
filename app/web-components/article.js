//https://github.com/EnCiv/enciv-home/issues/25
import React from 'react'
import ArticleBlock from '../components/article-block'
import { BrevoHelmet } from '../components/brevo-join'
import { Helmet } from 'react-helmet-async'

function decodeNumericEntities(input = '') {
  return input.replace(/&#(\d+);/g, (entity, value) => {
    const codePoint = Number(value)
    return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : entity
  })
}

export default function Article(props) {
  const { subject, description, location, ...otherProps } = props

  return (
    <>
      <BrevoHelmet />
      <Helmet>
        <title>{decodeNumericEntities(subject)}</title>
      </Helmet>
      <ArticleBlock mode="light" articlePage {...otherProps} />
    </>
  )
}
