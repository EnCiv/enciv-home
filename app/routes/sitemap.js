//https://github.com/EnCiv/enciv-home/issues/23

import { Iota } from 'civil-server'
import fs from 'fs'
import { SitemapStream } from 'sitemap'

// Function to read JSON data from file
function readJSONFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    console.log(`Successfully read data from ${filePath}`)
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading JSON file:', err)
    return null
  }
}

// Export the getSitemap function as default
export default async function getSitemap() {
  try {
    const iotas = await Iota.find({ path: { $exists: true } })
    console.log('Fetched Iotas from database:', iotas)

    // Read data from iotas.json file
    const data = readJSONFile('iotas.json')
    console.log('Data from iotas.json:', data)

    // Check if data is read correctly
    console.log('Data:', data)

    // Generate XML sitemap if data is successfully read
    if (data) {
      const links = data.map(item => ({
        url: item.path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      }))

      const sitemapStream = new SitemapStream({ hostname: 'https://www.enciv.org' })

      // Pipe the sitemap stream to a writable file
      const writeStream = fs.createWriteStream('sitemap.xml')
      sitemapStream.pipe(writeStream)

      links.forEach(link => sitemapStream.write(link))
      sitemapStream.end()

      writeStream.on('finish', () => {
        console.log('Sitemap generated successfully and written to sitemap.xml')
      })

      writeStream.on('error', err => {
        console.error('Error writing sitemap to file:', err)
      })
    } else {
      console.log('Failed to generate sitemap due to errors in reading the JSON file.')
    }
  } catch (err) {
    console.error('Error fetching data from Iota:', err)
  }
}
