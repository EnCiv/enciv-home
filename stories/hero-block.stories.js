
import React from 'react'
import { expect } from '@storybook/jest'
import HeroBlock from '../app/components/hero-block'
import { userEvent, within } from '@storybook/testing-library'

import { onDoneDecorator, onDoneResult} from 'civil-pursuit/stories/common'


export default {
  component: HeroBlock,
  decorators: [onDoneDecorator],
  parameters: {
  layout: "fullscreen"
  }
}

export const Primary={args: {
    subject: "Politics is dividing us - EnCiv is uniting us",
    actionText: "Join the Community",
    imgUrl: 'https://res.cloudinary.com/hf6mryjpf/image/upload/v1712344746/assets/deliberation-at-the-capital_pxodcm.png',
}}
