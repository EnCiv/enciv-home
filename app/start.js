'use strict'

const path = require('path')
import { theCivilServer, Iota } from 'civil-server'
import civilIotas from '../node_modules/civil-server/iotas.json'
import iotas from '../iotas.json'
import App from './components/app'

Iota.load(civilIotas)
Iota.load(iotas) // set the initial data for the database
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function start() {
  try {
    const server = new theCivilServer()
    server.App = App // set the outer React wrapper for this site
    server.directives.connectSrc.push('https://analytics.google.com')
    server.directives.fontSrc.push('https://assets.brevo.com')
    server.directives.styleSrc.push('https://sibforms.com')
    // this come from the images in the articles imported from the wordpress sight
    server.directives.imgSrc.push(
      'https://media.istockphoto.com',
      'https://cdn.pixabay.com',
      'https://bloximages.chicago2.vip.townnews.com',
      'https://www.viterbo.edu/themes/oeduVitb/images/logo.svg',
      'https://api.creativecommons.engineering',
      'https://*.googleusercontent.com'
    )
    await server.earlyStart() // connect to the database, and such
    server.routesDirPaths.push(path.resolve(__dirname, './routes'))
    server.socketAPIsDirPaths.push(path.resolve(__dirname, './socket-apis'))
    server.serverEventsDirPaths.push(path.resolve(__dirname, './events'))
    await server.start()
    logger.info('started')
  } catch (error) {
    logger.error('error on start', error)
  }
}

start()
