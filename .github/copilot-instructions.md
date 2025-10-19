# GitHub Copilot Instructions for enciv-home

## Terminal Setup

When opening a new bash shell in this environment, the following commands are must be run by the ai agent or the user to set up the Node.js environment correctly:

```bash
if [ ! -f .nvmrc ];then
    export NODE_VERSION=$(cat ./package.json | grep '\"node\":' | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g')
else
    export NODE_VERSION=`cat .nvmrc`
fi
export NVS_HOME="$HOME/AppData/Local/nvs/"
$NVS_HOME/nvs add $NODE_VERSION
source $NVS_HOME/nvs.sh use $NODE_VERSION
```

**CRITICAL: Run ALL commands together as a single multi-line command.** Do NOT split these into separate terminal commands. The commands must execute in sequence in the same shell session to properly set up the environment. Copy and paste the entire block above as one command.

## Project Structure

- React components in `app/components/`
- Socket APIs in `app/socket-apis/`
- Tests in `__tests__/` subdirectories
- Storybook stories in `stories/`
- Web components (page-level) in `app/web-components/`

## Testing

Run tests with:

```bash
npm test -- path/to/test-file.js
```

## Coding Conventions

- Use `rem` units instead of `px` for measurements
- First style class in JSS should match component name
- No `cx()` wrapper for single class names
- Components use `mode` prop for 'dark' or 'light' theming
- Socket APIs use `.call({}, cb)` pattern in tests
- All measurements in rem units

## Environment

- Node version managed by NVS (Node Version Switcher)
- MongoDB connection for tests uses mongodb-memory-server
- Jest for testing with ESM imports
