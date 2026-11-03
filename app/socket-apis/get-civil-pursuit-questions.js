'use strict'

import { Iota } from 'civil-server'

// Cache for storing results
let cachedResults = null
let cacheTimestamp = null
const CACHE_DURATION = 6 * 60 * 1000 // 6 minutes in milliseconds

// Export function to clear cache (for testing)
export function clearCache() {
  cachedResults = null
  cacheTimestamp = null
}

export default async function getCivilPursuitQuestions(cb) {
  // this does not require user authentication
  if (typeof cb !== 'function') {
    logger.error('get-civil-pursuit-questions: callback is not a function')
    return
  }

  // Check if we have valid cached results
  const now = Date.now()
  if (cachedResults && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    cb(cachedResults)
    return
  }

  try {
    const results = await Iota.aggregate([
      {
        $match: {
          'webComponent.webComponent': 'CivilPursuit',
          'webComponent.status': 'active',
        },
      },
      { $sort: { 'webComponent.order': 1, _id: 1 } },
      { $addFields: { 'webComponent._id': '$_id' } },
      { $addFields: { 'webComponent.path': '$path' } },
      { $addFields: { 'webComponent.subject': '$subject' } },
      { $addFields: { 'webComponent.description': '$description' } },
      { $replaceRoot: { newRoot: '$webComponent' } },
    ]).toArray()

    // Update cache
    cachedResults = results
    cacheTimestamp = now

    cb(results)
  } catch (err) {
    logger.error('get-civil-pursuit-questions', err)
    cb()
  }
}
