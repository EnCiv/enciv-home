import { getSitemap } from '../sitemap'
import { Iota } from 'civil-server'
import { Mongo } from '@enciv/mongo-collections'
import { MongoMemoryServer } from 'mongodb-memory-server'

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

beforeEach(async () => {
  // Clean up the Iota collection before each test
  await Mongo.db.collection('iotas').deleteMany({})
})

describe('getSitemap Function', () => {
  test('Generates a sitemap string when Iotas with paths are present', async () => {
    // Insert mock Iota documents with paths
    const iotas = [
      { _id: '66831965f4713a6d48ec60e1', path: '/page1' },
      { _id: '66831965f4713a6d48ec60e2', path: '/page2' },
      { _id: '66831965f4713a6d48ec60e3', path: '/page3' },
    ]

    await Iota.preload(iotas)

    const sitemap = await getSitemap()

    expect(sitemap).toContain('<url><loc>https://www.enciv.org/page1</loc>')
    expect(sitemap).toContain('<url><loc>https://www.enciv.org/page2</loc>')
    expect(sitemap).toContain('<url><loc>https://www.enciv.org/page3</loc>')
  })

  test('Returns null when no Iotas have paths', async () => {
    // No Iota documents are inserted, so the collection is empty

    const sitemap = await getSitemap()

    expect(sitemap).toBeNull()
  })
})

describe('sitemap Route Handler', () => {
  test('Returns sitemap when Iotas with paths are present', async () => {
    // Insert mock Iota documents with paths
    const iotas = [
      { _id: '66831965f4713a6d48ec60e1', path: '/page1' },
      { _id: '66831965f4713a6d48ec60e2', path: '/page2' },
      { _id: '66831965f4713a6d48ec60e3', path: '/page3' },
    ]
    //await Mongo.db.collection('iotas').insertMany(iotas)
    await Iota.preload(iotas)

    const sitemap = await getSitemap()

    expect(sitemap).toContain('<url><loc>https://www.enciv.org/page1</loc>')
    expect(sitemap).toContain('<url><loc>https://www.enciv.org/page2</loc>')
    expect(sitemap).toContain('<url><loc>https://www.enciv.org/page3</loc>')
  })

  test('Returns null when no Iotas have paths', async () => {
    // No Iota documents are inserted, so the collection is empty

    const sitemap = await getSitemap()

    expect(sitemap).toBeNull()
  })
})
