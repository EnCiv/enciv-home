#!/usr/bin/env node

import cloudinary from 'cloudinary'

async function moveToCloudinary(url) {
  const name = url.split('/').at(-1)
  const dotParts = name.split('.')
  if (dotParts.at(-1) === 'jpg' || dotParts.at(-1) === '.png') {
    dotParts.splice(-1, 1)
  }
  const root = dotParts.join('.')
  try {
    const result = await cloudinary.v2.uploader.upload(url, {
      public_id: root,
      folder: 'wp-import',
      unique_filename: false,
    })
    //console.info('result', result)
    return result.secure_url
  } catch (error) {
    console.info('got error:', error)
    return false
  }
}

async function main() {
  const it = await moveToCloudinary(
    'https://enciv.org//wp-content/uploads/2019/01/infographic-1-copy.png-pdf-232x300.jpg'
  )
  console.info('it:', it)
}

export default moveToCloudinary
