sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent",
], function (Controller, jquery, History, JSONModel , Filter, FilterOperator, UIComponent) {
	"use strict";

	return Controller.extend("sap.ui.santaclaus.controller.restocking", {
		
		onInit : function () {
	        var oModel = new sap.ui.model.json.JSONModel();        
	         
	         $.ajax({
	     		dataType: "json",
	     		url: "https://p5ld5.mocklab.io/suppliersList",
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
	           
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview",  true);
			}
		},
				
		onPress: function (oEvent) {
		//	sap.m.MessageToast.show("This message should appear in the message toast");
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("supplierdetails", {
				supplierPath: oItem.getBindingContext("suppliers").getPath().substr(10).replace("/","")
				
			})
		},
		onFilterInvoices : function (oEvent) {
			
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("supplierList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
		
		
		
	});

});