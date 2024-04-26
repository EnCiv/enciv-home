import React from 'react'
import BrevoCommunity from '../app/components/brevo-community'
export default {
  component: BrevoCommunity,
  parameters: {},
}

export const Empty = {
  args: {},
}

export const Submitted = {
  args: { location: '/home?community=submitted' },
}

export const Confirmed = {
  args: { location: '/home?community=confirmed' },
}
