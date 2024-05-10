import React, { useState } from 'react'
import HeroBlock from '../components/hero-block'
import TextBlock from '../components/text-block'
import Faq from '../components/frequently-asked-questions'
import BrevoCommunity from '../components/brevo-community'
import { BrevoHelmet } from '../components/brevo-join'

export default function Home(props) {
  const { subject, description, location } = props
  const [showRegForm, setRegForm] = useState(false)
  let mode = 'light'
  const getMode = () => {
    mode = mode === 'dark' ? 'light' : 'dark'
    return mode
  }
  return (
    <div>
      <BrevoHelmet />
      <BrevoCommunity location={location} />
      <HeroBlock
        subject={'Politics is dividing us - EnCiv is uniting us'}
        imgUrl={
          /*'https://res.cloudinary.com/hrltiizbo/image/upload/a_0/v1449181489/shutterstock_144639305_multi_ethnic_crowd_hands_hi_fbltsn.jpg' */
          'https://res.cloudinary.com/hf6mryjpf/image/upload/v1712344746/assets/deliberation-at-the-capital_pxodcm.png'
        }
      />
      <TextBlock
        mode={getMode()}
        description={
          'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the People out of the political process\n\nEnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across the political spectrum to collaborate at scale to identify and address our toughest problems and drive tangible outcomes.'
        }
        actionText={'Join the Community'}
      />
      <TextBlock
        mode={getMode()}
        subject={'When we speak as One'}
        description={
          'We’re fed up with (and frankly scared of) the current political system\n\n\
Sick of partisan gridlock that stops real policy and productive discussion\n\n\
Done with the media that only presents the most viral candidate moments and polarized takes.\n\n\
There is currently no cross-partisan discourse to address the biggest problems facing our country. And we can’t vote those solutions into power; once we get to the polls, it’s hard to know what policies and positions each candidate stands for.\n\n\
**[65% of our country believes the current system is on the wrong track.](https://www.realclearpolling.com/polls/state-of-the-union/direction-of-country) Together, we can fix it.**\n\n\
To overcome the forces polarizing us, we must have national discussions that organize, rather than suppress, differing voices and delve into the value of these perspectives to find the awesome solutions that unite us.\n\n\
Join EnCiv to become part of a community of diverse, dedicated volunteers helping to foster this deliberation until politicians listen when we speak as one.'
        }
        actionText={'Join the Community'}
      />
      <TextBlock
        mode={getMode()}
        subject={'No Partisanship. No Sponsorship. Just Productive Dialogue '}
        subPoints={[
          'We’ re nonpartisan – we never endorse a particular party, policy, or candidate',
          'We’re cross-partisan – we actively seek out and give voice to multiple perspectives',
          'We’re community-led and community-built – we’re not supported by any corporation',
        ]}
        actionText={'More About Us'}
        action="/about"
      />
      <TextBlock
        mode={getMode()}
        subject={'Built by the People, for the People'}
        description={
          'If you believe that there\'s a better way to make the best national decisions and it starts with productive national dialogue...\n\n\
<p style="text-align:center">**We\'re building it! Together.**</p>'
        }
        actionText={'Join the Community'}
      />
      <Faq
        faqs={[
          {
            question: 'How do you deal with Trolls?',
            answer:
              "In person dialog and deliberation has learned many techniques for dealing with negative actors. One of them is to take large groups of people and break them up into small groups around a table.  Motivations and rewards become different in small groups.\
\n\nAnother technique that they use is that in these small groups, people express their views, what they agree and disagree with, and then each small group decides on the top comments from the group. So if there were negative or destructive comments from a troll, they would be filtered out by the group - so no one else would have to listen to them.\
\n\nOnline, we use similar techniques. People's comments are grouped, A group reviews the comments, gives feedback, and then ranks them.  The highest ranked comments from each group feed forward to the next round of discussion.",
          },
          {
            question: 'How do you deal with disinformation',
            answer:
              'The weakness of disinformation is that it is crafted to be appealing to a particular group of people. To people outside that group, it’s more apparent that the information is not true. Because we break discussion into small groups of random people,  But breaking down discussions into small groups of random participants, that will include people who are and are not targets of the disinformation, the group will be able to identify and filter out the disinformation and focus on the facts.',
          },
          {
            question: 'How do you moderate content?',
            answer:
              'We do not moderate content, it is a community responsibility, call it crowd moderation. In any discussion, a person will see 10 other people’s ‘content’ and are asked to rank what is the most important for the community to consider.  Through processes like this the people participating will democratically decide on what content should be filtered out.  Also, this way we avoid issues with biased moderators.',
          },
          {
            question: 'How can you keep it productive with millions of people?',
            answer:
              'It’s about how we structure the conversation.  We don’t just put a million people into a chat room and ask them to talk.  By combining something that works from in-person dialog and deliberation - breaking the millions of people up into small groups - with something new, that can only be done online - taking the highest ranked content from each group and distributing it to people again in a new round, like a tournament.\
\n\nSo when we have a million people (and we look forward to that) each person will look at what 10 other people said, and pick the most important one or two for the community to consider. Then in the next round they will see the 10 of the highest ranked items from the previous round. And so on.  After 6 rounds, a million ideas will have been democratically considered, discussed, and prioritized into a top few.  The discussion structure keeps it productive.',
          },
          {
            question: 'Where did the name EnCiv come from?',
            answer: 'EnCiv was originally taken from the combination of “engaged” and “civility”',
          },
        ]}
      />
    </div>
  )
}
