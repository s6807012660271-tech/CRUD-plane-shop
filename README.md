# Plane Store CRUD App

An Express and EJS application for managing an aircraft catalog. Plane records are stored in MongoDB with Mongoose.

## Requirements

- Node.js and npm
- MongoDB Atlas, or a local MongoDB server
- For private com use :
  ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```

## Setup

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Create a `.env` file in the project root. Use your own MongoDB connection string:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/planeStore?retryWrites=true&w=majority
   PORT=3000
   ```

   For local MongoDB, use:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/planeStore
   PORT=3000
   ```

   Replace the Atlas placeholders with your actual values. URL-encode special characters in the username or password. Keep `.env` private and do not commit credentials. The app also accepts `MONGODB_URI` if `MONGO_URI` is not set.

3. Start the app:

   ```powershell
   npm start
   ```

   For development with automatic restarts:

   ```powershell
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000), or use the port configured in `.env`.

The app connects to MongoDB before it begins listening. If the connection fails, check the URI, Atlas database user and password, Atlas network access list, or that your local MongoDB server is running.

## Features

- Create, view, edit, and delete plane records
- Search by plane name
- Filter by manufacturer
- Sort by newest or price
- Paginated catalog
- Validate plane details using the Mongoose schema

Current categories include Commercial, Private Jet, Cargo, Trainer, Helicopter, Fighter Jet, and Military. Current manufacturer choices are defined in the form and model schema.

## Add a Manufacturer or Plane Type

Keep the form choices and schema validation in sync:

- Manufacturers: update the dropdown in `views/form.ejs`, the manufacturer enum in `model/modelplane.js`, and the search filter choices in `views/index.ejs`.
- Plane types: update the category dropdown in `views/form.ejs` and the category enum in `model/modelplane.js`.

## Seed Sample Data

To insert the sample records:

```powershell
node seed.js
```

**Warning:** `seed.js` runs `deleteMany()` before inserting samples, so it deletes all existing plane records in the configured database. Only run it when you intend to replace that collection with the sample data.

## Routes

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/planes` | List, search, filter, sort, and paginate planes |
| `GET` | `/planes/new` | Show the create form |
| `POST` | `/planes` | Create a plane |
| `GET` | `/planes/:id` | Show one plane |
| `GET` | `/planes/:id/edit` | Show the edit form |
| `PUT` | `/planes/:id` | Update a plane |
| `DELETE` | `/planes/:id` | Delete a plane |

## Project Layout

```text
config/db.js               MongoDB connection
controllers/planeController.js  CRUD request handlers
model/modelplane.js        Mongoose schema and model
routes/planeroutes.js      Plane routes
views/                     EJS pages and layout
public/                    Static assets
seed.js                    Sample data seeder
server.js                  Express app entry point
```
