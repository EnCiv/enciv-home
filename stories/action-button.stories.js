
import React from 'react'
import { expect } from '@storybook/jest'
import ActionButton from '../app/components/action-button'
import { userEvent, within } from '@storybook/testing-library'

import { onDoneDecorator, onDoneResult} from 'civil-pursuit/stories/common'


export default {
  component: ActionButton,
}

export const Primary={args: {children: "Join the Community"}}
export const OnDoneClicked = {
  args: {
    style: {},
    onDone: null,
    title: 'Join the Community',
    children: 'Join the Community',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /Join the Community/i }))
    let result = onDoneResult(canvas)
    expect(result.count).toEqual(1)
  },
}