import React, { useEffect } from 'react'
import { waitFor, expect, within } from 'storybook/test'

import App from '../app/components/app'
import iotas from '../iotas.json'
const iota = iotas.find(i => i.path === '/')

export default {
  title: 'App',
  component: App,
  argTypes: {},
}
if (!global.logger) global.logger = console

export const Home = {
  args: { iota },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole('link', { name: 'Learn More' }).getAttribute('href')).toBe('/about')
    expect(canvas.getByRole('link', { name: 'Start Discussion' }).getAttribute('href')).toBe('/national-deliberations')
  },
}

export const About = {
  args: { iota: iotas.find(i => i.path === '/about') },
}

const pageStory = path => ({ args: { iota: iotas.find(i => i.path === path) } })

export const LegacyHome = pageStory('/home')
export const IRSForms = pageStory('/irs-forms')
export const OurTools = pageStory('/our-tools')
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
  decorators: [
    Story => {
      // simulate socket api
      if (!window.socket) {
        window.socket = {
          emit: (handle, ...args) => {
            if (handle === 'get-articles') {
              setTimeout(() => {
                const iota = iotas.find(i => i.path === '/posts/a-new-vision-of-democracy')
                const article = iota.webComponent.article
                article.path = iota.path
                article._id = iota._id
                args.at(-1)([article])
              }, 1000)
            }
          },
        }
      }
      return <Story />
    },
  ],
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
 * Verifies that App without an iota renders the plain fallback ("Nothing Here")
 * and the local Footer without crashing.
 */
export const WithoutIota_RendersFallback = {
  name: 'WithoutIota — renders fallback content (pre-migration baseline)',
  args: {},
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Nothing Here')
    })
    // Local footer link should be visible
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
