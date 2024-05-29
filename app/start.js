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
      'https://bloximages.chicago2.vip.townnews.com',
      'https://www.uschamberfoundation.org/',
      'https://live.staticflickr.com',
      'https://gallery.mailchimp.com',
      'https://dailybruin.com',
      'https://*.stackpathdns.com',
      'https://*.gettyimages.com',
      'http://go.pardot.com',
      'http://www.pacefunders.org',
      'https://api.creativecommons.engineering',
      'https://assets.rebelmouse.io',
      'https://assets.speakcdn.com',
      'https://cdn.ballotpedia.org',
      'https://cdn.pixabay.com',
      'https://*.googleusercontent.com',
      'https://farm5.staticflickr.com',
      'https://gallery.mailchimp.com',
      'https://i1.wp.com',
      'https://*.photobucket.com',
      'https://images.freeimages.com',
      'https://images-na.ssl-images-amazon.com',
      'https://is1-ssl.mzstatic.com',
      'https://lh3.googleusercontent.com',
      'https://live.staticflickr.com',
      'https://res.cloudinary.com',
      'https://static.politico.com',
      'https://*.shutterstock.com',
      'https://tmm.chicagodistributioncenter.com',
      'https://vop.org',
      'https://www.azquotes.com',
      'https://www.interactivityfoundation.org',
      'https://www.nifi.org',
      'https://www.nps.gov',
      'https://www.participatorybudgeting.org',
      'https://www.viterbo.edu',
      'https://www.nationalcivicleague.org'
    )
    server.directives.frameSrc.push('https://cc.enciv.org')
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
