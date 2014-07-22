var User = require('../user');

module.exports = function(req, res, next){
  var uid = req.session.uid;
  if (!uid) return next();
  User.get(uid, function(err, user){
    if (err) return next(err);
    req.user = res.locals.user = user; //It stores both in req, res so that subsequent middleware and routes can access it while expose data to template.
    next();
  });
};