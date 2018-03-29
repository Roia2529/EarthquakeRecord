module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes  
  // sample api route
   app.get('/map', function(req, res) {
        var path = require('path');
        res.sendfile(path.resolve('public/index.html'));
        console.log('test');
   });

 };