﻿/**
 * This is the main controller of the application, handles all common functionalities, for example common buttons on all pages of the application
 */
(function () {
    "use strict";
    
    var Class = DR.MVC.BaseController.extend(
        function () {
            this._super();
            this._view = new DR.Store.View.MainApplicationView();
            this._view.initialize();
        },
        {   _view: null,
            handle: function (detail) {
                WinJS.Utilities.eventMixin.addEventListener(this._view.events.CART_BUTTON_CLICKED, this._onCartButtonClicked.bind(this), false);
                WinJS.Utilities.eventMixin.addEventListener(this._view.events.HOME_BUTTON_CLICKED, this._onHomeButtonClicked.bind(this), false);
            },

            /**
             * This function is called when a product/s is successfully added to the cart
             */
            handleProductAddedToCart: function () {
                var self = this;
                DR.Store.Services.cartService.getItemsCount().then(function (count) {
                    self._view.animatePageHeaderCartIcon(count);
                });
                
            },

            /**
             * Default behaviour when CART_BUTTON_CLICKED event is dispatched
             */
            _onCartButtonClicked: function (e) {
                this.goToPage(DR.Store.URL.CART_PAGE);
            },

            /**
             * Default behaviour when HOME_BUTTON_CLICKED event is dispatched
             */
            _onHomeButtonClicked: function (e) {
                this.goToPage(DR.Store.URL.HOME_PAGE);
            }


        });
    // EXPOSING THE CLASS
    WinJS.Namespace.define("DR.Store.Controller", {
        MainApplicationController: Class
    });

})();