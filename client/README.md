# PMS PROJECT

This PMS that is Property management system is the simple UI to discover the perfect Propert for your needs with our user-friendly tool that compares multiple Propert offerings. It is designed to allow users to compare between multiple properties from different places and find the right propert to get your household or businesses place.

# Running this project

## Pre-requisites

Listed the software or tools that are required to run the project.

- Node.js v19.7.0 or later
- npm v8 or later
  Listed the software or tools that are required to run the project.
- Node.js v19.7.0 or later
- npm v8 or later

## Getting started

- Clone the repository

```
git clone  <git lab template url> <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
```

## Different command to run

- `npm run div` _To start the development server_
- `npm run build` _To build the project_
- `npm run lint` _To run pending lint_

## Run the project in development server

Runs the app in the development mode.<br>
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

```
npm run dev
```

- Navigate to `http://localhost:5137`

## Build and run the project in production

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

```
npm run build
npm start
```

## Project Structure

```
client/
  README.md
  node_modules/
  package.json
  package-lock.json
  .eslintrc.cjs
  .gitignore
  .prettierrc.cjs
  index.html
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
  src/
    components/
      form
      nav
      ui
    context
      _test_
      index.ts
    data/
      dummy.json
    hooks/
      dummy.ts
    pages/
        Home.tsx
        NotFound.tsx
    App.tsx
    App.test.tsx
    setupTests.ts
    index.css
    main.tsx
    vite-env.d.ts
```

- Testing Purpose:
  `npm run test`

- Linting (Make sure your code is in proper format by running):
  `npm run lint`

- Before commit both `npm run test and npm run lint` runs one by one as it is setup using Husky.
