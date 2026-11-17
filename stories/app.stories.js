import React, { useLayoutEffect, useState } from 'react'
import { waitFor, expect, userEvent, within } from 'storybook/test'

import App from '../app/components/app'
import iotas from '../iotas.json'
const iota = iotas.find(i => i.path === '/')
const blogArticleIota = iotas.find(i => i.path === '/posts/a-new-vision-of-democracy')
const blogStoryArticles = Array.from({ length: 12 }, (_, index) => {
  const article = blogArticleIota.webComponent.article
  const sampleNumber = index + 1
  return {
    ...article,
    _id: `blog-story-article-${sampleNumber}`,
    path: blogArticleIota.path,
    title: index === 0 ? article.title : `Storybook sample ${sampleNumber}: ${article.title}`,
    content:
      index === 0
        ? article.content
        : `<p>Sample article ${sampleNumber} for demonstrating Blog pagination and staggered card entrances.</p>`,
  }
})

function AppStoryRouter({ iota: initialIota, ...props }) {
  const [currentIota, setCurrentIota] = useState(initialIota)

  useLayoutEffect(() => {
    const previousSocket = window.socket
    const storySocket = Object.create(previousSocket || null)
    storySocket.on = () => {}
    storySocket.emit = (event, ...args) => {
      if (event === 'get-user-discussions') {
        args.at(-1)?.([])
        return
      }
      if (event === 'get-articles') {
        const [skip = 0, limit = 10] = args
        args.at(-1)?.(blogStoryArticles.slice(skip, skip + limit))
        return
      }
      if (event === 'get-civil-pursuit-questions') {
        const questions = iotas
          .filter(page => {
            const webComponent =
              typeof page.webComponent === 'string' ? page.webComponent : page.webComponent?.webComponent
            return webComponent === 'CivilPursuit'
          })
          .map(({ _id, path, subject }) => ({ _id: String(_id?.$oid ?? _id), path, subject }))
        args.at(-1)?.(questions)
        return
      }
      if (event === 'subscribe-deliberation') args.at(-1)?.({ uInfo: [] })
    }
    window.socket = storySocket
    return () => {
      if (previousSocket) window.socket = previousSocket
      else delete window.socket
    }
  }, [])

  const navigate = path => {
    const page = iotas.find(candidate => candidate.path === path)
    if (page) setCurrentIota(page)
  }
  const handleLinkClick = event => {
    const link = event.target.closest?.('a[href]')
    const path = link?.getAttribute('href')
    if (!iotas.some(page => page.path === path)) return
    event.preventDefault()
    navigate(path)
  }

  return (
    <div onClickCapture={handleLinkClick}>
      <App key={currentIota.path} {...props} iota={currentIota} onNavigate={navigate} />
    </div>
  )
}

export default {
  title: 'App',
  component: App,
  argTypes: {},
  render: args =>
    args.iota ? <AppStoryRouter key={args.iota.path} {...args} /> : <App {...args} />,
}
if (!global.logger) global.logger = console

export const Home = {
  args: { iota },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole('link', { name: 'Learn More' }).getAttribute('href')).toBe('/about')
    expect(canvas.getByRole('link', { name: 'Start Discussion' }).getAttribute('href')).toBe('/national-deliberations')
    expect(canvas.getByRole('button', { name: 'Subscribe for free' })).toBeTruthy()

    const navigateToMission = async () => {
      const mobileMenuToggle = canvas.queryByRole('button', { name: '≡' })
      if (mobileMenuToggle) {
        await userEvent.click(mobileMenuToggle)
        await userEvent.click(canvas.getByRole('button', { name: /About/ }))
      } else {
        await userEvent.hover(canvas.getByText(/About/))
      }
      await userEvent.click(canvas.getByRole('button', { name: 'Our Mission' }))
    }

    const navigateHome = async () => {
      const mobileMenuToggle = canvas.queryByRole('button', { name: '≡' })
      if (mobileMenuToggle) {
        await userEvent.click(mobileMenuToggle)
        await userEvent.click(canvas.getAllByText('Home', { exact: true }).at(-1))
      } else {
        await userEvent.click(canvas.getByRole('button', { name: 'Home' }))
      }
    }

    for (let iteration = 0; iteration < 3; iteration++) {
      await navigateToMission()
      await waitFor(() => expect(canvas.getByRole('heading', { name: 'Our Mission', level: 1 })).toBeTruthy())

      await navigateHome()
      await waitFor(() => {
        const heading = canvas.getByRole('heading', { name: 'Politics is dividing us.' })
        expect(getComputedStyle(heading).color).toBe('rgb(251, 188, 13)')
        expect(parseFloat(getComputedStyle(heading).fontSize)).toBeGreaterThan(20)
      })
    }
  },
}

export const About = {
  args: { iota: iotas.find(i => i.path === '/about') },
}

const pageStory = path => ({ args: { iota: iotas.find(i => i.path === path) } })

export const LegacyHome = pageStory('/home')
export const IRSForms = pageStory('/irs-forms')
export const OurTools = {
  args: { iota: iotas.find(i => i.path === '/our-tools') },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const undebates = canvas.getByRole('link', { name: 'See Undebates in Action' })
    const civilPursuit = canvas.getByRole('button', { name: 'Coming Soon' })
    await waitFor(() => {
      expect(undebates.getBoundingClientRect().height).toBe(civilPursuit.getBoundingClientRect().height)
      expect(getComputedStyle(undebates).color).toBe(getComputedStyle(civilPursuit).color)
    })
  },
}
export const CivilPursuit = {
  args: { iota: iotas.find(i => i.path === '/civil-pursuit') },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole('heading', { name: 'Civic Pursuit', level: 1 })).toBeTruthy()
    expect(canvas.getByRole('heading', { name: 'Your Guide to Community Priorities' })).toBeTruthy()
    expect(canvas.getByRole('heading', { name: 'Volunteer with Us' })).toBeTruthy()
    await waitFor(() => {
      const images = Array.from(canvasElement.querySelectorAll('img'))
      expect(images.every(image => image.src.endsWith('.webp') && image.complete && image.naturalWidth > 0)).toBe(true)
    })
  },
}
export const Terms = pageStory('/terms')
export const Privacy = pageStory('/privacy')
export const Cookies = pageStory('/cookies')
export const Nondiscrimination = pageStory('/nondiscrimination')
export const ResetPassword = pageStory('/resetPassword')
export const FirstUSA = pageStory('/what-first-usa-1')
export const NationalDeliberations = pageStory('/national-deliberations')
export const StructuralUSA = pageStory('/what-structural-usa-1')
export const LongTermUSA = pageStory('/what-long-term-usa-1')
export const QuestionsUSA = pageStory('/what-questions-usa-1')
export const GovernmentToDo = pageStory('/what-do-we-want-government-to-do-2025')
export const Direction500 = pageStory('/direction-500')
export const Profile = pageStory('/profile')
export const TwoHundredFiftyYears = pageStory('/250years')

export const NothingHere = {}

export const Article = {
  args: { iota: iotas.find(i => i.path === '/posts/a-new-vision-of-democracy') },
}

export const Blog = {
  args: { iota: iotas.find(i => i.path === '/articles') },
  play: async ({ canvasElement }) => {
    const cards = () => canvasElement.querySelectorAll('button[class*="thumbnail"]')
    await waitFor(() => expect(cards()).toHaveLength(10))
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Load More' }))
    await waitFor(() => expect(cards()).toHaveLength(12))
  },
}

// ---------------------------------------------------------------------------
// Pre-migration baseline stories (T1 — docs/update2026.md)
//
// These play functions document and verify the current rendering behaviour of
// App before the update2026 migration changes it.  They must stay green
// throughout every migration step.
// ---------------------------------------------------------------------------

/**
 * Verifies that App with a valid iota renders the top-nav and the web-component
 * area without crashing (covers react-hot-loader wrapper, ThemeProvider, Helmet).
 */
export const WithIota_RendersNavAndContent = {
  name: 'WithIota — renders nav and content (pre-migration baseline)',
  args: { iota },
  play: async ({ canvasElement }) => {
    // TopNavBar from civil-pursuit renders nav links — wait for text to appear
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Home')
    })
    expect(canvasElement.textContent).toContain('Articles')
  },
}

/**
 * Verifies that App without an iota renders the not-found page and Footer.
 */
export const WithoutIota_RendersFallback = {
  name: 'WithoutIota — renders not-found content',
  args: {},
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(within(canvasElement).getByRole('heading', { name: "We couldn't find that page." })).toBeTruthy()
    })
    expect(canvasElement.textContent).toContain('Terms')
  },
}

/**
 * Verifies that a logged-in user (user.id present) sees account-related
 * nav items in the TopNavBar menu.
 */
export const WithIota_LoggedInUser = {
  name: 'WithIota — logged-in user sees account nav items (pre-migration baseline)',
  args: { iota, user: { id: 'user-test-123', name: 'Test User' } },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Home')
    })
    // My Account sub-menu item is only added when user.id is truthy
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('My Account')
    })
  },
}

/**
 * Verifies that an iota with no subject does not crash the component
 * (the Helmet title defaults to 'EnCiv').
 */
export const WithIota_NoSubject = {
  name: 'WithIota — no subject does not crash (pre-migration baseline)',
  args: { iota: { ...iota, subject: undefined } },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Home')
    })
  },
}
