# EnCiv's Home Page

This repo builds EnCiv's home page using EnCiv's [civil-server](https://github.com/EnCiv/civil-server)

[![image](https://github.com/EnCiv/enciv-home/assets/3317487/1b934f5e-dd53-4fe3-896b-331aed6aefb4)](https://enciv.org)

Here's how to:

- [Install this repo](https://github.com/EnCiv/.github/wiki/Getting-Started-%E2%80%90-Repo-Setup)
- [Contribute](https://github.com/EnCiv/.github/wiki/Contributing)
- [React Coding and Style Guidlines](https://github.com/EnCiv/.github/wiki/React-Coding-and-Style-Guidelines)

## Note on deploying and switching between NODE_ENV=development and NODE_ENV=production

When changing NODE_ENV, the many modules need to be rebuild. It's because, webpack is using different libraries for React for development v. production.

- On a deskop you can `export NODE_ENV=production`, `rm -rf node_modules` and then `npm install` and that will ensure everything is build right.
- On heroku you need to `heroku builds:cache:purge -a app_name` and then redeploy the branch by going to https://dashboard.heroku.com/apps/app_name/deploy/github and in Manual deploy select the branch and click [Deploy Branch]
