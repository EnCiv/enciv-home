import CKedit from '../app/components/ckedit'

import React from 'react'
import { onDoneDecorator, onDoneResult } from 'civil-pursuit/stories/common'

export default {
  title: 'CKedit',
  component: CKedit,
  decorators: [onDoneDecorator],
}

export const Primary = { args: {} }
