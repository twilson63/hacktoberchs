var app = angular.module('app', ['ui']);

app.factory('socket', function ($rootScope, $window) {
  var socket = $window.io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

app.controller('MainCtrl', function ($scope, $http, socket, $window) {
  // defaults
  $scope.test = "describe('Foo', function(){\n  it('contains spec with an expectation', function() {\n    expect(true).toBe(true);\n  });\n});";
  $scope.code = "";

  $scope.testChg = function() {
    socket.emit('test:chg', { test: $scope.test });
  }
  socket.on('test:chg', function(data){
    $scope.test = data.test;
  });

  $scope.codeChg = function() {
    socket.emit('code:chg', { code: $scope.code });
  }
  socket.on('code:chg', function(data){
    $scope.code = data.code;
  });

  // run test function
  $scope.run = function() {
    // should be directive...
    $window.jQuery('#HTMLReporter').remove();
    eval($scope.test);
    eval($scope.code);
    // should be directive...
    $window.jasmine.getEnv().execute();
  }
});
