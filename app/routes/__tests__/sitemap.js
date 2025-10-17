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

describe('getSitemap Function', () => {
  let sitemap
  test('Returns null when no Iotas have paths', async () => {
    // No Iota documents are inserted, so the collection is empty

    sitemap = await getSitemap()

    expect(sitemap).toBeNull()
  })

  test('Generates a sitemap string when Iotas with paths are present', async () => {
    // Insert mock Iota documents with paths
    const iotas = [
      {
        _id: '66831965f4713a6d48ec60e1',
        path: '/page1',
        metadata: { hide: true, lastModified: new Date('11/19/2024') },
      },
      {
        _id: '66831965f4713a6d48ec60e2',
        path: '/page2',
        metadata: { lastModified: new Date('11/18/2024') },
      },
      { _id: '66831965f4713a6d48ec60e3', path: '/page3' },
    ]

    await Iota.preload(iotas)

    sitemap = await getSitemap()
    expect(sitemap.length > 0).toBe(true)
  })
  test('sitemap does not contain hidden items', () => {
    expect(sitemap).not.toContain('https://www.enciv.org/page1')
  })
  test('sitemap uses lastModified metadata if present', () => {
    expect(sitemap).toContain(
      '<url><loc>https://www.enciv.org/page2</loc><lastmod>2024-11-18T00:00:00.000Z</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>'
    )
  })
  test('sitemap uses default setting is metadata not present', () => {
    expect(sitemap).toContain(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"><url><loc>https://www.enciv.org/page2</loc><lastmod>2024-11-18T00:00:00.000Z</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>https://www.enciv.org/page3</loc><lastmod>2025-10-17T00:00:00.000Z</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url></urlset>'
    )
  })
})
