var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router   = ReactRouter.Router,
    routes = require('./routes.jsx'),
    createHistory  = require('history').createHistory;

ReactDOM.render((
  <Router history={ createHistory() }>
    {routes}
  </Router> 
), document.getElementById('app'));