sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	 "sap/ui/model/json/JSONModel",
	 "sap/m/MessageToast",
	 "sap/ui/model/Filter",
	 "sap/ui/model/FilterOperator"
], function (Controller, History, JSONModel , MessageToast , Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.ui.santaclaus.controller.supplierDetails", {
onInit: function () {
			
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("supplierdetails").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/Suppliers/" + oEvent.getParameter("arguments").supplierPath,
				model: "suppliers"
			});
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("restocking",  true);
			}
		},
		onClickDummy: function () {
			sap.m.MessageToast.show("Under Construction");
		},
		onClickToRestoreData: function() {
			location.reload();
		}
	});
});