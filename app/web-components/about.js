import React, { useState } from 'react'
import HeroBlock from '../components/hero-block'
import TextBlock from '../components/text-block'
import MarkdownBlock from '../components/markdown-block'

export default function About(props) {
  const { subject, description, location, imgUrl } = props
  return (
    <div>
      <HeroBlock
        mode="dark"
        subject={subject}
        actionText=""
        imgUrl={
          imgUrl ||
          'https://res.cloudinary.com/hf6mryjpf/image/upload/v1712344746/assets/deliberation-at-the-capital_pxodcm.png'
        }
      />
      <MarkdownBlock children={description} />
    </div>
  )
}
