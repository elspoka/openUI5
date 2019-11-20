sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	 "sap/ui/model/json/JSONModel",
	 "sap/ui/model/Filter",
	 "sap/ui/model/FilterOperator"
	 
], function (Controller, History, JSONModel , Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.santaclaus.controller.productDetails", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("productdetails").attachPatternMatched(this._onObjectMatched, this);
			
					},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").productPath,
				model: "products"
			});
			
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