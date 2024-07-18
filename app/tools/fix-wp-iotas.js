#!/usr/bin/env node

// Take articles out of a wordpress site and write them into the Iota collection

// need to run this out of dist/tools
// need to use npm run transpile to do so

/**
 *  This is an example post from wordpress
 * {
    "id": 2372,
    "date": "2021-05-24T16:49:37",
    "date_gmt": "2021-05-24T16:49:37",
    "guid": {
        "rendered": "http://enciv.org/?p=2372"
    },
    "modified": "2021-05-24T16:49:37",
    "modified_gmt": "2021-05-24T16:49:37",
    "slug": "a-new-vision-of-democracy",
    "status": "publish",
    "type": "post",
    "link": "https://enciv.org/a-new-vision-of-democracy/",
    "title": {
        "rendered": "A New Vision of Democracy"
    },
    "content": {
        "rendered": "[vc_row type=&#8221;in_container&#8221; full_screen_row_position=&#8221;middle&#8221; scene_position=&#8221;center&#8221; text_color=&#8221;dark&#8221; text_align=&#8221;left&#8221; overlay_strength=&#8221;0.3&#8243; shape_divider_position=&#8221;bottom&#8221; bg_image_animation=&#8221;none&#8221;][vc_column column_padding=&#8221;no-extra-padding&#8221; column_padding_position=&#8221;all&#8221; background_color_opacity=&#8221;1&#8243; background_hover_color_opacity=&#8221;1&#8243; column_link_target=&#8221;_self&#8221; column_shadow=&#8221;none&#8221; column_border_radius=&#8221;none&#8221; width=&#8221;1/1&#8243; tablet_width_inherit=&#8221;default&#8221; tablet_text_alignment=&#8221;default&#8221; phone_text_alignment=&#8221;default&#8221; column_border_width=&#8221;none&#8221; column_border_style=&#8221;solid&#8221; bg_image_animation=&#8221;none&#8221;][vc_column_text]EnCiv&#8217;s David Fridley has been working in the field of online democracy for years.  He shared an early statement of his vision for an &#8220;Online Deliberative Constitutional Representative Democracy&#8221; on <a href=\"https://www.quora.com/\">Quora</a>.</p>\n<p><img loading=\"lazy\" decoding=\"async\" class=\"alignleft\" src=\"https://media.istockphoto.com/photos/national-championship-bracket-picture-id480610791?b=1&amp;k=6&amp;m=480610791&amp;s=170x170&amp;h=py1oKrEL3DqP0l0pAziFMHKWyXIOjtxzgOjcpoZACAk=\" alt=\"National Championship Bracket\" width=\"245\" height=\"164\" />You can read the original post <a href=\"https://www.quora.com/What-will-replace-democracy/answer/David-Fridley-1?ch=10&amp;share=b1012faf&amp;srid=tUBe\">here</a>.  While it focuses on national deliberation, keep in mind that the technology at its core could also be used at smaller scales.  Indeed, because small tournaments can be run in less time than larger ones, the smaller the scale, the faster the tool would produce meaningful results.  Deliberation &#8220;at scale&#8221; isn&#8217;t different from deliberation with your immediate neighbors or club members; it just takes longer.  But not a great deal longer.  As Fridley points out in his post, eight or nine rounds of deliberation would be enough to connect the whole US population in a single deliberative event.  Collective deliberation on such a scale would be unprecedented.  Would it take any longer than an election, which is the collective expression of &#8220;the people&#8217;s will&#8221;?  Let&#8217;s try it and find out.[/vc_column_text][/vc_column][/vc_row]\n",
        "protected": false
    },
    "excerpt": {
        "rendered": "<p>[vc_row type=&#8221;in_container&#8221; full_screen_row_position=&#8221;middle&#8221; scene_position=&#8221;center&#8221; text_color=&#8221;dark&#8221; text_align=&#8221;left&#8221; overlay_strength=&#8221;0.3&#8243; shape_divider_position=&#8221;bottom&#8221; bg_image_animation=&#8221;none&#8221;][vc_column column_padding=&#8221;no-extra-padding&#8221; column_padding_position=&#8221;all&#8221; background_color_opacity=&#8221;1&#8243; background_hover_color_opacity=&#8221;1&#8243; column_link_target=&#8221;_self&#8221; column_shadow=&#8221;none&#8221; column_border_radius=&#8221;none&#8221; width=&#8221;1/1&#8243; tablet_width_inherit=&#8221;default&#8221; tablet_text_alignment=&#8221;default&#8221; phone_text_alignment=&#8221;default&#8221; column_border_width=&#8221;none&#8221; column_border_style=&#8221;solid&#8221; bg_image_animation=&#8221;none&#8221;][vc_column_text]EnCiv&#8217;s David Fridley has been working in the&#8230;</p>\n",
        "protected": false
    },
    "author": 3,
    "featured_media": 0,
    "comment_status": "closed",
    "ping_status": "closed",
    "sticky": false,
    "template": "",
    "format": "standard",
    "meta": {
        "footnotes": ""
    },
    "categories": [
        259,
        45
    ],
    "tags": [
        276,
        275
    ],
    "_links": {
        "self": [
            {
                "href": "https://enciv.org/wp-json/wp/v2/posts/2372"
            }
        ],
        "collection": [
            {
                "href": "https://enciv.org/wp-json/wp/v2/posts"
            }
        ],
        "about": [
            {
                "href": "https://enciv.org/wp-json/wp/v2/types/post"
            }
        ],
        "author": [
            {
                "embeddable": true,
                "href": "https://enciv.org/wp-json/wp/v2/users/3"
            }
        ],
        "replies": [
            {
                "embeddable": true,
                "href": "https://enciv.org/wp-json/wp/v2/comments?post=2372"
            }
        ],
        "version-history": [
            {
                "count": 1,
                "href": "https://enciv.org/wp-json/wp/v2/posts/2372/revisions"
            }
        ],
        "predecessor-version": [
            {
                "id": 2373,
                "href": "https://enciv.org/wp-json/wp/v2/posts/2372/revisions/2373"
            }
        ],
        "wp:attachment": [
            {
                "href": "https://enciv.org/wp-json/wp/v2/media?parent=2372"
            }
        ],
        "wp:term": [
            {
                "taxonomy": "category",
                "embeddable": true,
                "href": "https://enciv.org/wp-json/wp/v2/categories?post=2372"
            },
            {
                "taxonomy": "post_tag",
                "embeddable": true,
                "href": "https://enciv.org/wp-json/wp/v2/tags?post=2372"
            }
        ],
        "curies": [
            {
                "name": "wp",
                "href": "https://api.w.org/{rel}",
                "templated": true
            }
        ]
    }
}
 * 
 */

/**
 * A category looks like this:
 * [
  {
    "id": 259,
    "count": 4,
    "description": "",
    "link": "https://enciv.org/category/enciv-news/",
    "name": "EnCiv News",
    "slug": "enciv-news",
    "taxonomy": "category",
    "parent": 0,
    "meta": [],
    "_links": {
      "self": [
        {
          "href": "https://enciv.org/wp-json/wp/v2/categories/259"
        }
      ],
      "collection": [
        {
          "href": "https://enciv.org/wp-json/wp/v2/categories"
        }
      ],
      "about": [
        {
          "href": "https://enciv.org/wp-json/wp/v2/taxonomies/category"
        }
      ],
      "wp:post_type": [
        {
          "href": "https://enciv.org/wp-json/wp/v2/posts?categories=259"
        }
      ],
      "curies": [
        {
          "name": "wp",
          "href": "https://api.w.org/{rel}",
          "templated": true
        }
      ]
    }
  }
]
 */

import { Iota } from 'civil-server'
import MongoModels from 'mongo-models'
// Iota uses logger
import log4js from 'log4js'
import fetch from 'node-fetch'
const request = require('request')
import imageFixes from './image-fixes'
import moveToCloudinary from './wp-to-cloudinary'

if (!global.logger) {
  global.logger = log4js.getLogger('node')
  log4js.configure({
    appenders: { err: { type: 'stderr' } },
    categories: { default: { appenders: ['err'], level: 'DEBUG' } },
  })
}

// Wordpress Authors Bu Id
const AuthorsById = {
  2: 'Sorin Matei',
  3: 'Adolf Gundersen',
  4: 'seanvt',
  5: 'jthom',
  6: 'Grace Van Orman',
}

const WPDATA = {
  tags: {},
  categories: {},
}
async function wpFetchNamesFromIndexes(type, indexes) {
  const names = []
  for await (const index of indexes) {
    if (WPDATA[type][index]) {
      names.push(WPDATA[type][index].name)
      continue
    }
    const response = await fetch(`https://enciv.org/wp-json/wp/v2/${type}?include=${index}`)
    const tagInfo = await response.json()
    WPDATA[type][index] = tagInfo[0]
    names.push(tagInfo[0].name)
  }
  return names
}

function checkImage(url) {
  return new Promise((ok, ko) => {
    var options = {
      timeout: 1000,
      method: 'GET',
      url: url,
      encoding: null, // keeps the body as buffer
    }

    request(options, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        ok(true)
      } else ok(false)
    })
  })
}

const geturl = new RegExp('<img[^>]*src="([^"]+)"', 'g')

async function main() {
  let fails = 0
  await MongoModels.connect({ uri: args.db }, { useUnifiedTopology: true })
  while (MongoModels.toInit && MongoModels.toInit.length) {
    // any models that need to createIndexes will push their init function
    MongoModels.toInit.shift()()
  }
  const iotas = await Iota.aggregate([{ $match: { 'webComponent.webComponent': 'Article' } }]).toArray()
  console.info('iotas found:', iotas.length)
  for await (const iota of iotas) {
    const matched = iota.webComponent.article.content.matchAll(geturl)
    const urls = []
    let updated = false
    matched &&
      [...matched].forEach(grp => {
        urls.push(grp[1])
      })
    for await (const url of urls) {
      const index = imageFixes.findIndex(pair => pair[0] === url)
      if (index < 0) {
        if (url.startsWith('http://')) {
          const newUrl = url.replace('http://', 'https://')
          const f = await checkImage(newUrl)
          if (f) {
            console.info('upping secuirty', newUrl, iota.path)
            iota.webComponent.article.content = iota.webComponent.article.content.replace(url, newUrl)
            updated = true
          } else {
            console.info('not found with upped security:', newUrl, iota.path)
            fails++
            continue
          }
        } else {
          const found = await checkImage(url)
          if (found) continue
          console.info('not found:', iota.path, url)
          fails++
          continue
        }
      } else if (imageFixes[index][2]) {
        // if the image has already been moved - don't make another one
        //console.info("don't need to move it again:", imageFixes[index][2], iota.path)
        iota.webComponent.article.content = iota.webComponent.article.content.replace(url, imageFixes[index][2])
        updated = true
      } else if (!imageFixes[index][1]) {
        // there's no fix for this one.
        continue
      } else {
        //console.info('moving', url, imageFixes[index][1])
        const movedUrl = await moveToCloudinary(imageFixes[index][1])
        if (!movedUrl) {
          console.error('could not move:', url, imageFixes[index][1], iota.path)
          fails++
          continue
        }
        console.info('moved', url, imageFixes[index][1], movedUrl, iota.path)
        iota.webComponent.article.content = iota.webComponent.article.content.replace(url, movedUrl)
        updated = true
        imageFixes[index][2] = movedUrl
      }
    }
    if (!updated) continue
    const foundIota = await Iota.replaceOne({ path: iota.path }, iota, { upsert: true })
    //console.info({ foundIota })
  }
  console.info('number of failed links:', fails)
  MongoModels.disconnect()
}

// fetch args from command line
var argv = process.argv
var args = {}
for (let arg = 2; arg < argv.length; arg++) {
  switch (argv[arg]) {
    case 'db':
      args[argv[arg]] = argv[++arg]
      break
    default:
      console.error('ignoring unexpected argument:', argv[arg])
  }
}
if (!args.db) {
  console.error('db expected')
  process.exit()
}
main()
