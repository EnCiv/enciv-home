import React, { useEffect } from 'react'

import App from '../app/components/app'
import iotas from '../iotas.json'
const iota = iotas.find(i => i.path === '/')

export default {
  title: 'App',
  component: App,
  argTypes: {},
}
if (!global.logger) global.logger = console

export const Home = { args: { iota } }

export const NothingHere = {}

export const Article = {
  args: { iota: iotas.find(i => i.path === '/posts/a-new-vision-of-democracy') },
}

export const Blog = {
  args: { iota: iotas.find(i => i.path === '/articles') },
  decorators: [
    Story => {
      // simulate socket api
      if (!window.socket) {
        window.socket = {
          emit: (handle, ...args) => {
            if (handle === 'get-articles') {
              setTimeout(() => {
                const iota = iotas.find(i => i.path === '/posts/a-new-vision-of-democracy')
                const article = iota.webComponent.article
                article.path = iota.path
                article._id = iota._id
                args.at(-1)([article])
              }, 1000)
            }
          },
        }
      }
      return <Story />
    },
  ],
}
