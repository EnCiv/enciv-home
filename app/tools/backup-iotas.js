#!/usr/bin/env node
import { Iota } from 'civil-server'
import MongoModels from 'mongo-models'
// Iota uses logger
import log4js from 'log4js'
import fs from 'fs'

if (!global.logger) {
  global.logger = log4js.getLogger('node')
  log4js.configure({
    appenders: { err: { type: 'stderr' } },
    categories: { default: { appenders: ['err'], level: 'DEBUG' } },
  })
}

async function main() {
  await MongoModels.connect({ uri: args.db }, { useUnifiedTopology: true })
  while (MongoModels.toInit && MongoModels.toInit.length) {
    // any models that need to createIndexes will push their init function
    MongoModels.toInit.shift()()
  }
  const iotas = await Iota.aggregate({ $match: true }).toArray()
  console.info('length', iotas.length)

  var output = JSON.stringify(iotas)
  fs.writeFile(args.dst + '.json', output, function (err) {
    if (err) throw err
    console.log(args.dst + '.json' + ' saved. ' + iotas.length + ' records.')
  })
  MongoModels.disconnect()
}

// fetch args from command line
var argv = process.argv
var args = {}
for (let arg = 2; arg < argv.length; arg++) {
  switch (argv[arg]) {
    case 'db':
    case 'dst':
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
if (!args.dst) {
  console.error('dst file expected')
  process.exit()
}
main()
