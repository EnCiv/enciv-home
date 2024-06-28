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
    server.directives.fontSrc.push('https://assets.brevo.com')
    server.directives.styleSrc.push('https://sibforms.com')

    // this come from the images in the articles imported from the wordpress sight
    // see app/tools/get-domains-from-articles for a tool to generate the list
    server.directives.imgSrc.push(
      'https://ncdd.org',
      'https://*.stackpathdns.com',
      'https://api.creativecommons.engineering',
      'https://assets.rebelmouse.io',
      'https://assets.speakcdn.com',
      'https://bipartisanpolicy.org',
      'https://bloximages.chicago2.vip.townnews.com',
      'https://cdn.ballotpedia.org',
      'https://cdn.pixabay.com',
      'https://*.googleusercontent.com',
      'https://dailybruin.com',
      'https://*.staticflickr.com',
      'https://gallery.mailchimp.com',
      'https://go.pardot.com',
      'https://i1.wp.com',
      'https://*.photobucket.com',
      'https://images-na.ssl-images-amazon.com',
      'https://images.freeimages.com',
      'https://is1-ssl.mzstatic.com',
      'https://media.gettyimages.com',
      'https://media.istockphoto.com',
      'https://media4.austinweeklynews.com',
      'https://res.cloudinary.com',
      'https://*.fbcdn.net',
      'https://static.politico.com',
      'https://static1.squarespace.com',
      'https://*.shutterstock.com',
      'https://tmm.chicagodistributioncenter.com',
      'https://upload.wikimedia.org',
      'https://vop.org',
      'https://www.azquotes.com',
      'https://www.citizenuniversity.us',
      'https://www.interactivityfoundation.org',
      'https://www.journals.uchicago.edu',
      'https://www.nationalcivicleague.org',
      'https://www.nifi.org',
      'https://www.nps.gov',
      'https://www.pacefunders.org',
      'https://www.participatorybudgeting.org',
      'https://www.pewresearch.org',
      'https://www.publicagenda.org',
      'https://www.uschamberfoundation.org',
      'https://www.viterbo.edu'
    )

    // see https://developers.google.com/tag-platform/security/guides/csp#google_analytics_4_google_analytics
    // google analytics 4, google ads conversions, google ads remarketing
    server.directives.scriptSrc.push(
      'https://*.googletagmanager.com',
      'https://www.googleadservices.com',
      'https://www.google.com',
      'https://googleads.g.doubleclick.net'
    )
    server.directives.connectSrc.push(
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://*.googletagmanager.com'
    )
    server.directives.imgSrc.push(
      'https://*.google-analytics.com',
      'https://*.googletagmanager.com',
      'https://googleads.g.doubleclick.net',
      'https://www.google.com',
      'https://google.com'
    )
    server.directives.frameSrc.push(
      'https://www.googletagmanager.com',
      'https://bid.g.doubleclick.net',
      'https://td.doubleclick.net'
    ) // needed for google ads
    server.directives.scriptSrcElem.push('https://*.doubleclick.net/') // needed for google ads - found experimentally
    server.directives.connectSrc.push(
      'https://*.google.com',
      'https://stats.g.doubleclick.net',
      'https://www.googleadservices.com'
    ) // found experimentally
    server.directives.styleSrc.push('https://*.googletagmanager.com/') // found experimentally

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
