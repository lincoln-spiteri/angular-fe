/* Reset and disable a form element based on the eveluation of an expression */

angular.module("fe.resetDisable", []).directive('resetDisable', function () {
    
	return {
    	//require: 'ngModel',
        restrict: 'A',
        scope: {
        	model: '=ngModel',
        	resetDisable: '@'
        },
        link: function (scope, element, attrs) {

            scope.$watch('resetDisable', function (newValue, oldValue) {
                
            	if (newValue === "false") {
            		scope.model = false; // TODO: reset based on element type.
            		element.attr("disabled", true);
            	}
            	else {
            		element.removeAttr("disabled");
            	}
            });
            
            // see http://stackoverflow.com/questions/15269737/why-is-ngmodel-setviewvalue-not-working-from/15272359#15272359
            scope.$watch('model', function() {
                scope.$eval(attrs.ngModel + ' = model');
            });

            scope.$watch(attrs.ngModel, function(val) {
                scope.model = val;
            });            
        }
    };
});