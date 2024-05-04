import React from 'react'
import { expect } from '@storybook/jest'
import ActionButton from '../app/components/action-button'
import { BrevoHelmet } from '../app/components/brevo-join'
import { userEvent, within } from '@storybook/testing-library'

//import { onDoneDecorator, onDoneResult} from 'civil-pursuit/stories/common'

export default {
  component: ActionButton,
}

export const BrevoJoinForm = {
  args: { children: 'Join the Community' },
  // the brevo join form requires brevohelmet to setup the styles
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

export const RelativePath = {
  args: { children: 'click to text-block', action: '/?path=/story/text-block--no-mode' },
}

export const AbsolutePath = {
  args: { children: 'click to EnCiv.org', action: 'https://enciv.org' },
}

export const Function = {
  args: {
    children: 'click to text-block',
    action: () => {
      location.href = '/?path=/story/text-block--no-mode'
    },
  },
}
