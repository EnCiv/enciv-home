//https://github.com/EnCiv/enciv-home/issues/23

import { Iota } from 'civil-server'
import { SitemapStream, streamToPromise } from 'sitemap'

// Function to generate the sitemap as a string
async function getSitemap() {
  try {
    // Fetch Iota objects from the database
    const iotas = await Iota.find({ path: { $exists: true } }).toArray()
    //console.log('Fetched Iotas from database:', iotas)

    // Check if iotas data is successfully retrieved
    if (iotas.length > 0) {
      const links = iotas.map(item => ({
        url: item.path, // Use path from iotas
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      }))

      // Create a SitemapStream to generate the sitemap
      const sitemapStream = new SitemapStream({ hostname: 'https://www.enciv.org' })

      // Write the links to the sitemap stream
      links.forEach(link => sitemapStream.write(link))
      sitemapStream.end()

      // Convert the sitemap stream to a string
      const sitemap = await streamToPromise(sitemapStream).then(data => data.toString())

      return sitemap
    } else {
      console.log('No Iotas found with path property to generate sitemap.')
      return null
    }
  } catch (err) {
    console.error('Error fetching data from Iota:', err)
    throw err
  }
}

export default function sitemap() {
  this.app.get('/sitemap.xml', async (req, res) => {
    try {
      const sitemap = await getSitemap()

      if (sitemap) {
        res.header('Content-Type', 'application/xml')
        res.send(sitemap)
      } else {
        res.status(404).send('Sitemap not found')
      }
    } catch (err) {
      console.error('Error generating or sending sitemap:', err)
      res.status(500).send('Error generating sitemap')
    }
  })
}
