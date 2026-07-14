import React from 'react'
import { expect, userEvent, within } from '@storybook/test'
import ActionButton from '../app/components/action-button'
import { BrevoHelmet } from '../app/components/brevo-join'
import SvgDonate from '../app/svgr/donate'

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

export const TransparentMode = {
  args: { children: 'click to EnCiv.org', action: 'https://enciv.org', mode: 'transparent' },
  decorators: [
    Story => (
      <div style={{ background: '#333333', padding: '2rem', minHeight: '10rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const ActionButtonWithIcon = {
  args: { children: 'click to EnCiv.org', mode: 'transparent', iconName: 'Donate' },
  decorators: [
    Story => (
      <div style={{ background: '#333333', padding: '2rem', minHeight: '10rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const RelativePathWithIcon = {
  args: { children: 'Click to Text-Block', action: '/?path=/story/text-block--no-mode', iconName: 'Donate' },
}
