import { Mongo } from '@enciv/mongo-collections'
import { MongoMemoryServer } from 'mongodb-memory-server'
import fs from 'fs'
import sitemap from '../sitemap'

jest.mock('fs')

let MemoryServer

beforeAll(async () => {
  MemoryServer = await MongoMemoryServer.create()
  const uri = MemoryServer.getUri()
  await Mongo.connect(uri)
})

afterAll(async () => {
  await Mongo.disconnect()
  await MemoryServer.stop()
})

test('Should generate sitemap with correct content', async () => {
  await Mongo.db.collection('iotas').insertMany([{ path: '/path1' }, { path: '/path2' }])

  const writeStream = {
    on: jest.fn(),
    write: jest.fn(),
    end: jest.fn(),
  }
  fs.createWriteStream.mockReturnValue(writeStream)

  const req = {}
  const res = {
    sendFile: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  }

  await sitemap()
    .app._router.stack.find(r => r.route && r.route.path === '/sitemap.xml')
    .route.stack[0].handle(req, res)

  expect(writeStream.write).toHaveBeenCalledWith(expect.objectContaining({ url: '/path1' }))
  expect(writeStream.write).toHaveBeenCalledWith(expect.objectContaining({ url: '/path2' }))

  const expectedContent = [
    { url: '/path1', changefreq: 'weekly', priority: 0.8 },
    { url: '/path2', changefreq: 'weekly', priority: 0.8 },
  ]

  expectedContent.forEach((content, index) => {
    expect(writeStream.write.mock.calls[index][0]).toMatchObject(content)
  })

  expect(writeStream.end).toHaveBeenCalled()

  expect(res.sendFile).toHaveBeenCalledWith('sitemap.xml', { root: '.' })
})

test('Should handle no Iotas found', async () => {
  const writeStream = {
    on: jest.fn(),
    write: jest.fn(),
    end: jest.fn(),
  }
  fs.createWriteStream.mockReturnValue(writeStream)

  const req = {}
  const res = {
    sendFile: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  }

  await sitemap()
    .app._router.stack.find(r => r.route && r.route.path === '/sitemap.xml')
    .route.stack[0].handle(req, res)

  expect(fs.createWriteStream).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.send).toHaveBeenCalledWith('Error generating sitemap')
})

test('Should handle errors during database fetch', async () => {
  const error = new Error('Database fetch error')
  jest.spyOn(Mongo.db.collection('iotas'), 'find').mockImplementationOnce(() => {
    throw error
  })

  console.error = jest.fn()

  const req = {}
  const res = {
    sendFile: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  }

  await sitemap()
    .app._router.stack.find(r => r.route && r.route.path === '/sitemap.xml')
    .route.stack[0].handle(req, res)

  expect(console.error).toHaveBeenCalledWith('Error fetching data from Iota:', error)
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.send).toHaveBeenCalledWith('Error generating sitemap')
})
