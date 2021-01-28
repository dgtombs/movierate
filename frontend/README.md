# Movierate Frontend

This is the [React](https://reactjs.org/) frontend for the Movierate application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Deploys the application to the demo site at https://dgtombs.github.io/movierate.

## Deployment

`npm run deploy` deploys the demo site as described above, but you will want to deploy to your own website.

Just run `npm run build` as described above and then copy the files to your server.
The application expects to run in a directory called `movierate` at the root of your
website.
You will have to modify the source if you want to run it at a different path.

Note that you should configure HTTP caching as describe in the [CRA docs](https://create-react-app.dev/docs/production-build/).
