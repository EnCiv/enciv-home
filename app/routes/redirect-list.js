'use strict'

// maybe in the future this will come out of the environment, or a database, or a file or all

const list = [{ path: '/undebates', dst: 'https://cc.enciv.org/sitemap.xml' }]

export default function redirectList() {
  for (const red of list) {
    this.app.get(red.path, (req, res, next) => {
      try {
        res.redirect(red.dst)
      } catch (error) {
        this.emit('error', error)
      }
    })
  }
}
