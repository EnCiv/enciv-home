//https://github.com/EnCiv/enciv-home/issues/23

import { Iota } from 'civil-server'
import fs from 'fs'
import { SitemapStream } from 'sitemap'

// Export the getSitemap function as default
export default async function getSitemap() {
  try {
    // Fetch Iota objects from the database
    const iotas = await Iota.find({ path: { $exists: true } })
    // console.log('Fetched Iotas from database:', iotas)

    // Check if iotas data is successfully retrieved
    if (iotas.length > 0) {
      const links = iotas.map(item => ({
        url: item.path, // Use path from iotas
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      }))

      // Create a SitemapStream to generate the sitemap XML
      const sitemapStream = new SitemapStream({ hostname: 'https://www.enciv.org' })

      // Pipe the sitemap stream to a writable file
      const writeStream = fs.createWriteStream('sitemap.xml')
      sitemapStream.pipe(writeStream)

      // Write the links to the sitemap stream
      links.forEach(link => sitemapStream.write(link))
      sitemapStream.end()

      // Handle the finish and error events for the write stream
      writeStream.on('finish', () => {
        console.log('Sitemap generated successfully and written to sitemap.xml')
      })

      writeStream.on('error', err => {
        console.error('Error writing sitemap to file:', err)
      })
    } else {
      console.log('No Iotas found with path property to generate sitemap.')
    }
  } catch (err) {
    console.error('Error fetching data from Iota:', err)
  }
}
