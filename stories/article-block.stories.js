import React from 'react'
import ArticleBlock from '../app/components/article-block'
import { BrevoHelmet } from '../app/components/brevo-join'

export default {
  title: 'ArticleBlock',
  component: ArticleBlock,
  decorators: [
    Story => {
      return (
        <>
          <BrevoHelmet />
          <Story />
        </>
      )
    },
  ],
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

const youngPeopleArticle = {
  title: 'Why Should Young People Care About National Discourse?',
  date: '2025-03-12',
  authorName: 'Aarav Shah, David Fridley',
  content: `
    <h2>A Better Way to Talk: Fixing National Discourse for Our Generation</h2>
    <p>Many young people feel shut out of political decisions. Engagement-driven social platforms can amplify divisive voices, leaving less room for thoughtful conversation and perspectives that reflect the broader public.</p>
    <p>National discourse helps shape the conditions young people will inherit. Constructive discussion gives people room to share different views, weigh tradeoffs, and work toward common ground.</p>
    <h2>Finding a Better Way</h2>
    <p>The article presents Civil Pursuit as an open-source approach to welcoming different viewpoints, exploring issues in depth, and working toward practical solutions.</p>
    <p>It invites readers to join EnCiv’s community and help build a more constructive national conversation.</p>
  `,
}

export const Empty = { args: {} }
export const Default = { args: { article } }
export const DarkMode = { args: { mode: 'dark', article } }
export const WhyYoungPeopleShouldCare = {
  args: { mode: 'light', article: youngPeopleArticle },
}
export const Thumbnail = { args: { article, vState: 'thumbnail', style: { width: '20rem', height: '20rem' } } }
export const LightThumbnail = {
  args: { mode: 'white', article, vState: 'thumbnail', style: { width: '20rem', height: '20rem' } },
}
export const EmptyThumbnail = {
  args: { mode: 'dark', vState: 'thumbnail', style: { width: '20rem', height: '20rem' } },
}
