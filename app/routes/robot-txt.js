'use strict'

// when robots.txt is visited by a crawler, this is how to respond
export default function robots() {
  this.app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send(
      '\
User-agent: Mediapartners-Google*\n\
Disallow:\n\
User-agent: Googlebot\n\
Disallow:\n\
User-agent: AdsBot-Google\n\
Disallow:\n\
User-agent: Googlebot-Image\n\
Disallow:\n\
\n\
User-agent: *\n\
Allow: /\n\
\n\
Sitemap: https://enciv.org/sitemap.xml\n\
'
    )
  })
}
