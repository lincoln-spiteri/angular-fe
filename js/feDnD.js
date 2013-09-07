angular.module("feDnd", []).directive("feDraggable", ["feDndService", function (dndService) {
    
	return {
        restrict: "A",
        scope: {
        	data: "=feDraggable"
        },
        link: function (scope, element, attrs) {
        	
        	element.attr("draggable", "true");

        	// Data can be text, an object, or a function
        	element.on("dragstart", function(event){
        		event.dataTransfer.setData("application/text", "feDnd"); // required
        		dndService.setData(scope.data);
        		//event.dataTransfer.setDragImage(element, 0, 0);
        	});           
        }
    };
}]).directive("feDropable", ["feDndService", function (dndService) {
    
	return {
        restrict: "A",
        scope: {
        	dnd: "=feDropable"
        },
        link: function (scope, element, attrs) {
        	
        	// Data can be text, an object, or a function
        	
        	// Setup drag events
        	element.on("dragenter", function(event){	
        		event.preventDefault();
        		
        		if (angular.isFunction(scope.dnd.dragenter)) {
        			scope.dnd.dragenter();
        		}
        	});
        	
        	element.on("dragover", function(event){	
        		event.preventDefault();
        		
        		if (angular.isFunction(scope.dnd.dragover)) {
        			scope.dnd.dragover();
        		}
        	});
        	
        	element.on("dragleave", function(event){
        		
        		if (angular.isFunction(scope.dnd.dragleave)) {
        			scope.dnd.dragleave();
        		}
        	});
        	
        	element.on("drop", function(event){
        		event.preventDefault();
        		//var data = event.dataTransfer.getData("application/object");
        		var data = dndService.getData();
        		scope.dnd.drop(data);
        	});
        }
    };
}]).factory('feDndService', function() {

	/**
	 * Drag and drop helper service
	 */
	
	var dndData;
	
	return {
		setData: function(data) {
			dndData = data;
		},
		getData: function() {
			return dndData;
		}
	};
});