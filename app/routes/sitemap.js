import express from 'express'
import fs from 'fs'
import path from 'path'
import getSitemap from '../tools/getSitemap'

const router = express.Router()

const sitemapPath = path.resolve(__dirname, '../../sitemap.xml')
console.log('Sitemap path:', sitemapPath)
router.get('/sitemap.xml', (req, res) => {
  fs.readFile(sitemapPath, (err, data) => {
    if (err) {
      console.error('Error reading sitemap file:', err)
      res.status(500).send('Internal Server Error')
    } else {
      getSitemap()
      res.setHeader('Content-Type', 'application/xml')
      res.status(200).send(data)
    }
  })
})

export default router
