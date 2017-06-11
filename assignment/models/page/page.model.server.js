var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var websiteModel = require('../website/website.model.server.js');
var pageModel = mongoose.model('PageModel', pageSchema);


pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById =findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page){
	return pageModel
				.create(page)
				.then(function(page){
					return websiteModel
								.findWebsiteById(websiteId)
								.then(function(website){
									page._website = website._id;
									website.pages.push(page._id);
									website.save();
		                            page.save();
		                            return page;
								}, function(err){
									return err;
								});
				}, function(err){
					return err;
				});
}

function findAllPagesForWebsite(websiteId){
	return pageModel.find({"_website": websiteId})
}

function findPageById(pageId){
	return pageModel.findById(pageId);
}

function updatePage(pageId,newPage){
	return pageModel.update({_id: pageId},{$set: newPage});
}

function deletePage(pageId){
	return pageModel
			.findById(pageId).populate('_website')
			.then(function(page){
				index = page._website.pages.indexOf(pageId);
				page._website.pages.splice(index,1);
				page._website.save();
				return pageModel.remove({_id: pageId});
			});
}
