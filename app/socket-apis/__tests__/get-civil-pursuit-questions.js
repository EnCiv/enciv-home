// https://github.com/EnCiv/enciv-home/issues/80

import getCivilPursuitQuestions, { clearCache } from '../get-civil-pursuit-questions'
import { Iota } from 'civil-server'
import { Mongo } from '@enciv/mongo-collections'
import { MongoMemoryServer } from 'mongodb-memory-server'

const ObjectID = require('bson-objectid')

let MemoryServer
let loggerErrorSpy

// Mock the global logger
global.logger = {
  error: jest.fn(),
}

beforeAll(async () => {
  MemoryServer = await MongoMemoryServer.create()
  const uri = MemoryServer.getUri()
  await Mongo.connect(uri)
})

afterAll(async () => {
  await Mongo.disconnect()
  await MemoryServer.stop()
})

beforeEach(async () => {
  // Clear logger mock calls
  logger.error.mockClear()
  // Clear the collection before each test
  try {
    await Iota.deleteMany({})
  } catch (err) {
    // Ignore errors if DB is not connected (for disconnect test)
  }
  // Clear the cache before each test
  clearCache()
})

afterEach(async () => {
  // No cleanup needed for logger mock
})

describe('getCivilPursuitQuestions', () => {
  test('Returns empty array when no Civil Pursuit questions exist', async () => {
    const cb = jest.fn()

    await getCivilPursuitQuestions.call({}, cb)

    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith([])
  })

  test('Logs error and returns if callback is not a function', async () => {
    await getCivilPursuitQuestions.call({}, null)

    expect(logger.error).toHaveBeenCalledWith('get-civil-pursuit-questions: callback is not a function')
  })

  test('Returns only active Civil Pursuit questions', async () => {
    const cb = jest.fn()

    // Insert test data with different statuses
    const questions = [
      {
        _id: ObjectID().toString(),
        path: '/question/1',
        subject: 'What are the biggest challenges?',
        webComponent: {
          webComponent: 'CivilPursuit',
          status: 'active',
          order: 1,
        },
      },
      {
        _id: ObjectID().toString(),
        path: '/question/2',
        subject: 'Inactive question',
        webComponent: {
          webComponent: 'CivilPursuit',
          status: 'inactive',
          order: 2,
        },
      },
      {
        _id: ObjectID().toString(),
        path: '/question/3',
        subject: 'How can we improve?',
        webComponent: {
          webComponent: 'CivilPursuit',
          status: 'active',
          order: 3,
        },
      },
      {
        _id: ObjectID().toString(),
        path: '/article/1',
        subject: 'Not a question',
        webComponent: {
          webComponent: 'Article',
          status: 'active',
        },
      },
    ]

    await Iota.insertMany(questions)

    await getCivilPursuitQuestions.call({}, cb)

    expect(cb).toHaveBeenCalledTimes(1)
    const results = cb.mock.calls[0][0]
    expect(results).toHaveLength(2)
    expect(results[0].subject).toBe('What are the biggest challenges?')
    expect(results[1].subject).toBe('How can we improve?')
  })

  test('Sorts questions by order field, then by _id', async () => {
    const cb = jest.fn()

    const id1 = ObjectID().toString()
    const id2 = ObjectID().toString()
    const id3 = ObjectID().toString()

    // Insert in random order
    const questions = [
      {
        _id: id2,
        path: '/question/2',
        subject: 'Question 2',
        webComponent: {
          webComponent: 'CivilPursuit',
          status: 'active',
          order: 3,
        },
      },
      {
        _id: id1,
        path: '/question/1',
        subject: 'Question 1',
        webComponent: {
          webComponent: 'CivilPursuit',
          status: 'active',
          order: 1,
        },
      },
      {
        _id: id3,
        path: '/question/3',
        subject: 'Question 3',
        webComponent: {
          webComponent: 'CivilPursuit',
          status: 'active',
          order: 2,
        },
      },
    ]

    await Iota.insertMany(questions)

    await getCivilPursuitQuestions.call({}, cb)

    expect(cb).toHaveBeenCalledTimes(1)
    const results = cb.mock.calls[0][0]
    expect(results).toHaveLength(3)
    expect(results[0].subject).toBe('Question 1')
    expect(results[1].subject).toBe('Question 3')
    expect(results[2].subject).toBe('Question 2')
  })

  test('Includes _id and path in returned results', async () => {
    const cb = jest.fn()

    const questionId = ObjectID().toString()
    const questionPath = '/question/test'

    const question = {
      _id: questionId,
      path: questionPath,
      subject: 'Test question',
      webComponent: {
        webComponent: 'CivilPursuit',
        status: 'active',
        order: 1,
      },
    }

    await Iota.insertMany([question])

    await getCivilPursuitQuestions.call({}, cb)

    expect(cb).toHaveBeenCalledTimes(1)
    const results = cb.mock.calls[0][0]
    expect(results).toHaveLength(1)
    expect(results[0]._id).toBe(questionId)
    expect(results[0].path).toBe(questionPath)
    expect(results[0].subject).toBe('Test question')
  })

  test('Returns questions with no order field sorted by _id', async () => {
    const cb = jest.fn()

    const id1 = '000000000000000000000001'
    const id2 = '000000000000000000000002'

    const questions = [
      {
        _id: id2,
        path: '/question/2',
        subject: 'Question 2',
        webComponent: {
          webComponent: 'CivilPursuit',
          status: 'active',
        },
      },
      {
        _id: id1,
        path: '/question/1',
        subject: 'Question 1',
        webComponent: {
          webComponent: 'CivilPursuit',
          status: 'active',
        },
      },
    ]

    await Iota.insertMany(questions)

    await getCivilPursuitQuestions.call({}, cb)

    expect(cb).toHaveBeenCalledTimes(1)
    const results = cb.mock.calls[0][0]
    expect(results).toHaveLength(2)
    expect(results[0]._id).toBe(id1)
    expect(results[1]._id).toBe(id2)
  })

  test('Includes subject and description fields from root level', async () => {
    const cb = jest.fn()

    const questionId = ObjectID().toString()
    const questionSubject = 'What should we do about climate change?'
    const questionDescription = 'This is a detailed description of the climate change question.'

    const question = {
      _id: questionId,
      path: '/question/climate',
      subject: questionSubject,
      description: questionDescription,
      webComponent: {
        webComponent: 'CivilPursuit',
        status: 'active',
        order: 1,
      },
    }

    await Iota.insertMany([question])

    await getCivilPursuitQuestions.call({}, cb)

    expect(cb).toHaveBeenCalledTimes(1)
    const results = cb.mock.calls[0][0]
    expect(results).toHaveLength(1)
    expect(results[0].subject).toBe(questionSubject)
    expect(results[0].description).toBe(questionDescription)
  })

  test('Returns questions with subject and description even when not defined', async () => {
    const cb = jest.fn()

    const questionId = ObjectID().toString()

    const question = {
      _id: questionId,
      path: '/question/test',
      // subject and description not defined at root level
      webComponent: {
        webComponent: 'CivilPursuit',
        status: 'active',
        order: 1,
      },
    }

    await Iota.insertMany([question])

    await getCivilPursuitQuestions.call({}, cb)

    expect(cb).toHaveBeenCalledTimes(1)
    const results = cb.mock.calls[0][0]
    expect(results).toHaveLength(1)
    // When not defined at root level, $addFields will still add the field but with undefined value
    // MongoDB's $addFields adds fields even if they don't exist in the source
    expect(results[0].subject).toBeUndefined()
    expect(results[0].description).toBeUndefined()
  })

  test('Returns cached results within 6 minutes', async () => {
    const cb1 = jest.fn()
    const cb2 = jest.fn()

    const questionId = ObjectID().toString()
    const question = {
      _id: questionId,
      path: '/question/cache-test',
      subject: 'Cache Test Question',
      webComponent: {
        webComponent: 'CivilPursuit',
        status: 'active',
        order: 1,
      },
    }

    await Iota.insertMany([question])

    // First call - should query database
    await getCivilPursuitQuestions.call({}, cb1)
    expect(cb1).toHaveBeenCalledTimes(1)
    const results1 = cb1.mock.calls[0][0]
    expect(results1).toHaveLength(1)
    expect(results1[0].subject).toBe('Cache Test Question')

    // Add a new question to database
    const newQuestion = {
      _id: ObjectID().toString(),
      path: '/question/new',
      subject: 'New Question',
      webComponent: {
        webComponent: 'CivilPursuit',
        status: 'active',
        order: 2,
      },
    }
    await Iota.insertMany([newQuestion])

    // Second call immediately after - should return cached results (only 1 question)
    await getCivilPursuitQuestions.call({}, cb2)
    expect(cb2).toHaveBeenCalledTimes(1)
    const results2 = cb2.mock.calls[0][0]
    expect(results2).toHaveLength(1) // Still only 1 question from cache
    expect(results2[0].subject).toBe('Cache Test Question')
  })

  test('Refreshes cache after 6 minutes', async () => {
    const cb1 = jest.fn()
    const cb2 = jest.fn()

    const questionId = ObjectID().toString()
    const question = {
      _id: questionId,
      path: '/question/cache-expire-test',
      subject: 'Cache Expire Test',
      webComponent: {
        webComponent: 'CivilPursuit',
        status: 'active',
        order: 1,
      },
    }

    await Iota.insertMany([question])

    // First call - should query database
    await getCivilPursuitQuestions.call({}, cb1)
    expect(cb1).toHaveBeenCalledTimes(1)
    const results1 = cb1.mock.calls[0][0]
    expect(results1).toHaveLength(1)

    // Mock time advancement (6 minutes + 1ms)
    const realDateNow = Date.now
    const mockTime = realDateNow() + 6 * 60 * 1000 + 1
    Date.now = jest.fn(() => mockTime)

    // Add a new question
    const newQuestion = {
      _id: ObjectID().toString(),
      path: '/question/new-after-expire',
      subject: 'New After Expire',
      webComponent: {
        webComponent: 'CivilPursuit',
        status: 'active',
        order: 2,
      },
    }
    await Iota.insertMany([newQuestion])

    // Second call after cache expiry - should query database again and get 2 questions
    await getCivilPursuitQuestions.call({}, cb2)
    expect(cb2).toHaveBeenCalledTimes(1)
    const results2 = cb2.mock.calls[0][0]
    expect(results2).toHaveLength(2) // Should now see both questions

    // Restore Date.now
    Date.now = realDateNow
  })
})
