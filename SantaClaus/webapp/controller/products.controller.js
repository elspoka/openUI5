sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	 "sap/ui/core/UIComponent"
], function (Controller, jquery, JSONModel, History , Filter, FilterOperator, UIComponent) {
	"use strict";
		
	return Controller.extend("sap.ui.santaclaus.controller.products", {

		onInit : function () {
	        var oModel = new sap.ui.model.json.JSONModel();  
	       
				var oViewModel = new JSONModel({
					currency: "USD"
				});
				this.getView().setModel(oViewModel, "view");
		
	         
	         $.ajax({
	     		dataType: "json",
	     		url: "https://api.backendless.com/2CF53ABC-39A6-B0FE-FFCF-D90B34DC5E00/B508D603-A943-E97E-FF7E-936F9CBF7B00/data/Products",
	     		type: "GET",
	     		success: function( oData, textStatus, xhr ) {

	     			console.log(oData);
	     			oModel.setData(oData);

	     		},
	     		error: function( xhr, textStatus, errorThrown ) {
	     			
	     		}
	         
	         
	         })
	         this.getView().setModel(oModel);
	         console.log(oModel);
	                 
	      },
	      onPress: function (oEvent) {
				var oItem = oEvent.getSource();
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("productdetails", {
					productPath: oItem.getBindingContext("products").getPath().substr(1)
				});
			},
			
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", true);
			}
		},
		onFilterProducts : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("productList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
		
		
	});

});