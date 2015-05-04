'use strict';

var User = require('../models/user');

exports.register = function(server, options, next){

  var authenticate = {
    key: process.env.FIREBASE_SECRET,
    validateFunc: function(jwt, cb){
      var now = Date.now();
      var iat = jwt.iat*1000;
      var exp = process.env.FIREBASE_EXPIRE * 60 * 60 * 1000 + iat;
      console.log('now:', now, 'iat:', iat, 'exp:', exp);
      if(now > iat && now < exp){
        User.findOne({uid: jwt.d.uid}, function(err, user){
          cb(null, true, {uid: jwt.d.uid, _id: user ? user._id : null});
        });
      }else{
        cb();
      }
    }
  };
  server.expose({authenticate: authenticate});
  return next();
};

exports.register.attributes = {
  name: 'authentication'
};
