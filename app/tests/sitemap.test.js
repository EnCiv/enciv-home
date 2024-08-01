// Test ../routes/sitemap.js

import fs from 'fs'
import request from 'supertest'
import express from 'express'
import sitemapRouter from '../routes/sitemap'

jest.mock('fs')
jest.mock('../tools/getSitemap', () => jest.fn())

const app = express()
app.use('/', sitemapRouter)

describe('GET /sitemap.xml', () => {
  it('should respond with sitemap.xml content', async () => {
    const sitemapContent = '<urlset><url><loc>http://example.com/</loc></url></urlset>'
    fs.readFile.mockImplementation((filePath, callback) => {
      callback(null, sitemapContent)
    })

    const response = await request(app).get('/sitemap.xml')

    expect(response.status).toBe(200)
    expect(response.header['content-type']).toContain('application/xml')
    expect(response.text).toBe(sitemapContent)
  })

  it('should respond with 500 if there is an error reading the sitemap file', async () => {
    fs.readFile.mockImplementation((filePath, callback) => {
      callback(new Error('File read error'), null)
    })

    const response = await request(app).get('/sitemap.xml')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Internal Server Error')
  })
})
