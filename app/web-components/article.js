import React from 'react'
import ArticleBlock from '../components/article-block'
import { BrevoHelmet } from '../components/brevo-join'
import { Helmet } from 'react-helmet'
// import { ConvertUnicode } from '../components/convert-unicode'

export default function Article(props) {
  const { subject, description, location, ...otherProps } = props
  function convertUnicode(input) {
    return input.replace(/&#(\d+);/g, (m, d) => String.fromCharCode(d))
  }

  return (
    <>
      <BrevoHelmet />
      <Helmet>
        <title>{convertUnicode(subject)}</title>
      </Helmet>
      <ArticleBlock mode="light" {...otherProps} />
    </>
  )
}
