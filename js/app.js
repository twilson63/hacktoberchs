angular.module('app', ['ui'])
  .directive('myIframe', function(){
    return function(scope, element, attrs) {
      scope.$watch(attrs.myIframe, function(value){
        //console.log(value.test);
        var previewFrame = element[0];
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        //if(value) {
          preview.open();
          preview.write(['<html>',
                      '<head>',
                      '<title>foo</title>',
                      '<meta charset="utf-8"></meta>',
                      '<link rel="shortcut icon" type="image/png" href="/spec/jasmine_favicon.png">',
                      '<link rel="stylesheet" type="text/css" href="/spec/jasmine.css">',
                      '<script type="text/javascript" src="/spec/jasmine.js"></script>',
                      '<script type="text/javascript" src="/spec/jasmine-html.js"></script>',
                      '<script type="text/javascript">\n' + value.test + '\n</script>',
                      //'<script type="text/javascript">\n' + value.code + '\n</script>',
                      '<script type="text/javascript" src="/spec/runner.js"></script>',
                      '</head>',
                      '<body>',
                      '</body>',
                      '</html>'].join('\n'));
          preview.close();
       // }
      });
    }
  });

function MainCtrl($scope) {
  $scope.test = "describe('Foo', function(){\n  it('contains spec with an expectation', function() {\n    expect(true).toBe(true);\n  });\n});";
  $scope.code = "";
  $scope.run = function() {
    $scope.$broadcast('run', $scope.test, $scope.code);
  }
}

function PreviewCtrl($scope) {
  $scope.preview = { test: "", code: "" };
  $scope.$on('run', function(obj, test, code){
    $scope.preview = { test: test, code: code };
  });
  
}