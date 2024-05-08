import React, { useState } from 'react'
import MarkdownBlock from '../components/markdown-block'

export default function Markdown(props) {
  const { subject, description, location, ...otherProps } = props
  return <MarkdownBlock children={description} {...otherProps} />
}
