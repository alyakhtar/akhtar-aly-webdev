(function(){
    angular
        .module('Project')
        .directive('datepicker', datepicker)

    function datepicker(){
        function linkfunc(scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'yy-mm-dd',
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
        return{
            restrict: 'A',
            require : 'ngModel',
            link : linkfunc 
        }
    }
})();