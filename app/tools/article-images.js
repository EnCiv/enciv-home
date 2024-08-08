#!/usr/bin/env node

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

const geturl = new RegExp(
  //'(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))',
  '<img .* src="([^"]+)"',
  'g'
)
async function main() {
  await MongoModels.connect({ uri: args.db }, { useUnifiedTopology: true })
  while (MongoModels.toInit && MongoModels.toInit.length) {
    // any models that need to createIndexes will push their init function
    MongoModels.toInit.shift()()
  }
  //const posts = await apiFetch({ path: 'https://enciv.org/wp-json/wp/v2/posts' }, { mode: 'no-cors' })
  const urls = []
  const articles = await Iota.aggregate([{ $match: { 'webComponent.webComponent': 'Article' } }]).toArray()
  for (const article of articles) {
    const matched = article?.webComponent?.article?.content?.matchAll(geturl)
    matched && [...matched].forEach(grp => urls.push(grp[1]))
  }
  console.info('got', urls.length, 'of them.')
  for await (const u of urls) {
    const status = await checkImage(u)
    console.info(u, status)
  }
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
