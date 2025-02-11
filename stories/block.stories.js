import Block from '../app/components/block'

import React from 'react'
import { theme } from 'civil-pursuit'

// getting fontsize from browser because different devices/browser may have different font sizes
const fs = () =>
  parseFloat(window.getComputedStyle(document.getElementsByTagName('body')[0], null).getPropertyValue('font-size')) // get fontsize from browser

const MP = parseFloat(theme.maxPanelWidth)
const MC = parseFloat(theme.condensedWidthBreakPoint)
const ChildHeight = 25 // just a number for the examples

// create viewport sizes to test the edge conditions of block padding/margin
export default {
  title: 'Block',
  component: Block,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        maxPanelWidthPlus10rem: {
          name: 'maxPanelWidthPlus10rem',
          styles: {
            width: fs() * (MP + 10) + 'px',
            height: fs() * (ChildHeight + 8) + 'px',
          },
        },
        maxPanelWidthPlus4rem: {
          name: 'maxPanelWidthPlus4rem',
          styles: {
            width: fs() * (MP + 4) + 'px',
            height: fs() * (ChildHeight + 8) + 'px',
          },
        },
        maxPanelWidth: {
          name: 'maxPanelWidth',
          styles: {
            width: fs() * MP + 'px',
            height: fs() * (ChildHeight + 8) + 'px',
          },
        },
        betweenMaxAndCondensed: {
          name: 'betweenMaxAndCondensed',
          styles: {
            width: (fs() * (MP + MC)) / 2 + 'px',
            height: fs() * (ChildHeight + 8) + 'px',
          },
        },
        maxCondensedPlus1: {
          name: 'maxCondensedPlus4rem',
          styles: {
            width: fs() * (MC + 1) + 'px',
            height: fs() * (ChildHeight + 8) + 'px',
          },
        },
        maxCondensed: {
          name: 'maxCondensed',
          styles: {
            width: fs() * MC + 'px',
            height: fs() * (ChildHeight + 4) + 'px',
          },
        },
        maxCondensedHalfOf: {
          name: 'maxCondensedHalfOf',
          styles: {
            width: fs() * (MC / 2) + 'px',
            height: fs() * (ChildHeight + 4) + 'px',
          },
        },
      },
    },
  },
}

export const maxPanelWidthPlus10rem = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'maxPanelWidthPlus10rem',
    },
  },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          Top/botton black should be 4rem, left/right should be more than 2rem
        </div>
      </Block>
    )
  },
}

export const maxPanelWidthPlus4rem = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'maxPanelWidthPlus4rem',
    },
  },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          Top/botton black should be 4rem, left/right should 2rem
        </div>
      </Block>
    )
  },
}

export const maxPanelWidth = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'maxPanelWidth',
    },
  },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          {' '}
          Top/botton black should be 4rem, left/right should 2rem
        </div>
      </Block>
    )
  },
}

export const betweenMaxAndCondensed = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'betweenMaxAndCondensed',
    },
  },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          {' '}
          Top/botton black should be 4rem, left/right should 2rem
        </div>
      </Block>
    )
  },
}

export const maxCondensedPlus1 = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'maxCondensedPlus1',
    },
  },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          {' '}
          Top/botton black should be 4rem, left/right should 2rem
        </div>
      </Block>
    )
  },
}

export const maxCondensed = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'maxCondensed',
    },
  },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          {' '}
          Top/botton black should be 2rem, left/right should 1rem
        </div>
      </Block>
    )
  },
}

export const maxCondensedHalfOf = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'maxCondensedHalfOf',
    },
  },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          {' '}
          Top/botton black should be 2rem, left/right should 1rem
        </div>
      </Block>
    )
  },
}

export const Light = {
  args: { mode: 'light' },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          border should be white and text black
        </div>
      </Block>
    )
  },
}

export const Dark = {
  args: { mode: 'dark' },
  render: args => {
    return (
      <Block {...args}>
        <div style={{ width: '100%', backgroundColor: 'green', height: ChildHeight + 'rem' }}>
          Border should be black and text white
        </div>
      </Block>
    )
  },
}
