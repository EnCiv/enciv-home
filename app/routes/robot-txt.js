'use strict'

// when robots.txt is visited by a crawler, this is how to respond
export default function robots() {
  this.app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send(
      '\
User-agent: Mediapartners-Google*\r\n\
Allow: /\r\n\
\r\n\
User-agent: *\r\n\
Allow: /\r\n\
\r\n\
Sitemap: https://enciv.org/sitemap.xml\r\n\
'
    )
  })
}
