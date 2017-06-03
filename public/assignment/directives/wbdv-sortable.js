(function(){
	angular
		.module('WebAppMaker')
		.directive('wbdvSortable', wbdvSortable)

		function wbdvSortable(){
			function linkFunction(scope, element){
				$(element).sortable();
			}

			return{
				link: linkFunction
			}
		}
})();