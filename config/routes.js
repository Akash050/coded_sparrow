/**
 * Import Route files and set in express middleware
 */

exports.set_routes = (app) => {
    const resource = require('../routes/resource');
    const place = require('../routes/place');

    app.use('/api/place', place);
    app.use('/api/resource', resource);
  
}