import React from 'react'

import App from '../app/components/app'
import iotas from '../iotas.json'
const iota = iotas.find(i => i.path === '/home')

export default {
  title: 'App',
  component: App,
  argTypes: {},
}
if (!global.logger) global.logger = console

export const Home = { args: { iota } }

export const NothingHere = {}

export const Article = {
  args: { iota: iotas.find(i => i.path === '/post/a-new-vision-of-democracy') },
}

export const Blog = {
  args: { iota: iotas.find(i => i.path === '/blog') },
}
