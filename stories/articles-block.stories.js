import React from 'react'
import ArticleThumbnailsBlock from '../app/components/article-thumbnails-block'

export default {
  title: 'ArticleThumbnailsBlock',
  component: ArticleThumbnailsBlock,
}

const article = {
  title: 'A New Vision of Democracy',
  date: '2021-05-24T16:49:37',
  modified: '2021-05-24T16:49:37',
  slug: 'a-new-vision-of-democracy',
  author: 3,
  content:
    '<signupform></signupform><p>EnCiv&#8217;s David Fridley has been working in the field of online democracy for years.  He shared an early statement of his vision for an &#8220;Online Deliberative Constitutional Representative Democracy&#8221; on <a href="https://www.quora.com/">Quora</a>.</p>\n<p><img loading="lazy" decoding="async" class="alignleft" src="https://media.istockphoto.com/photos/national-championship-bracket-picture-id480610791?b=1&amp;k=6&amp;m=480610791&amp;s=170x170&amp;h=py1oKrEL3DqP0l0pAziFMHKWyXIOjtxzgOjcpoZACAk=" alt="National Championship Bracket" width="245" height="164" />You can read the original post <a href="https://www.quora.com/What-will-replace-democracy/answer/David-Fridley-1?ch=10&amp;share=b1012faf&amp;srid=tUBe">here</a>.  While it focuses on national deliberation, keep in mind that the technology at its core could also be used at smaller scales.  Indeed, because small tournaments can be run in less time than larger ones, the smaller the scale, the faster the tool would produce meaningful results.  Deliberation &#8220;at scale&#8221; isn&#8217;t different from deliberation with your immediate neighbors or club members; it just takes longer.  But not a great deal longer.  As Fridley points out in his post, eight or nine rounds of deliberation would be enough to connect the whole US population in a single deliberative event.  Collective deliberation on such a scale would be unprecedented.  Would it take any longer than an election, which is the collective expression of &#8220;the people&#8217;s will&#8221;?  Let&#8217;s try it and find out.\n',
}

const articles = [
  { ...article, _id: 1 },
  { ...article, _id: 2 },
  { ...article, _id: 3 },
  { ...article, _id: 4 },
]

export const Empty = { args: {} }
export const Default = { args: { articles } }
export const LightMode = { args: { mode: 'light', articles } }
