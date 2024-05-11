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
