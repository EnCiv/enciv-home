#!/usr/bin/env node

// generate a list of domains, from the images in the articles, so they can be added to server.directives.imgSrc in start.js

import { Iota } from 'civil-server'
import MongoModels from 'mongo-models'
// Iota uses logger
import log4js from 'log4js'
const request = require('request')

if (!global.logger) {
  global.logger = log4js.getLogger('node')
  log4js.configure({
    appenders: { err: { type: 'stderr' } },
    categories: { default: { appenders: ['err'], level: 'DEBUG' } },
  })
}

function checkImage(url) {
  return new Promise((ok, ko) => {
    var options = {
      timeout: 1000,
      method: 'GET',
      url: url,
      encoding: null, // keeps the body as buffer
    }

    request(options, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        ok(true)
      } else ok(false)
    })
  })
}

const geturl = new RegExp('<img[^>]*src="([^"]+)"', 'g')

async function main() {
  await MongoModels.connect({ uri: args.db }, { useUnifiedTopology: true })
  while (MongoModels.toInit && MongoModels.toInit.length) {
    // any models that need to createIndexes will push their init function
    MongoModels.toInit.shift()()
  }
  const iotas = await Iota.aggregate([{ $match: { 'webComponent.webComponent': 'Article' } }]).toArray()
  console.info('iotas found:', iotas.length)
  const origins = {}
  for await (const iota of iotas) {
    const matched = iota.webComponent.article.content.matchAll(geturl)
    const urls = []
    matched &&
      [...matched].forEach(grp => {
        urls.push(grp[1])
        const origin = new URL(grp[1]).origin
        if (!origins[origin]) origins[origin] = {}
      })
  }
  const goodOrigins = Object.keys(origins)
  goodOrigins.sort()
  console.info('num origins', goodOrigins.length)
  console.info('good origins', goodOrigins)
  MongoModels.disconnect()
}

// fetch args from command line
var argv = process.argv
var args = {}
for (let arg = 2; arg < argv.length; arg++) {
  switch (argv[arg]) {
    case 'db':
      args[argv[arg]] = argv[++arg]
      break
    default:
      console.error('ignoring unexpected argument:', argv[arg])
  }
}
if (!args.db) {
  console.error('db expected')
  process.exit()
}
main()
