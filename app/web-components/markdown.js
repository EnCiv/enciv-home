import React from 'react'
import MarkdownBlock from '../components/markdown-block'

export default function Markdown(props) {
  const { subject, description, location, browserConfig, ...otherProps } = props
  return <MarkdownBlock children={description} {...otherProps} />
}
