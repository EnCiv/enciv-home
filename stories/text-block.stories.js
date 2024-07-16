import React from 'react'
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
