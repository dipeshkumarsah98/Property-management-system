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

## Different command to run migration and seed

- `npm run migrate` _To run all migration_
- `npm run migrate:undo` _To undo all migration_
- `npm run seed` _To run pending seed_
- `npm run seed:all` _To run migration and run all seed_
- `npm run seed:undo` _To undo all of the seed_
- `npm run migrate-seed` _To run all of the migration and then run all of the seed_

## Run the project in development server

```
npm run migrate-seed
npm run dev
```

- Navigate to `http://localhost:8000`

## Build and run the project in production

```
npm run build
npm start
```

## Project Structure

```
isp-info-backend/
  README.md
  node_modules/
  package.json
  package-lock.json
  .eslintrc.json
  .gitignore
  .prettierrc
  .env.example
  tsconfig.json
  Migrations
  Seeders
  src/
    config/
      config.ts
      database.config.ts
    controller/
    middleware/
    models/
    services/
    test/
    utils/
    app.ts
```

- Testing Purpose:
  `npm run test`

- Linting (Make sure your code is in proper format by running):
  `npm run lint`

- Before commit both `npm run test and npm run lint` runs one by one as it is setup using Husky.

# Database Modeling, Migration and Seeding

- Modeling (Inorder to create model, run this command)
  `npx sequelize-cli model:generate --name yourModelname --attributes firstName:string,lastName:string,email:string`

- The above command automatically generates a migration file. This migration file is generated within migration folder at root dir. Before running migration command, compile our src folder using command `npm run build`.

- Migration (The migration file contains a generated template. Modify the template according to your need.) To run migration run command `npx sequelize-cli db:migrate`. Some more useful commands for migration are:

```
Running Migration
npx sequelize-cli db:migrate

Undoing Migrations:
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all

Creating a Migration:
npx sequelize-cli migration:generate --name name_of_your_migration

Status of Migrations:
npx sequelize-cli db:migrate:status
```

- Seeding (Inorder to create seeding, these commands can be used),

```
Creating a Seeder:
sequelize seed:generate --name demo-seed

Running Seeders:
sequelize db:seed:all

Undoing Seeders:
sequelize db:seed:undo
sequelize db:seed:undo:all

Undoing a Specific Seeder:
sequelize db:seed:undo --name name-of-seed-as-in-database

# ISP INFO PROJECT
This ISP-Info is the simple UI to discover the perfect internet package for your needs with our user-friendly tool that compares multiple ISP offerings. It is designed to allow users to compare between multiple packages from ISPs and find the right package to get your household or businesses connected.

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

git clone <git lab template url> <project_name>

```
- Install dependencies
```

cd <project_name>
npm install

```
## Run the project in development server
```

npm run migrate-seed

npm run dev

```
- Navigate to `http://localhost:8000`

## Build and run the project in production

```

npm run build
npm start

```
## Project Structure
```

isp-info-backend/
README.md
node_modules/
package.json
package-lock.json
.eslintrc.json
.gitignore
.prettierrc
.env.example
tsconfig.json
Migrations
Seeders
src/
config/
config.ts
database.config.ts
controller/
middleware/
models/
services/
test/
utils/
app.ts

````
- Testing Purpose:
``` npm run test ```

- Linting (Make sure your code is in proper format by running):
``` npm run lint ```

- Before commit both ```npm run test and npm run lint``` runs one by one as it is setup using Husky.

# Database Modeling, Migration and Seeding
- Modeling (Inorder to create model, run this command)
```npx sequelize-cli model:generate --name yourModelname --attributes firstName:string,lastName:string,email:string```

- The above command automatically generates a migration file. This migration file is generated within migration folder at root dir. Before running migration command, compile our src folder using command ```npm run build```.

- Migration (The migration file contains a generated template. Modify the template according to your need.) To run migration run command ```npx sequelize-cli db:migrate```. Some more useful commands for migration are:

````

Undoing Migrations:
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all

Creating a Migration:
npx sequelize-cli migration:generate --name name_of_your_migration

Status of Migrations:
npx sequelize-cli db:migrate:status

```

- Seeding (Inorder to create seeding, these commands can be used),

```

Creating a Seeder:
sequelize seed:generate --name demo-seed

Running Seeders:
sequelize db:seed:all

Undoing Seeders:
sequelize db:seed:undo
sequelize db:seed:undo:all

Undoing a Specific Seeder:
sequelize db:seed:undo --name name-of-seed-as-in-database

```

```
