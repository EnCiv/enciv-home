'use strict'

// getting many hits to /wp-content/uploads/2019/01/enciv-logo.png from servers around the world, for no apparent reason
// and some other prodes to /wp-content

var hitCount = 0

export default function route() {
  this.app.get('/wp-content/uploads/2019/01/enciv-logo.png', (req, res) => {
    if (!hitCount++)
      setTimeout(() => {
        logger.info('hits to /wp-content/uploads/2019/01/enciv-logo.png in the last hour:', hitCount)
        hitCount = 0
      }, 60 * 60 * 1000)
    res.sendStatus(403)
  })
}
