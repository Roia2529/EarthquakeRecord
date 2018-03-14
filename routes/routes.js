module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes  
  // sample api route
   app.get('/', function(req, res) {
        res.sendFile('index.html');
        console.log('test');
   });

 };