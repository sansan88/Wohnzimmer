angular.module('starter.services', [])
.factory('User', function() {

  //Public Return Methods
  return {
    getUser: function(){

      var user = {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password")
      };
      return user;
    }
  }



});
