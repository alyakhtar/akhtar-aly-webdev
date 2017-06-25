var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');
var pageModel = require('../page/page.model.server.js');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);


widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById =findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget){
	return widgetModel
				.create(widget)
				.then(function(widget){
					return pageModel
							.findPageById(pageId)
							.then(function(page){
								widget._page = page._id;
								page.widgets.push(widget._id);
								widget.save();
	                            page.save();
	                            return widget;
							}, function(err){
								return err;
							});
				}, function(err){
					return err;
				});
}

function getWidgets(count, widgets, relevantWidgets) {
        if(count === 0){
            return relevantWidgets;
        }
        return widgetModel
        		.findById(widgets.shift())
	            .then(function (widget) {
	            	if(widget !== null){
		                relevantWidgets.push(widget);
	            	}
                return getWidgets(--count, widgets, relevantWidgets);
            });
}

function findAllWidgetsForPage(pageId){
	return pageModel
				.findPageById(pageId)
				.then(function(page){
					var widgets = page.widgets;
	                var count = widgets.length;
	                var relevantWidgets = [];
	                return getWidgets(count, widgets, relevantWidgets);
				});
}

function findWidgetById(widgetId){
	return widgetModel.findById(widgetId);
}

function updateWidget(widgetId,newWidget){
	return widgetModel.update({_id: widgetId},{$set: newWidget});
}

function deleteWidget(widgetId){
	return widgetModel
			.findById(widgetId).populate('_page')
			.then(function(widget){
				index = widget._page.widgets.indexOf(widgetId);
				widget._page.widgets.splice(index,1);
				widget._page.save();
				return widgetModel.remove({_id: widgetId});
			});
}

function reorderWidget(pageId, start, end){
	return pageModel
				.findPageById(pageId)
				.then(function(page){
					temp = page.widgets[start];
					page.widgets.splice(start, 1);
					if(parseInt(end) === page.widgets.length){
						page.widgets.push(temp);
					} else{
						page.widgets.splice(end, 0, temp);
					}
					page.save();
					return;
				});
}