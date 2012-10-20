angular.module('app', ['ui']);
// main controller
function MainCtrl($scope, $http) {
  // defaults
  $scope.test = "describe('Foo', function(){\n  it('contains spec with an expectation', function() {\n    expect(true).toBe(true);\n  });\n});";
  $scope.code = "";
  
  // run test function
  $scope.run = function() {
    eval($scope.test);
    eval($scope.code);
    console.log(jasmine.getEnv().execute());
    // show loading...
    // $scope.page = '/loading.html';
    // var cmd = '/run', data = { test: $scope.test, code: $scope.code};
    // // if update mode set id and rev
    // if ($scope.id) { 
    //   cmd = cmd + '/' + $scope.id;
    //   data._rev = $scope.rev;
    // }
    // // post to server
    // $http.post(cmd, data).success(function(data){
    //   $scope.id = data.id;
    //   $scope.rev = data.rev;
    //   $scope.page = '/runner/' + data.id;
    // });
  }
}
