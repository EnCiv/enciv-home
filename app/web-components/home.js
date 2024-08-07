import React from 'react'
import HeroBlock from '../components/hero-block'
import TextBlock from '../components/text-block'
import Faq from '../components/frequently-asked-questions'
import BrevoCommunity from '../components/brevo-community'
import { BrevoHelmet } from '../components/brevo-join'
import MarkdownBlock from '../components/markdown-block'
import VideoBlock from '../components/video-block'

const Blocks = {
  HeroBlock: HeroBlock,
  TextBlock: TextBlock,
  VideoBlock: VideoBlock,
  MarkdownBlock: MarkdownBlock,
  Faq: Faq,
}
export default function Home(props) {
  const { subject, description, location, blocks } = props
  return (
    <div>
      <BrevoHelmet />
      <BrevoCommunity location={location} />
      {blocks.map((block, i) => {
        const { key, ...otherProps } = block
        if (!Blocks[key]) return null
        const Component = Blocks[key]
        return <Component key={block + '-' + i} {...otherProps} />
      })}
    </div>
  )
}
