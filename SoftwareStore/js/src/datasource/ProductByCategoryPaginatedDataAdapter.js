﻿(function () {
    "use strict";
    /**
     * Inherits PaginatedDataAdapter to overriding the retrievePage in order to call the corresponding service
     * 
     */
    var ProductByCategoryPaginatedDataAdapter = DR.Store.DataSource.PaginatedDataAdapter.extend(
        function (categoryId) {
            this._super();
            this._categoryId = categoryId;
            this._itemType = DR.Store.Datasource.ItemType.PRODUCT;
        },
        {
            /**
            * Retrieves a promise the page specified on parameters
            * return: It should return a json{count: <total number of items>, items: <list of items from page>}
            * @Override
            */
            retrievePage: function (pageNumber, pageSize) {
                return DR.Store.Services.productService.listProductsByCategory(this._categoryId, pageNumber, pageSize).then(function (data) {
                    return {
                        count: data.totalResults,
                        items: data.product
                    }
                }, function (error) {
                    console.log("ProductByCategoryPaginatedDataAdapter: Error retrieving products by category: " + error.details.error.code + " - " + error.details.error.description);
                    return {
                        count: 0,
                        items: [],
                        errorStatus: true
                    }
                });
            }
        }
        );

    WinJS.Namespace.define("DR.Store.DataSource", {
        ProductByCategoryPaginatedDataAdapter: ProductByCategoryPaginatedDataAdapter,
        ProductByCategoryPaginatedDataSource: WinJS.Class.derive(WinJS.UI.VirtualizedDataSource, function (categoryId) {
            this._baseDataSourceConstructor(new ProductByCategoryPaginatedDataAdapter(categoryId));
        })
    });



})();