const fs = require('fs')
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')

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

// Read data from iotas.json file
const data = readJSONFile('iotas.json')

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
  const pipeline = sitemapStream.pipe(createGzip())

  links.forEach(link => sitemapStream.write(link))
  sitemapStream.end()

  streamToPromise(pipeline)
    .then(sm => {
      fs.writeFileSync('sitemap.xml.gz', sm)
      console.log('Sitemap generated successfully and written to sitemap.xml.gz')
    })
    .catch(err => {
      console.error('Error writing sitemap to file:', err)
    })
} else {
  console.log('Failed to generate sitemap due to errors in reading the JSON file.')
}
