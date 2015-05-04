'use strict';

angular.module('facebook')
.factory('Profile', function($http, nodeUrl){

  function Profile(){
  }

  Profile.update = function(user){
    var userObject = {
      email: user.email,
      avatar: user.avatar,
      age: user.age,
      address: user.address,
      photo: user.photo,
      gender: user.gender,
      birthday: user.birthday
    };
    return $http.put(nodeUrl + '/profile', userObject);
  };

  Profile.getProfile = function(){
    return $http.get(nodeUrl + '/profile');
  };

  return Profile;
});
