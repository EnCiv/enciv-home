'use strict'

import { Iota } from 'civil-server'

export default async function getArticles(skip = 0, limit = 10, cb) {
  // this does not require user authentication if (!this.synuser) return cb && cb() // if no user do nothing
  try {
    const results = await Iota.aggregate([
      { $match: { "webComponent.webComponent": 'Article' } },
      { $sort: { "webComponent.article.date": -1 } },
      { $limit: skip + limit },
      { $skip: skip },
      { $addFields: { 'webComponent.article._id': '$_id' } },
      { $replaceRoot: { newRoot: '$webComponent.article' } },
    ])
    cb && cb(results)
  } catch (err) {
    logger.error('get-articles', err)
    cb && cb()
  }
}
