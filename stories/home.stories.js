import Home from '../app/web-components/home'

import React from 'react'

import SvgPeopleInHands from '../app/svgr/people-in-hands.js'
import MarkdownBlock from '../app/components/markdown-block'
import { PartialLineWidth } from './markdown-block.stories.js'

export default {
  title: 'Home',
  component: Home,
}

const blocks = [
  {
    key: 'HeroBlock',
    subject: 'Politics is dividing us - EnCiv is uniting us',
    imgUrlObj: {
      highRes: 'https://res.cloudinary.com/hf6mryjpf/image/upload/v1715626901/assets/header_image_no_text_hw5vnf.png',
      lowRes:
        'https://res.cloudinary.com/hf6mryjpf/image/upload/v1716234364/assets/EnCiv__Landing_Page_Image_Mobile_xrkvci.png',
    },
  },
  {
    key: 'TextBlock',
    mode: 'dark',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the People out of the political process.\n\nEnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across the political spectrum to collaborate at scale to identify and address our toughest problems and drive tangible outcomes.',
    actionText: 'Join the Community',
  },
  {
    key: 'VideoBlock',
    mode: 'light',
    subject: 'We create online tools that enable constructive cross-partisan democratic processes at scale',
    actionText: 'Our Work',
    action: () => alert('Action executed!'),
    videoUrl: 'https://youtu.be/Tb2u0h_IUGc',
  },
  {
    key: 'TextBlock',
    mode: 'dark',
    subject: 'When we speak as One',
    description:
      'We’re fed up with (and frankly scared of) the current political system\n\n\
Sick of partisan gridlock that stops real policy and productive discussion\n\n\
Done with the media that only presents the most viral candidate moments and polarized takes\n\n\
There is currently no cross-partisan discourse to address the biggest problems facing our country. And we can’t vote those solutions into power; once we get to the polls, it’s hard to know what policies and positions each candidate stands for.\n\n\
**[65% of our country believes the current system is on the wrong track.](https://www.realclearpolling.com/polls/state-of-the-union/direction-of-country) Together, we can fix it.**\n\n\
To overcome the forces polarizing us, we must have national discussions that organize, rather than suppress, differing voices and delve into the value of these perspectives to find the awesome solutions that unite us.\n\n\
Join EnCiv to become part of a community of diverse, dedicated volunteers helping to foster this deliberation until politicians listen when we speak as one.',
    actionText: 'Join the Community',
  },
  {
    key: 'TextBlock',
    mode: 'light',
    subject: 'No Partisanship. No Sponsorship. Just Productive Dialogue.',
    subPoints: [
      'We’ re nonpartisan – we never endorse a particular party, policy, or candidate.',
      'We’re cross-partisan – we actively seek out and give voice to multiple perspectives.',
      'We’re community-led and community-built – we’re not supported by any corporation.',
    ],
    actionText: 'More About Us',
    action: '/about',
  },
  {
    key: 'TextBlock',
    mode: 'dark',
    subject: 'Built by the People, for the People',
    description:
      'If you believe that there\'s a better way to make the best national decisions and it starts with productive national dialogue...\n\n\
<p style="text-align:center">**We\'re building it! Together.**</p>',
    actionText: 'Join the Community',
  },
  {
    key: 'TextBlock',
    mode: 'light',
    subject: 'Mission',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the people out of the political process. \
      \n\nEnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across the political spectrum to collaborate at scale to identify and address our toughest problems and drive tangible outcomes.',
    iconName: 'PeopleInHands',
    side: 'right',
  },
  // {
  //   key: 'TextBlock',
  //   mode: 'dark',
  //   subject: 'When we speak as One',
  // },
  {
    key: 'MarkdownBlock',
    mode: 'dark',
    children: `
### 65% of our country believes the current system is on the wrong track.
Together, we can fix it.\n\nTo overcome the forces polarizing us, we must have national discussions that organize, rather than suppress, differing voices and delve into the value of these perspectives to find the awesome solutions that unite us.\n\nJoin EnCiv to become part of a community of diverse, dedicated volunteers helping to foster this deliberation until politicians listen when we speak as one.\n\n<ActionButton >Join the Community</ActionButton>`,
    imgUrl:
      'https://images.unsplash.com/photo-1636648522439-a4a00de2561f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Add image URL
    imgSide: 'left',
    lineWidth: 'partial',
  },
  {
    key: 'TextBlock',
    mode: 'light',
    subject: 'Built by the People, for the People',
    side: 'left',
    description:
      'If you believe that there’s a better way to make the best national decisions and it starts with productive national dialogue',
    actionText: 'Join the Community',
    imgUrl:
      'https://res.cloudinary.com/hf6mryjpf/image/upload/v1721882509/assets%20enciv-home%202024/0a73bf0c-dcd6-4ec9-a0e8-68034c4494cb.png',
  },
  {
    key: 'Faq',
    faqs: [
      {
        question: 'How do you deal with trolls?',
        answer:
          "In person dialog and deliberation has learned many techniques for dealing with negative actors. One of them is to take large groups of people and break them up into small groups around a table.  Motivations and rewards become different in small groups.\
\n\nAnother technique that they use is that in these small groups, people express their views, what they agree and disagree with, and then each small group decides on the top comments from the group. So if there were negative or destructive comments from a troll, they would be filtered out by the group - so no one else would have to listen to them.\
\n\nOnline, we use similar techniques. People's comments are grouped, a group reviews the comments, gives feedback, and then ranks them.  The highest ranked comments from each group feed forward to the next round of discussion.",
      },
      {
        question: 'How do you deal with disinformation?',
        answer:
          'The weakness of disinformation is that it is crafted to appeal to a particular group of people. To people outside that group, it’s more apparent that the information is not true. Because we break discussions into small groups of random people, each group will likely include people who are and are not targets of similar disinformation tactics. Therefore, the varied perspectives and experiences within the group will allow participants to identify and filter out the disinformation and focus on the facts.',
      },
      {
        question: 'How do you moderate content?',
        answer:
          'We do not moderate content. It is a community responsibility which one might call crowd moderation. In any discussion, a person will see ten people’s ‘content’ as responses to discussion questions. Users will be asked to rank which of the ten responses are most important for the community to consider. Through processes like this, the people participating will democratically decide on what content should be filtered out. This approach helps to avoid issues with biased moderators.',
      },
      {
        question: 'How can you achieve productive discussions across millions of people?',
        answer:
          'It’s about how we structure the conversation.  We don’t just put a million people into a chat room and ask them to talk. Our approach combines a proven technique from in-person dialogue and deliberation, breaking participants into small discussion groups, with online workflow technology that allows participants to continually distill the outputs of these small group discussions by taking the highest-ranked content from each group and distributing it to people again in a new round, like a tournament.\
            \n\nSo, when we have a million people (and we look forward to that), each person will look at what ten others said and pick the most important one or two for the community to consider. Then, in the next round, they will see ten of the highest-ranked items from the previous round. And so on.  After six rounds, a million ideas will have been democratically considered, discussed, and prioritized into a top few.  The discussion structure keeps it productive.',
      },
      {
        question: 'Where did the name EnCiv come from?',
        answer: 'EnCiv was originally taken from the combination of “engaged” and “civility.”',
      },
    ],
  },
]
export const Primary = { args: { blocks } }
