import {parameters as clientParameters} from "civil-client/.storybook/preview"
import { ThemeProvider } from 'react-jss'
import React from 'react'
import theme from 'civil-pursuit/app/components/theme'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {...clientParameters},
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <div>
          <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default preview