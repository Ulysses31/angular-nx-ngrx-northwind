# NX Empty Workspace - React - Angular

## NPM Commands

### Add React
```bash
npm i -D @nrwl/react
```
### Create React App
```bash
npx nx generate @nrwl/react:app
```
### Run React Application
```bash
npx nx serve my-site
```
### Create React library
```bash
npx nx g @nrwl/react:lib ui-header
```
### Create React Component Inside UI-Header Library
```bash
npx nx g @nrwl/react:component --project=ui-header page-title
```
### View Project Dependensies Graph
```bash
npx nx dep-graph
```
## Angular

### Add Angular
```bash
npm i -D @nrwl/angular
```
### Add Angular App
```bash
npx nx g @nrwl/angular:app store --routing --style=scss
```

## Server ExpressJS

### Add ExpressJS 
```bash
npm i -D @nrwl/express
```
### List of nrwl/express:app schematics options
```bash
npx nx g @nrwl/express:app --help
```
### Create ExpressJS API Server
```bash
npx nx g @nrwl/express:app api --frontendProject=my-site
```
### Run ExpressJS Server
```bash
npx nx serve api
```
### Create Typescript Library
```bash
npx nx g @nrwl/workspace:library api-interface

```
### Create Library in specific folder
```bash
npx nx g @nrwl/react:library ui-tile --directory=review --dry-run
```

### Check after a change if all works
```bash
npx nx affected:test
```
## App Tests

### e2e Tests
```bash
npx nx e2e review-e2e --watch
```
