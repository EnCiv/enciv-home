import React from 'react'
import MarkdownBlock from '../components/markdown-block'

export default function Nondiscrimination(props) {
  const { subject, description, location, browserConfig, ...otherProps } = props
  return (
    <MarkdownBlock {...otherProps}>{`# Nondiscrimination Policy
Last Updated: July 14, 2024

EnCiv, Inc. does not discriminate on the basis of race, color, national origin, sex (including gender identity and sexual orientation), religion, disability, age, or political beliefs.

Complaints should be mailed to:

> Attention: CEO
> EnCiv, Inc.
> 17595 Harvard Avenue #C-10155
> Irvine, CA 92614
`}</MarkdownBlock>
  )
}
