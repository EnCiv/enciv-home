import React, { useEffect, useState } from 'react'
import { expect } from '@storybook/jest'
import TextBlock from '../app/components/text-block'
import { userEvent, within } from '@storybook/testing-library'

import { onDoneDecorator, onDoneResult } from 'civil-pursuit/stories/common'

import SvgPeopleInHands from '../app/svgr/people-in-hands.js'

export default {
  component: TextBlock,
  parameters: {
    layout: 'fullscreen',
  },
}
const defaultViewport = 'responsive'
const condensedWidthBreakpoint = 40
const maxPanelWidth = 78

export const NoMode = {
  args: {
    subject: 'Politics is dividing us - EnCiv is uniting us',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the People out of the political process.',
    actionText: 'Join the Community',
  },
}

export const Dark = { args: { ...NoMode.args, mode: 'dark' } }

export const Light = { args: { ...NoMode.args, mode: 'light' } }

export const NoSubject = { args: { ...NoMode.args, subject: '', mode: 'dark' } }

export const NoDescription = { args: { ...NoMode.args, description: '', mode: 'light' } }

export const NoAction = { args: { ...NoMode.args, actionText: '', mode: 'dark' } }

export const SubPoints = {
  args: {
    subject: 'Politics is dividing us - EnCiv is uniting us',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the People out of the political process.',
    subPoints: ['National discourse', 'Productive dialog', 'Unity'],
    actionText: 'Join the Community',
  },
}

export const SubPointsLight = {
  args: {
    mode: 'light',
    subject: 'Politics is dividing us - EnCiv is uniting us',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the People out of the political process.',
    subPoints: ['National discourse', 'Productive dialog', 'Unity'],
    actionText: 'Join the Community',
  },
}

export const IconLeft = {
  args: {
    mode: 'light',
    subject: 'Mission',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the people out of the political process.\n\nEnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across the political spectrum to collaborate at scale to identify and address our toughest problems and drive tangible outcomes.',
    iconName: 'PeopleInHands',
    side: 'left',
  },
}

export const IconRight = {
  args: {
    mode: 'light',
    subject: 'Mission',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the people out of the political process.\n\nEnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across the political spectrum to collaborate at scale to identify and address our toughest problems and drive tangible outcomes.',
    iconName: 'PeopleInHands',
    side: 'right',
  },
}

export const NoIconSideSpecified = {
  args: {
    mode: 'light',
    subject: 'Mission',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the people out of the political process.\n\nEnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across the political spectrum to collaborate at scale to identify and address our toughest problems and drive tangible outcomes.',
    iconName: 'PeopleInHands',
  },
}

export const InvalidSideProvided = {
  args: {
    mode: 'light',
    subject: 'Mission',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the people out of the political process.\n\nEnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across the political spectrum to collaborate at scale to identify and address our toughest problems and drive tangible outcomes.',
    iconName: 'PeopleInHands',
    side: 'upsidedown',
  },
}

export const IconNameDoesntExist = {
  args: {
    mode: 'light',
    subject: 'Mission',
    description:
      'We’re trapped in a polarized echo chamber built to enrage citizens, control politicians, and drive We the people out of the political process.\n\nEnCiv is forging the first-of-its-kind, cross-partisan discourse platform that enables Americans across the political spectrum to collaborate at scale to identify and address our toughest problems and drive tangible outcomes.',
    iconName: 'DoesntExist',
  },
}

export const ImageUrlLightLeft = {
  args: {
    mode: 'light',
    subject: 'Built by the People, for the People',
    side: 'left',
    description:
      'If you believe that there’s a better way to make the best national decisions and it starts with productive national dialogue',
    actionText: 'Join the Community',
    imgUrl:
      'https://res.cloudinary.com/hf6mryjpf/image/upload/v1721882509/assets%20enciv-home%202024/0a73bf0c-dcd6-4ec9-a0e8-68034c4494cb.png',
  },
}
export const ImageUrlLightRight = {
  args: {
    mode: 'light',
    subject: 'Built by the People, for the People',
    side: 'right',
    description:
      'If you believe that there’s a better way to make the best national decisions and it starts with productive national dialogue',
    actionText: 'Join the Community',
    imgUrl:
      'https://res.cloudinary.com/hf6mryjpf/image/upload/v1721882509/assets%20enciv-home%202024/0a73bf0c-dcd6-4ec9-a0e8-68034c4494cb.png',
  },
}
const resetViewport = async () => {
  console.log('🔄 Resetting viewport to default...')
  document.body.style.width = ''
  window.dispatchEvent(new Event('resize'))
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('✅ Viewport reset to default.')
}
const createViewportPlay = (label, width) => {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await resetViewport()
    document.body.style.width = width
    await new Promise(resolve => setTimeout(resolve, 5000))
    console.log(`✅ Passed viewport: ${label} @ ${width}`)
  }
}

export const CondensedMinus1Rem = {
  args: { ...NoDescription.args },
  play: createViewportPlay('Condensed -1rem', `${condensedWidthBreakpoint - 1}rem`),
}

export const CondensedPlus1Rem = {
  args: { ...NoDescription.args },
  play: createViewportPlay('Condensed +1rem', `${condensedWidthBreakpoint + 1}rem`),
}

export const MaxPanelMinus1Rem = {
  args: { ...NoDescription.args },
  play: createViewportPlay('MaxPanel -1rem', `${maxPanelWidth - 1}rem`),
}

export const MaxPanelPlus1Rem = {
  args: { ...NoDescription.args },
  play: createViewportPlay('MaxPanel +1rem', `${maxPanelWidth + 1}rem`),
}

export const MaxPanelPlus100Rem = {
  args: { ...NoDescription.args },
  play: createViewportPlay('MaxPanel +100rem', `${maxPanelWidth + 100}rem`),
}
