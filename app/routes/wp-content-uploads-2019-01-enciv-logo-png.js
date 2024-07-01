'use strict'

// getting many hits to /wp-content/uploads/2019/01/enciv-logo.png from servers around the world, for no apparent reason
// and some other prodes to /wp-content

var hitCount = 0

export default function route() {
  this.app.get('/wp-content/uploads/2019/01/enciv-logo.png', (req, res) => {
    res.redirect('https://res.cloudinary.com/hf6mryjpf/image/upload/c_scale,w_150/v1716583596/enciv_logo.png')
  })
}
