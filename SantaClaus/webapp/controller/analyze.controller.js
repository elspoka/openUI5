sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("sap.ui.santaclaus.controller.analyze", {

		onInit: function () {  			
			
		},
		
		onChartBar:function () {
		//	console.log("hello");
			//Get the id of VizFrame
			
			var oVizFrame = this.getView().byId("idcolumn");
			var oModel = new sap.ui.model.json.JSONModel();
			
			var data = { "Population" : [
				{"Year": "2014", "value": "21676281"},
				{"Year": "2015", "value": "4676243"},
				{"Year": "2016", "value": "7676289"},
				{"Year": "2017", "value": "51675281"},
				{"Year": "2018", "value": "63854281"}
				
			]};
			
			
			oModel.setData(data);
			
			
			//create Viz dataset 
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: 'Year',
					value: "{Year}" }],
					
				measures : [{
						name:'PCs',
						value: "{value}" }],
						
				data : {
					path :"/Population"
				}
			});
			
			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);
			oVizFrame.setVizType('column');
			
			//set Viz properties
			oVizFrame.setVizProperties({
				plotArea:{
					      colorPalette : d3.scale.category20().range()
				},
				title: {
					     visible:"true",
					     text: "PC Sales"
				}
			});
			
			
			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid' : "valueAxis",
				'type' : "Measure",
				'values' : ["PCs"]
			}),
			
			feedCategoryAxis =  new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid' : "categoryAxis",
				'type' : "Dimension",
				'values' : ["Year"]
			});
		
			oVizFrame.addFeed(feedValueAxis);
			oVizFrame.addFeed(feedCategoryAxis);
			
			
		},
		
		
		
		
		onChartPie:function () {
			//Get the id of the VizFrame	
			var oVizFrame = this.getView().byId("idpiechart");
			
//	      Create a JSON Model and set the data
			var oModel = new sap.ui.model.json.JSONModel();
			
			var data = {
					'Sales' : [{
						  "DrugName": "Laptop",
						  "Revenue": "7.37"
						}, {
						  "DrugName": "Tablet",
						  "Revenue": "9.54"
						}, {
						  "DrugName": "PDA",
						  "Revenue": "6.57"
						}, {
						  "DrugName": "Mobiles",
						  "Revenue": "5.41"
						}, {
						  "DrugName": "Notebooks",
						  "Revenue": "8.69"
						}]};
				oModel.setData(data);
				
				
//		       Create Viz dataset to feed to the data to the graph		
				var oDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions : [{
					        name : 'Drug Name',
						    value : "{DrugName}"}],
					               
					measures : [{
						name : 'Revenue',
						value : '{Revenue}'} ],
					             
					data : {
						path : "/Sales"
					}
				});		
				
				
				oVizFrame.setDataset(oDataset);
				oVizFrame.setModel(oModel);
				
		
//		      Set Viz properties			
				oVizFrame.setVizProperties({
					title:{
						text : "Sales"
					},
		            plotArea: {
		            	colorPalette : d3.scale.category20().range(),
		            	drawingEffect: "glossy"
		                }});
				
				
				var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
				      'uid': "size",
				      'type': "Measure",
				      'values': ["Revenue"]
				    }), 
				    feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
				      'uid': "color",
				      'type': "Dimension",
				      'values': ["Drug Name"]
				    });
				oVizFrame.addFeed(feedSize);
				oVizFrame.addFeed(feedColor);
		},
		
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview",  true);
			}
		}
		
	});

});
