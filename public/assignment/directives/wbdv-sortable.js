(function(){
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortable)

    function wbdvSortable(){
        function linkFunction(scope, element){
            $(element).sortable({
                axis: 'y',
                start: function(event, ui){
                    startPos = ui.item.index();
                },
                stop: function(event, ui){
                    endPos = ui.item.index();
                    if (startPos != endPos) {
                        scope.model.updatePosition(startPos, endPos);
                    }
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();
