# enciv-home update2026 Migration Plan

**Date:** July 2026  
**Branch:** `update2026`  
**References:**
- [civil-server migration plan](https://github.com/EnCiv/civil-server/blob/update2026/doc/migration-plan.md)
- [civil-pursuit migration plan](https://github.com/EnCiv/civil-pursuit/blob/update2026/docs/civil-pursuit-migration-plan.md)
- [update2026 consuming-repo guide](https://github.com/EnCiv/civil-pursuit/blob/update2026/docs/update2026-migration.md)

This document tracks every change enciv-home must make to adopt the `update2026` branches of
`civil-server`, `civil-client`, and `civil-pursuit`. After this migration is tested and stable, all
three upstream repos will have their `update2026` branch merged to `main`.

---

## State Before Migration

| Item | Was |
|------|-----|
| Node | 18.13.0 |
| `civil-server` | `github:EnCiv/civil-server` (main, peerDep only) |
| `civil-client` | `github:EnCiv/civil-client` (main, peerDep only) |
| `civil-pursuit` | `github:EnCiv/civil-pursuit` (main) |
| React | 16.14.0 (implicit transitive dep) |
| Storybook | 7.6.17 |
| Enzyme | yes (`enzyme`, `enzyme-adapter-react-16`, `jest-enzyme`) |
| `react-hot-loader` | yes (used in `app/components/app.js`) |
| `react-helmet` | yes (used in `app.js`, `brevo-join.js`, `article.js`) |
| `log4js` | yes (in `app/tools/*.js` standalone scripts) |
| Babel plugins | deprecated `@babel/plugin-proposal-*` |

## Current State

| Item | Now |
|------|-----|
| Node | 20.20.2 (`.nvmrc`, `package.json engines`) |
| `civil-server` | `github:EnCiv/civil-server#update2026` v2.0.0 (in `dependencies`) |
| `civil-client` | `github:EnCiv/civil-client#update2026` v0.0.13 (in `dependencies`) |
| `civil-pursuit` | `github:EnCiv/civil-pursuit#update2026` v2.1.6 |
| React | 19.2.7 (explicit in `dependencies`) |
| Storybook | 10.5.0 ✓ |
| Enzyme | removed; `@testing-library/react` installed |
| `react-hot-loader` | removed from `app.js`; still transitive dep via civil-pursuit |
| `react-helmet` | replaced with `react-helmet-async` in all 3 files |
| `log4js` | still present in `app/tools/*.js` — **pending Step 10** |
| Babel plugins | renamed to `@babel/plugin-transform-*` |
| Jest tests | 21/21 passing |

---

## Progress Tracker

| Step | Status | Notes |
|------|--------|-------|
| Pre-migration T1 | ✅ Done | Storybook play functions in `stories/app.stories.js` |
| Pre-migration T2 | ✅ Done | `app/socket-apis/__tests__/send-contact-us.test.js` (6 tests) |
| 1 — Branch | ✅ Done | `update2026` |
| 2 — Node 20 | ✅ Done | `.nvmrc` and `package.json engines` |
| 3 — Peer deps | ✅ Done | All three EnCiv packages on `#update2026`; moved to `dependencies`; `bcrypt` rebuilt |
| 4 — React 19 | ✅ Done | `react@19.2.7`, `react-dom@19.2.7` explicit in `dependencies` |
| 5 — Fix `app.js` | ✅ Done | hot-loader removed; helmet-async; ThemeProvider on else-branch; also fixed `brevo-join.js` and `article.js` |
| 6 — JSS hydration | ✅ Done | `app/client/main-app.js` JssProvider added; `react-inline-elements` plugin removed; civil-server nested react deduped |
| 7 — Webpack aliases | ✅ Done | `react`/`react-dom`/`process/browser` aliases + `ProvidePlugin` for `process` global in all 3 webpack configs |
| 8 — Babel renames | ✅ Done | `proposal-*` → `transform-*`; node target `18` → `20`; `react-inline-elements` removed (React 19 incompatible) |
| 9 — Enzyme → RTL | ⚠️ Partial | Packages installed; `jest.config.js` + `jest-test-setup.js` still needed |
| 10 — log4js tools | ⏳ Pending | Replace in 5 `app/tools/*.js` files |
| 11 — Storybook v10 | ✅ Done | v10.5.0; CJS main.js; test-runner fixed; story APIs updated |
| 12 — Align deps + cleanup | ⚠️ Partial | Storybook + polyfills done; ckedit removed; `concurrently`/`nodemon`/`webpack-dev-server` deferred |
| 13 — Env vars | ⏳ Next | Rename `SENDINBLUE_*` → `BREVO_*` in deployment config |
| 14 — Final verify | ⏳ Pending | Full test + Storybook + packbuild run |

---

## Pre-Migration Tests ✅

### T1 — `stories/app.stories.js` (done)

Four `play`-function stories added to the existing file, using `canvasElement.textContent` checks
(avoids Testing Library `getByText` failures with civil-pursuit's nested TopNavBar DOM):

| Story | Asserts |
|-------|---------|
| `WithIota — renders nav and content` | text contains `"Home"` and `"Articles"` |
| `WithoutIota — renders fallback content` | text contains `"Nothing Here"` and `"Terms"` |
| `WithIota — logged-in user sees account nav items` | text contains `"My Account"` when `user.id` is set |
| `WithIota — no subject does not crash` | renders without error when `iota.subject` is undefined |

### T2 — `app/socket-apis/__tests__/send-contact-us.test.js` (done)

6 Jest tests covering all branches of `sendContactUs`. All passing.

---

## Completed Steps

### Step 1 — Branch ✅
```bash
git checkout -b update2026
```

---

### Step 2 — Node 20 ✅
```diff
# .nvmrc
-18.13.0
+20

# package.json engines
-"node": "18.13.0"
+"node": ">=20.0.0"
```

---

### Step 3 — Install update2026 peer dependencies ✅

**Discoveries:**
- `civil-server` and `civil-client` were peerDeps only — npm does not auto-install them for the root
  project. Moved to `dependencies`.
- `npm install --ignore-scripts` was needed (the `build.sh` prepare hook requires tools not present).
- After switching to Node 20, `bcrypt`'s native addon needed recompiling: `npm rebuild bcrypt`.

```json
"civil-client": "github:EnCiv/civil-client#update2026",
"civil-pursuit": "github:EnCiv/civil-pursuit#update2026",
"civil-server": "github:EnCiv/civil-server#update2026"
```

Installed: `civil-server@2.0.0`, `civil-client@0.0.13`, `civil-pursuit@2.1.6`.

---

### Step 4 — React 19 ✅

Added to `dependencies`:
```json
"react": "^19",
"react-dom": "^19"
```
Installed: `react@19.2.7`, `react-dom@19.2.7`.

`react-hot-loader` remains a transitive dep from civil-pursuit's own `dependencies` — removing the
import in `app.js` (Step 5) is sufficient.

---

### Step 5 — Fix `app/components/app.js` and related files ✅

#### 5a — `react-hot-loader` removed from `app.js`
```diff
-import { hot } from 'react-hot-loader'
 import React from 'react'
 ...
-export default hot(module)(App)
+export default App
```

#### 5b — `react-helmet` → `react-helmet-async` (three files)

`civil-server#update2026` no longer brings in `react-helmet` as a transitive dep. Three files needed
updating:

| File | Change |
|------|--------|
| `app/components/app.js` | `import { Helmet, HelmetProvider }` from `react-helmet-async`; wrapped iota branch in `<HelmetProvider>` |
| `app/components/brevo-join.js` | `import { Helmet }` from `react-helmet-async` |
| `app/web-components/article.js` | `import { Helmet }` from `react-helmet-async` |

`react-helmet` removed from `package.json`; `react-helmet-async` added to `dependencies`.

#### 5c — ThemeProvider wrapping for else-branch
```diff
 } else return (
   <ErrorBoundary>
+    <ThemeProvider theme={theme}>
       <div style={{ position: 'relative' }}>
         <div>Nothing Here</div>
         <Footer />
       </div>
+    </ThemeProvider>
   </ErrorBoundary>
 )
```

---

### Step 7 — Webpack aliases + `process` global ✅

**Discovery:** `process/browser` alias alone is not enough. Packages like `util` use `process` as
an unqualified global. A `ProvidePlugin` is also required:

```js
new webpack.ProvidePlugin({ process: 'process/browser' })
```

Applied to all three configs: `webpack-dev.config.js`, `webpack-prod.config.js`, `.storybook/main.js`.

Also installed polyfills no longer provided transitively by Storybook v7:
`stream-http`, `https-browserify`, `crypto-browserify` (added to `optionalDependencies`).

---

### Step 8 — Babel plugin renames ✅

In `babel-config.json` and `webpack-dev.config.js`:
- `@babel/plugin-proposal-class-properties` → `@babel/plugin-transform-class-properties`
- `@babel/plugin-proposal-object-rest-spread` → `@babel/plugin-transform-object-rest-spread`
- Node target: `18` → `20`
- **`@babel/plugin-transform-react-inline-elements` removed** — this plugin pre-creates JSX
  element objects at compile time, bypassing `React.createElement`. React 19 validates every
  element's `$$typeof` symbol; inlined objects fail this check with:
  `"A React Element from an older version of React was rendered"`.
  Removed from `babel-config.json`, `webpack-dev.config.js`, and `package.json devDependencies`.

---

### Step 11 — Storybook v7 → v10 ✅

Installed `storybook@10.5.0`.

#### `.storybook/main.js`
- Converted ESM → CommonJS (`require`/`module.exports`)
- Removed addons now built-in: `addon-essentials`, `addon-interactions`
- Added: `@storybook/addon-webpack5-compiler-babel`
- Removed: log4js `IgnorePlugin` (log4js is gone from civil-server)
- Removed: `HotModuleReplacementPlugin` (built into webpack 5)
- Added: `ProvidePlugin` for `process` global
- Added: `react`/`react-dom`/`process/browser` aliases
- Added: `DefinePlugin` `process.env` fix (prevents SyntaxError in civil-client bundle)
- Added: `civil-client` to babel-loader `include` list

#### HMR loop fix
`.storybook/manager-head.html` and `.storybook/preview-head.html` created with service-worker
unregister script.

#### test-runner (v0.24 ESM fix)
- `.storybook/test-runner.ts`: `module.exports` → `export default`; hooks renamed
  `preRender`/`postRender` → `preVisit`/`postVisit`; early `return` added to disable a11y scans
  (same "execution context destroyed" navigation issue as civil-pursuit)
- `.storybook/test-runner-transform.js`: CJS wrapper with synchronous `process()` for Jest's
  `assertSyncTransformer`
- `test-runner-jest.config.js`: overrides jest config to use the CJS wrapper
- `package.json`: `"test-storybook": "test-storybook --config test-runner-jest.config.js"`

#### Story file API updates

| File | Change |
|------|--------|
| `stories/app.stories.js` | `@storybook/jest`+`@storybook/testing-library` → `@storybook/test` |
| `stories/action-button.stories.js` | Import update; dark-background stories switched to inline `<div>` decorator (backgrounds parameter API unreliable in v10) |
| `stories/hero-block.stories.js` | Import update; `parameters.defaultViewport` → `globals.viewport` |
| `stories/text-block.stories.js` | Import update |
| `stories/block.stories.js` | `parameters.viewport.viewports` → `parameters.viewport.options` (custom viewport registration); all 6 `parameters.viewport.defaultViewport` → `globals.viewport` |

---

## Remaining Steps

### Step 6 — JSS hydration mismatch (`app/client/main-app.js`) ✅ Done

civil-server's SSR renderer uses a counter-based `generateId` to produce stable JSS class names.
The client must match or React 19 logs hard hydration errors.

**Additional discoveries during Step 6:**

1. **`civil-pursuit` cached stale React 16 copy** — `npm install --force` was needed to fetch
   the latest `civil-pursuit#update2026` commit (which declares `react: ^19`). Running `npm install`
   without `--force` served a cached version that still had `react: ^16`.

2. **`civil-server` webpack config hardcodes a nested `react` alias** — civil-server's
   `webpack-dev.config.js` sets `resolve.alias.react` to `civil-server/node_modules/react`. Our
   override in `webpack-dev.config.js` correctly replaces this after `cloneDeep`.

3. **`@babel/plugin-transform-react-inline-elements` incompatible with React 19** — this plugin
   inlines JSX as static object literals at compile time, bypassing `React.createElement`. React 19
   validates every element's `$$typeof` and rejects these inlined objects with:
   `"A React Element from an older version of React was rendered"`. Removed from all configs.

```diff
 'use strict'

+import React from 'react'
 import { clientMain } from 'civil-client'
+import { JssProvider } from 'react-jss'
 import App from '../components/app'

+let _jssCounter = 0
+const generateId = (rule, sheet) => {
+  const prefix = (sheet && sheet.options && sheet.options.classNamePrefix) || ''
+  return `${prefix}${rule.key}-${_jssCounter++}`
+}
+
+function AppWithJss(props) {
+  return (
+    <JssProvider generateId={generateId}>
+      <App {...props} />
+    </JssProvider>
+  )
+}

-clientMain(App)
+clientMain(AppWithJss)
```

**Windows dev note:** If "invalid hook call" or class name mismatches persist in the dev server,
run the junction script from the civil-server checkout:
```bash
cd ../civil-server
npm run link-civil-client
```

Verify: `npm test`; start dev server; confirm no hydration warnings in the browser console.

---

### Step 9 — Complete Jest / testing-library setup ⏳

Already done: packages installed (`@testing-library/react`, `@testing-library/jest-dom`,
`@testing-library/dom`, `jest-environment-jsdom`; Enzyme packages removed from `optionalDependencies`).

Still needed — create `jest-test-setup.js`:

```js
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
if (!global.TextEncoder) global.TextEncoder = TextEncoder
if (!global.TextDecoder) global.TextDecoder = TextDecoder
```

Create `jest.config.js`:

```js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest-test-setup.js'],
  moduleNameMapper: {
    '^ws$': '<rootDir>/node_modules/ws/index.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(civil-pursuit|civil-client)/)',
  ],
}
```

Verify: `npm test` — all 21 tests still pass.

---

### Step 10 — Remove `log4js` from `app/tools/` scripts ⏳

Files to update:
- `app/tools/article-images.js`
- `app/tools/backup-iotas.js`
- `app/tools/fix-wp-iotas.js`
- `app/tools/get-domains-from-articles.js`
- `app/tools/wp-to-iota.js`

Pattern to replace in each:
```diff
-import log4js from 'log4js'
 ...
-if (!global.logger) {
-  global.logger = log4js.getLogger('node')
-  log4js.configure({ ... })
-}
+if (!global.logger) {
+  global.logger = {
+    info:  (...args) => console.log('[info]',  ...args),
+    warn:  (...args) => console.warn('[warn]',  ...args),
+    error: (...args) => console.error('[error]', ...args),
+    debug: (...args) => console.log('[debug]', ...args),
+    trace: (...args) => console.log('[trace]', ...args),
+  }
+}
```

---

### Step 12 — Align remaining dependencies ⏳

Already updated: all Storybook packages + browser polyfills.

**CKEditor removed (unplanned — done during migration):**
`@ckeditor/ckeditor5-react@6.3.0` declared `peerDependencies: { react: "^16 || ^17 || ^18" }`
which caused `ERESOLVE` with React 19. Since `ckedit.js` was an unused experiment, the following
were deleted:
- `app/components/ckedit.js`
- `app/components/ckeditor/` (directory)
- `stories/ckedit.stories.js`
- `@ckeditor/ckeditor5-build-classic` and `@ckeditor/ckeditor5-react` from `package.json`
- `--ignore **/ckeditor` flags removed from `transpile` and `hot-transpile` scripts
38 packages removed.

Still to update:
```bash
npm install --save-optional concurrently@^9 nodemon@^3 webpack-dev-server@^5 --legacy-peer-deps
```

---

### Step 13 — Update deployment environment variable names ⏳

Update secrets in Heroku / Render / `.env`:

| Old | New |
|-----|-----|
| `SENDINBLUE_API_KEY` | `BREVO_API_KEY` |
| `SENDINBLUE_DEFAULT_FROM_EMAIL` | `BREVO_DEFAULT_FROM_EMAIL` |

Both names still work; `BREVO_*` takes precedence. No code changes required (enciv-home uses
`nodemailerstart`, not the Brevo SDK directly).

---

### Step 14 — Final verification ⏳

```bash
npm test                  # 21+ tests pass
npm run storybook         # starts without errors
npm run test-storybook    # all play-function tests pass
npm run packbuild         # production webpack build succeeds
npm run dev               # dev server starts; browser loads without console errors
```

Browser checks:
- No `Hydration failed` errors
- No `Can't resolve 'react'` webpack errors
- No `ReferenceError: process is not defined`
- Email contact form works with `BREVO_API_KEY` or legacy `SENDINBLUE_API_KEY`

---

## New Tests Created

| File | What it covers |
|------|----------------|
| `stories/app.stories.js` (4 play-function stories) | App render with/without iota; ThemeProvider; Helmet; logged-in nav; no-crash |
| `app/socket-apis/__tests__/send-contact-us.test.js` | Email dispatch; env-var guard; error path (6 tests) |
