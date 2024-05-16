import React, { useState, useEffect } from 'react'
import HeroBlock from '../components/hero-block'
import ArticleThumbnailsBlock from '../components/article-thumbnails-block'

export default function Blog(props) {
  const { subject, description, location, imgUrl } = props
  const [articles, setArticles] = useState(undefined)
  useEffect(() => {
    window.socket.emit('get-articles', 0, 10, articles => setArticles(articles))
  })
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
      <ArticleThumbnailsBlock articles={articles} mode="light" />
    </div>
  )
}
