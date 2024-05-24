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
  args: { location: '/?community=submitted' },
}

export const Confirmed = {
  args: { location: '/?community=confirmed' },
}
