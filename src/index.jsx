// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


ReactDOM.render(<App />, document.getElementById('react-root'));
//ReactDOM will create something onto react-root...in this its using APP(refer to app.jsx, its an html)
