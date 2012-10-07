angular.module('app', ['ui'])
  .directive('myIframe', function(){
    return function(scope, element, attrs) {
      scope.$watch(attrs.myIframe, function(value){
        var previewFrame = element[0];
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        function q(text) {
          preview.write(text);
        }

        preview.open();
        q('<html><head><title>foo</title><meta charset="utf-8"></meta></head><body>');
        q(value);
        q('</body></html>')
        preview.close();
      });
    }
  });

// app.controller('MainCtrl', function($scope){
//   $scope.foo = "bar";
// });
function MainCtrl($scope) {
  $scope.test = "describe('Foo', function(){\n  it('should be valid', function() {\n    assert(true, true);\n  }\n});";
  $scope.code = "var foo = 'bar';"
  
}

function PreviewCtrl($scope) {
  $scope.preview = "<h1>Hello FooBar</h1>";
}