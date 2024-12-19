import React from 'react'
import MarkdownBlock from '../app/components/markdown-block'

export default {
  component: MarkdownBlock,
  parameters: {
    layout: 'fullscreen',
  },
}

export const NoMode = {
  args: {
    children:
      '## Our Mission\
\n\nEnCiv exists to transform the way Americans practice democracy. We challenge sensationalism and polarization in our civic and political discourse by offering online tools to power widespread, cross-partisan discourse and a channel for better communication between candidates and voters to support better decision-making at the ballot box.\
\n\n### Why Discourse Works\
\n\nEnCiv draws on decades of research into the principles of human interaction, civic discourse, dialogue and deliberation, and constructive decision-making. This research teaches us that well designed discussion processes that facilitate everyone speaking and listening yield the best results.\
\n\nWhile it’s easy to assume that online connection is inferior to live interactions in fostering respect and constructive collaboration, we believe the opposite. When supported by systems designed with neutrality in mind, online discourse has the potential to establish a higher bar for universally respectful, broadly inclusive conversation — ultimately driving positive results.\
\n\n### The EnCiv Team\
\n\nDavid joined EnCiv in 2019 to work on their first product, Undebates, and became CTO in October. In May, 2021 he was elected CEO. Previously founder and CEO at Synaccord, LLC a social enterprise for online dialog. One of Synaccord’s projects engaged people in all 50 states to deliberate on the most important problem to fix first in this country. In 2016, David joined the National Coalition of Dialog and Deliberation. Before working in dialog and deliberation, David was in Product Management at Toshiba America Information Systems for business communications systems involving voice and video over the internet. He received his MBA from Suffolk University, holds a BA Computer Science from UC San Diego and has over 12+ years software/hardware engineering.\
These tools are built by volunteers across the country, united in the common mission to make democracy work better. We come from different countries, backgrounds, and political beliefs. If you’re interested in joining as a volunteer, you can explore different volunteer opportunities here. [see candidate conversations](https://cc.enciv.org/san-francisco-district-attorney)',
  },
}

export const Dark = { args: { ...NoMode.args, mode: 'dark' } }

export const Light = { args: { ...NoMode.args, mode: 'light' } }

export const PartialLineWidth = {
  args: {
    children: `##We’re building tech tools for a better democracy.\n\nAs cultural polarization and sensationalism continue to threaten civic discourse, we see a technological opportunity. Our tools provide an alternative to current discourse and political education processes, fostering productive discourse in a way that will ultimately drive better decision making.\n\nWe currently have two tools available: Undebates and Civil Pursuit. Join our mailing list to stay informed of our new product releases.\n\n###Undebates\n\nMore Informed Decisions at the Ballot Box\n\n---\n\n**Problem**: Whether it's the school board or the student council, it's hard for voters to really understand the candidates’ positions on the questions that matter most. Written information is scattered across the internet and any media coverage is short and sensationalized. And for candidates, it can be almost impossible to get honest media coverage if they’re not running for president.\n\n**Solution:** Undebates is a tool that automatically produces video debates by automatically interviewing candidates through their web browser. Instead of sitting through debates or combing through news articles, hear the candidates’ position on the policies you care about most, straight from them and make your own informed voting decisions.\n\nDemocratically-run organizations and political candidates at any level can create their own Undebates with a few simple steps.\n\n<ActionButton style=\"lineHeight:6rem;\" action=\"https://cc.enciv.org/undebates\">See Undebates in Action</ActionButton>\n\n###Civil Pursuit\n\nLarge Scale Deliberative Discussion\n\n---\n\n**Problem:** How can thousands of people across the city, state, and country discuss tough political issues productively - meaning discussions resulting in solutions they all support - rather than the polarization and gridlock we see from politics today?\n\n**Solution:** We are building tools for productive democratic deliberation online, based on practices that have been proven through in-person dialog and deliberation. With Civil Pursuit, you can browse a series of burning questions in our current political ecosystem, and participate in structured discussions with people across the country that are designed to organize, rather than suppress, differing opinions and delve into what's valuable in each that lead to unifying solutions with national support.\n\n<ActionButton style=\"margin-top:2rem\">Coming Soon</ActionButton>\n\n
    `,
    lineWidth: 'partial',
  },
}

export const HeaderIcon = {
  args: {
    children: `###No partisanship.\n\n---\n\nWe're non-partisan\n\nWe never endorse a particular party, policy, or, candidate
    `,
    iconName: 'NoPartisanship',
  }
}

export const TagsSupported = {
  args: {
    children: `
## This is H2
### This is H3
This is text
#### This is H4
This is text
##### This is H5
This is text
###### This is H6
This is text [This is a link](https://enciv.org) This is an [unvisited link](https://bogusbogus.unvisited)
`,
  },
}

export const ActionButton = {
  args: {
    children: `## Support for the Action Button
Here it is: <ActionButton >Join the Community</ActionButton> inline text
This is how you write the ActionButton in markdown:
\`<ActionButton\>Join the Community</ActionButton\>\`

<ActionButton >Join the Community</ActionButton>

And text below that.
`,
  },
}
export const WithSideImage = {
  args: {
    children: `
### 65% of our country believes the current system is on the wrong track.
Together, we can fix it.\n\nTo overcome the forces polarizing us, we must have national discussions that organize, rather than suppress, differing voices and delve into the value of these perspectives to find the awesome solutions that unite us.\n\nJoin EnCiv to become part of a community of diverse, dedicated volunteers helping to foster this deliberation until politicians listen when we speak as one.\n\n\n
<ActionButton >Join the Community</ActionButton>
    `,
    imgUrl:
      'https://images.unsplash.com/photo-1636648522439-a4a00de2561f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Add image URL
    imgSide: 'left',
    lineWidth: 'partial', // Position image on the right
  },
}
export const WithTopSideImage = {
  args: {
    children: `
##  
We’re fed up with (and frankly scared of) the current political system.
    `,
    imgUrl:
      'https://images.unsplash.com/photo-1641945511537-359c4f7510fe?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Add image URL
    imgSide: 'top',
    lineWidth: 'partial', // Position image on the right
    // Position image on the top
  },
}
