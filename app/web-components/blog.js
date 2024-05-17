import React, { useState, useEffect } from 'react'
import HeroBlock from '../components/hero-block'
import ArticleThumbnailsBlock from '../components/article-thumbnails-block'
const pageSize = 10
export default function Blog(props) {
  const { subject, description, location, imgUrl } = props
  const [articles, setArticles] = useState(undefined)
  const [pageStart, setPageStart] = useState(0)
  const loadMore = () => {
    setPageStart(pageStart + pageSize)
  }
  useEffect(() => {
    window.socket.emit('get-articles', pageStart, pageSize, articles =>
      setArticles(prevArticles => (prevArticles ? prevArticles.concat(articles) : articles))
    )
  }, [pageStart])
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
      <ArticleThumbnailsBlock articles={articles} mode="dark" loadMore={loadMore} />
    </div>
  )
}
