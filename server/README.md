# Server Overview

The server-side of the Property Management System is responsible for handling API requests, interacting with the database, and managing property data.

# Getting Started with the Server

## Installation

1. Navigate to the server directory.
2. Run npm install to install dependencies.
3. Set up your PostgreSQL database and update the configuration in .env.

# Server Technologies Used

- TypeScript
- Express.js
- PostgreSQL

# Database setup

1. Create a PostgreSQL database.
2. Update the database configuration in .env.

# API Documentation

Detailed API documentation can be found in the server's docs directory. You can access it by running the server and visiting /api/docs in your browser.

# Project Structure

```
server/
  .env.example # .env example
  tsconfig.json # Typescript configuration
  Migrations # Migration file for database
  Seeders # Seeding file for database
  src/ # Contains the source code.
    config/ # Configuration files
      config.ts
      database.config.ts # database configuration file1
    controller/ # Request handlers.
    middleware/ # Middlewares
    model/ # Database models.
    routes/ # API route definitions.
    services/ # Controller services
    test/ # Test code
    utils/ # Utils code
    app.ts # Application entry point
```

### Details:

- `config/`: Holds the configuration files. It includes settings, constants, and environment variable handling.
- `middleware/`: Middlewares are functions that have access to the request and response objects, and the next middleware function in the cycle.

# Different command to run migration and seed

- `npm run migrate` _To run all migration_
- `npm run migrate:undo` _To undo all migration_
- `npm run seed` _To run pending seed_
- `npm run seed:all` _To run migration and run all seed_
- `npm run seed:undo` _To undo all of the seed_
- `npm run migrate-seed` _To run all of the migration and then run all of the seed_

## Run the project in development server

```bash
npm run migrate-seed
npm run dev
```

- Navigate to `http://localhost:8000`

## Build and run the project in production

```bash
npm run build
npm start
```

- Testing Purpose:

  ```bash
  npm run test
  ```

- Linting (Make sure your code is in proper format by running):

```bash
npm run lint
```

- Before commit both `npm run test and npm run lint` runs one by one as it is setup using Husky.

# Database Modeling, Migration and Seeding

- Modeling (Inorder to create model, run this command)
  `npx sequelize-cli model:generate --name yourModelname --attributes firstName:string,lastName:string,email:string`

- The above command automatically generates a migration file. This migration file is generated within migration folder at root dir. Before running migration command, compile our src folder using command `npm run build`.

- Migration (The migration file contains a generated template. Modify the template according to your need.) To run migration run command `npx sequelize-cli db:migrate`.

## Some more useful commands for migration are:

- Running Migration
  `npx sequelize-cli db:migrate`

- Undoing Migrations:
  `npx sequelize-cli db:migrate:undo`
  `npx sequelize-cli db:migrate:undo:all`

- Creating a Migration:
  `npx sequelize-cli migration:generate --name name_of_your_migration`

- Status of Migrations:
  `npx sequelize-cli db:migrate:status`

## Seeding (Inorder to create seeding, these commands can be used),

- Creating a Seeder:
  `npx sequelize seed:generate --name demo-seed`

- Running Seeders:
  `npx sequelize db:seed:all`

- Undoing Seeders:
  `npx sequelize db:seed:undo`
  `npx sequelize db:seed:undo:all`

- Undoing a Specific Seeder:
  `npx sequelize db:seed:undo --name name-of-seed-as-in-database`
