// https://github.com/EnCiv/enciv-home/issues/77

import React from 'react'
import { expect } from '@storybook/jest'
import DiscussionBlock from '../app/components/discussion-block'
import { userEvent, within } from '@storybook/testing-library'

export default {
  component: DiscussionBlock,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Primary = {
  args: {
    subject: 'What are the top priorities for Congress?',
    imgUrl:
      'https://www.fordlibrarymuseum.gov/sites/default/files/styles/wide/public/catalog/B1603-10.JPG?itok=ozeUjoFH',
  },
}
