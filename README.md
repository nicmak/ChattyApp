ChattyApp
=====================
This is a project at Lighthouse Labs, where I implemented the use of ReactJS on a messanger application. 
A minimal and light dev environment for ReactJS.

### Usage

Install the dependencies and start the client-server.

```
npm install
npm start
open http://localhost:3000
```
*** As well, please open Chatty_server folder to run server-side
```
npm install (To install dependencies of Chatty_server
npm start 
open http://localhost:5000
```
### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
