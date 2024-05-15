import React from 'react'
import BrevoJoin, { BrevoHelmet } from '../app/components/brevo-join'
export default {
  component: BrevoJoin,
  parameters: {},
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

export const Empty = {
  args: {},
}

export const Active = {
  args: { active: true },
}
