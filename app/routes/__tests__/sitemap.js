const http = require('http')
const supertest = require('supertest')

// Mock the internal getSitemap function
const getSitemap = jest.fn()

// Re-define sitemap function to use the mock getSitemap
const sitemap = () => {
  return async (req, res) => {
    try {
      const sitemap = await getSitemap()

      if (sitemap) {
        res.writeHead(200, { 'Content-Type': 'application/xml' })
        res.end(sitemap)
      } else {
        res.writeHead(404)
        res.end('Sitemap not found')
      }
    } catch (err) {
      console.error('Error generating or sending sitemap:', err)
      res.writeHead(500)
      res.end('Error generating sitemap')
    }
  }
}

describe('sitemap', () => {
  let server

  beforeEach(() => {
    const requestListener = sitemap()
    server = http.createServer(requestListener)
  })

  afterEach(() => {
    server.close()
  })

  it('should respond with sitemap XML if getSitemap returns data', async () => {
    const mockSitemap = '<xml>mock sitemap</xml>'
    getSitemap.mockResolvedValue(mockSitemap)

    const response = await supertest(server).get('/sitemap.xml')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toBe('application/xml')
    expect(response.text).toBe(mockSitemap)
  })

  it('should respond with 404 if getSitemap returns null', async () => {
    getSitemap.mockResolvedValue(null)

    const response = await supertest(server).get('/sitemap.xml')

    expect(response.status).toBe(404)
    expect(response.text).toBe('Sitemap not found')
  })

  it('should respond with 500 if getSitemap throws an error', async () => {
    getSitemap.mockRejectedValue(new Error('Some error'))

    const response = await supertest(server).get('/sitemap.xml')

    expect(response.status).toBe(500)
    expect(response.text).toBe('Error generating sitemap')
  })
})
