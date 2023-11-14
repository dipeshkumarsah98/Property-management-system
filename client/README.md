# Client Overview

The client-side of the Property Management System is responsible for providing a user-friendly interface for property management tasks.

# Getting started with Client

## Installation

1. Navigate to the client directory.
2. Run npm install to install dependencies.
3. Run npm start to start the development server.

## Client Technologies Used

- React
- TypeScript

## Project Structure

```
Below is a description of the primary folders in this project:

client/
  tsconfig.json # Typescript configuration
  vite.config.ts # Vite configuration
  src/ # Contains the source code.
    components/ # Reusable React components.
    data/ # Data files
    hooks/ # Reusable hook
    pages/ # Pages of client
    App.tsx # Application entry point
    main.tsx
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

- Testing Purpose:
  `npm run test`

- Linting (Make sure your code is in proper format by running):
  `npm run lint`

- Before commit both `npm run test and npm run lint` runs one by one as it is setup using Husky.
