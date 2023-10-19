## Getting Started

### Setup Database

Download and instal [Mongodb server](https://www.mongodb.com/docs/manual/administration/install-community/#std-label-install-mdb-community-edition)

To start MongoDB, run mongod.exe

Or use the commandline

```bash
mongod
```

Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass)

Create a new connection. Use the default connection string
`mongodb://localhost:27017`

---

### Run the app

create a `.env.local` file at the root of the project with the following content:

```
DB_ROOT_URI=mongodb://localhost:27017
DB_URI_PARAMS=directConnection=true
DB_COLLECTION=notes-dev

SECRET=<your-256-bit-secret>
```

Replace `<your-256-bit-secret>` with a good secret
e.g.: `f0d8bccd87c78bb92b58e1b3136594317cacc2303ef0c595bc9bff40778d06e0`

Install dependancies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

Once you Edit/Delete/Create a note you'll have to refresh for the change to show up. I'm working on that.
