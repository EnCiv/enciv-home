# enciv-home Node 24 Migration Plan

**Date:** August 2026  
**Current Node:** 24 (`.nvmrc` already updated)  
**Reference:** `civil-pursuit-new/docs/node24-migration.md` — parallel migration with detailed notes on every surprise encountered

---

## What Is Already Done

| Item                                                            | Status  |
| --------------------------------------------------------------- | ------- |
| `.nvmrc` changed to `24`                                        | ✅ done |
| `npm update civil-server civil-client civil-pursuit`            | ✅ done |
| `JssProvider` + stable `generateId` in `app/client/main-app.js` | ✅ done |
| Phase 1 — Jest fix, Node 24 config, useUnifiedTopology          | ✅ done |
| Phase 2 — MongoDB + jest-mongodb upgrade                        | ✅ done |
| Phase 3 — Babel 7 → 8                                           | ✅ done |
| Phase 4 — webpack toolchain upgrade                             | ✅ done |
| Phase 5 — Jest 29 → 30                                          | ✅ done |
| Phase 6 — npm outdated updates (partial)                        | ✅ done |

---

## Key Differences vs civil-pursuit-new (as discovered during migration)

- `civil-pursuit` is a direct `dependency` — npm installs and builds it, creating a nested `node_modules/react` if the React version range differs from enciv-home's. **Fix: pin `react`/`react-dom` to the same exact range as civil-pursuit (`^19.2.8`).**
- enciv-home had **three** Babel config files: `babel-config.json` (non-standard, unused by Babel), `.babelrc` (auto-loaded, had old `@babel/plugin-proposal-*` names), and `babel.config.js` (new). Babel 8 merged all of them, causing `Cannot find package` errors. Fix: delete `.babelrc` and `babel-config.json`.
- `webpack-dev.config.js` and `webpack-backend.js` had **inline** `babel-loader` options with `@babel/plugin-transform-runtime` (removed from package). These are not derived from `babel.config.js` — they must be updated independently.
- `.storybook/main.js` had `require('../babel-config.json')` — must be removed and replaced with comment letting `babel-loader` use `babel.config.js` automatically.
- `@shelf/jest-mongodb` was at `^4.3.2` (v4) and `mongodb-memory-server` at `^9.3.0` (v9) — larger jump to v6/v11 than civil-pursuit's v4→v6/v10→v11.
- Install command: always use `npm install --legacy-peer-deps` — Babel 8 conflicts with many ecosystem peer deps that declare `@babel/core@^7`.

---

## Completed Phases

---

### Phase 1 — Fix Immediate Jest Failure + Node 24 Config ✅ DONE

- `jest.config.js`: added `civil-server` to `transformIgnorePatterns`; added `color*` and `bson` for ESM; added `preset: '@shelf/jest-mongodb'` and `@swc/jest` transform with JSX.
- `package.json` engines: `>=20.0.0` → `>=24.0.0`
- `babel-config.json` target: `node: 20` → `node: 24` (later deleted entirely in Phase 3)
- 5 `app/tools/*.js` files: removed `{ useUnifiedTopology: true }` (throws `MongoParseError` in mongodb@7)

---

### Phase 2 — MongoDB + jest-mongodb Upgrade ✅ DONE

- `@enciv/mongo-collections`: `^0.0.3` → `^0.0.5`
- `@shelf/jest-mongodb`: `^4.3.2` → `^6.0.2`
- `mongodb-memory-server`: `^9.3.0` → `^11.2.0`
- `allowScripts` added to `package.json` for all packages with postinstall scripts.

---

### Phase 3 — Babel 7 → 8 ✅ DONE

- `package.json`: removed `@babel/plugin-proposal-*` (deprecated), `@babel/plugin-transform-regenerator` (v8 bug), `@babel/plugin-transform-runtime` (unneeded); bumped all `@babel/*` to `^8`; `babel-loader` `^8` → `^10`.
- `babel-config.json` → deleted (non-standard name, not auto-discovered by Babel).
- `.babelrc` → deleted (`git rm .babelrc`) — **critical surprise**: it contained `@babel/plugin-proposal-class-properties` which Babel 8 merged with `babel.config.js`, causing `Cannot find package` errors.
- `babel.config.js` created: caller-aware, `sourceType: 'unambiguous'`, Node 24 target, no proposal or runtime plugins.
- `webpack-dev.config.js` inline babel-loader options: removed `@babel/plugin-transform-runtime`, updated node target to `24`, fixed `process/browser` → `process/browser.js`.
- `webpack-backend.js` inline babel-loader options: same fixes; also renamed `@babel/plugin-proposal-*` → `@babel/plugin-transform-*`.
- `.storybook/main.js`: removed `require('../babel-config.json')` — replaced with comment; fixed `process/browser` → `process/browser.js` in alias and ProvidePlugin.

---

### Phase 4 — webpack Toolchain Upgrade ✅ DONE

- `webpack-cli`: `^5.1.4` → `^7.2.2`
- `webpack-dev-server`: `^5.2.2` → `^6.0.0`
- `webpack-merge`: `^5.10.0` → `^6.0.1`
- `process/browser` → `process/browser.js` alias (already done during Phase 3 debugging)
- Array-format proxy already inherited from civil-server's webpack config.

---

### Phase 5 — Jest 29 → 30 ✅ DONE

- `jest`: `^29.7.0` → `^30.4.2`
- `@testing-library/jest-dom`: `^6.9.1` → `^7.0.0`
- `@testing-library/dom`: `^10.4.1` added (peer dep of jest-dom@7, was missing)
- Story `expect` imports: already using `storybook/test` — no changes needed.

---

### Phase 6 — npm outdated Updates ✅ DONE (partial — see deferred below)

**Applied:**

| Package                        | Before  | After    |
| ------------------------------ | ------- | -------- |
| `react`                        | ^19     | ^19.2.8  |
| `react-dom`                    | ^19     | ^19.2.8  |
| `react-animate-height`         | ^3.2.3  | ^3.2.4   |
| `concurrently`                 | ^9.2.4  | ^10.0.4  |
| `cloudinary`                   | ^2.2.0  | ^2.10.0  |
| `babel-plugin-cjs-esm-interop` | ^4.0.0  | ^4.0.3   |
| `html-react-parser`            | ^5.2.2  | ^5.2.17  |
| `markdown-to-jsx`              | ^7.4.7  | ^9.10.2  |
| `chromatic`                    | ^11.3.0 | ^16.10.1 |
| `sitemap`                      | ^8.0.0  | ^8.0.3   |
| storybook packages             | ^10.5.0 | ^10.5.7  |

**Deferred — need individual assessment:**

| Package                | Current | Latest | Notes                                                       |
| ---------------------- | ------- | ------ | ----------------------------------------------------------- |
| `node-fetch`           | ^2.7.0  | 3.x    | v3 ESM-only; replace with native `fetch` (Node 24 built-in) |
| `prettier`             | ^2.8.8  | 3.x    | `jsxBracketSameLine` → `bracketSameLine` in config          |
| `pretty-quick`         | ^3.3.1  | 4.x    | Must match prettier major                                   |
| `sitemap`              | ^8.0.3  | 9.x    | API check needed                                            |
| `cypress`              | ^9.7.0  | 15.x   | Major config/selector overhaul                              |
| `husky`                | ^4.3.8  | 9.x    | Complete config rewrite                                     |
| `axe-playwright`       | ^1.2.3  | 2.x    | API check needed                                            |
| `@wordpress/api-fetch` | ^6.52.0 | 7.x    | API check needed                                            |
| `@svgr/cli`            | ^6.5.1  | 8.x    | API check needed                                            |
| `express`              | ^4.17.1 | 5.x    | Wildcard route syntax change                                |

---

### Phase 7 — `allowScripts` in package.json

After completing earlier phases, run `npm install` and add `allowScripts` entries for any packages that show warnings. See civil-pursuit-new's `package.json` `allowScripts` section for the pattern.

---

## Execution Notes

- Commit each phase individually after running `npm test`, `npm run dev` (verify `/` loads), `npm run storybook`, and `npm run test-storybook` (allow 41+ seconds).
- Max 2 fix attempts per phase before stopping.
- All fixes scoped to enciv-home only — do not modify civil-server, civil-client, or civil-pursuit.
- `node-fetch` note: Node 24 has native `fetch` built in. Any `import fetch from 'node-fetch'` in server-side code can be replaced with the global `fetch` and the package removed entirely.
