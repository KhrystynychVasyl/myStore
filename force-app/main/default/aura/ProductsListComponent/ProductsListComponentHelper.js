({
  refreshPage: function(component, event) {
    let page = component.get("v.page");
    let pageLimit = component.get("v.pageLimit");
    var selectedCategoryIdList = component.get("v.selectedCategoryIdList");
    var action = component.get("c.getProductsByIds");
    action.setParams({
      selectedCategoryIdList: selectedCategoryIdList,
      page: page,
      pageLimit: pageLimit
    });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        let count = component.get("v.count");
        let arrButton = component.get("v.arrButton");
        arrButton = [];
        for (let i = 0; i < count / pageLimit; i++) {
          arrButton.push(i + 1);
        }
        component.set("v.arrButton", arrButton);

        this.refreshProductList(component, event, response);
        // let productList = response.getReturnValue();

        // productList = productList.map(element => {
        //   if (element.Image__c) {
        //     element.ImageURL__c =
        //       element.ImageURL__c +
        //       element.Image__c.split("OnlineShop")[1]
        //         .split('" alt')[0]
        //         .split("amp;")
        //         .join("");
        //   } else {
        //     element.ImageURL__c = "";
        //   }
        //   return element;
        // });

        // component.set("v.products", productList);
      } else {
        console.log("Failed with state: " + state);
      }
    });
    $A.enqueueAction(action);
  },
  getAllProducts: function(component, event) {
    let page = 1;
    let pageLimit = 12;

    var action = component.get("c.getProducts");
    action.setParams({
      page: page,
      pageLimit: pageLimit
    });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        this.refreshProductList(component, event, response);
      } else {
        console.log("Failed with state: " + state);
      }
    });
    $A.enqueueAction(action);
  },
  getCountProductsByIds: function(component, event) {
    var selectedCategoryIdList = component.get("v.selectedCategoryIdList");
    var action = component.get("c.getCountProductsByIds");
    action.setParams({
      selectedCategoryIdList: selectedCategoryIdList
    });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        let count = response.getReturnValue();
        component.set("v.count", count);
        this.refreshPage(component, event);
      }
    });
    $A.enqueueAction(action);
  },
  refreshProductList: function(component, event, response) {
    let productList = response.getReturnValue();
    productList = productList.map(element => {
      if (element.Image__c) {
        element.ImageURL__c =
          element.ImageURL__c +
          element.Image__c.split("OnlineShop")[1]
            .split('" alt')[0]
            .split("amp;")
            .join("");
      } else {
        element.ImageURL__c = "";
      }
      return element;
    });
    component.set("v.products", productList);
  }
});
