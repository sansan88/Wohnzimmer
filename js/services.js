angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
}) // END FRIENDS SERVICE


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
