angular.module("umbraco.directives")
.directive('localize', function ($log, localizationService) {
    return {
        restrict: 'E',
        scope:{
            key: '@',
            params: '='
        },
        replace: true,
        link: function (scope, element, attrs) {
            var key = scope.key;
            //var params = scope.params || [];

            //for (i = 0; i < scope.params.length; i++) {
            //    console.log(scope.params[i]);
            //    params.push(scope.params[i]);
            //}
            //console.log(scope.params);

            //function getParams() {
            //    var array = [];
            //    angular.forEach(scope.params, function (param) {
            //        console.log(param);
            //        array.push(param);
            //    });
            //    return array;
            //};

            var params = scope.$eval(scope.params);
            console.log(params);

            localizationService.localize(key, params).then(function (value) {
                console.log(value);
                console.log(params);
                element.html(value);
            });
        }
    };
})
.directive('localize', function ($log, localizationService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var keys = attrs.localize.split(',');

            angular.forEach(keys, function(value, key){
                var attr = element.attr(value);
                if(attr){
                    if(attr[0] === '@'){
                        var t = localizationService.tokenize(attr.substring(1), scope);
                        localizationService.localize(t.key, t.tokens).then(function(val){
                                element.attr(value, val);
                        });
                    }
                }
            });

        }
    };
});