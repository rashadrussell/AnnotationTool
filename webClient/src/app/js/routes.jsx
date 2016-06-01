var React  = require('react'),
    Router = require('react-router'),
    Route  = Router.Route,
    IndexRoute = Router.IndexRoute,
    App  = require('./components/app/app.jsx'),
    Home = require('./components/pages/home.jsx'),
    NotFound = require('./components/pages/notFound.jsx');
    
var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='*' component={NotFound} />
  </Route>
);

module.exports = routes;