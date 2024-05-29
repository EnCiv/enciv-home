import { parameters as clientParameters } from 'civil-client/.storybook/preview'
import { ThemeProvider } from 'react-jss'
import React from 'react'
import { theme } from 'civil-pursuit'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: { ...clientParameters },
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <div>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default preview
