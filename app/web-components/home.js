import React, { useState } from 'react'
import { Components } from 'civil-pursuit'
import HeroBlock from '../components/hero-block'
import BrevoJoin from '../components/brevo-join'
import TextBlock from '../components/text-block'

export default function Home(props) {
  const { subject, description } = props
  const [showRegForm, setRegForm] = useState(false)
  let mode = 'light'
  const getMode = () => {
    mode = mode === 'dark' ? 'light' : 'dark'
    return mode
  }
  return (
    <div>
      <Components.TopNavBar mode={'dark'} />
      <HeroBlock
        imgUrl={
          'https://res.cloudinary.com/hf6mryjpf/image/upload/v1712344746/assets/deliberation-at-the-capital_pxodcm.png'
        }
        actionText={'Join the community'}
      />
      <TextBlock
        mode={getMode()}
        subject={'Politics is dividing us - EnCiv is uniting us'}
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
**64% of our country believes the current system is on the wrong track. Together, we can fix it.**\n\n\
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
      />
      <TextBlock
        mode={getMode()}
        subject={'Join the Community'}
        description={
          "EnCiv is built by the People, for the People.\n\n\
If you believe that there's a better way to make the best national decisions and it starts with productive dialogue...\n\n\
**We're building it. Join our community today.**"
        }
        actionText={'Join the Community'}
      />
    </div>
  )
}
