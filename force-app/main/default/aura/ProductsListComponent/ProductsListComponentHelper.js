({
  refreshPage: function(component, event, helper, page) {
    //let page = component.get("v.page");
    let pageLimit = component.get("v.pageLimit");
    if (!page) {
      page = 1;
    }

    var selectedCategoryIdList = component.get("v.selectedCategoryIdList");
    let SentObject = {
      selectedCategoryIdList: selectedCategoryIdList,
      page: page,
      pageLimit: pageLimit
    };

    console.log(JSON.stringify(SentObject));

    var action = component.get("c.getProductsByIds");
    action.setParams({ SentObject: JSON.stringify(SentObject) });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        let responseBody = JSON.parse(response.getReturnValue());
        let count = responseBody.pagesQuantity;
        let arrButton = component.get("v.arrButton");
        arrButton = [];

        for (let i = 0; i < count / pageLimit; i++) {
          arrButton.push(i + 1);
        }
        component.set("v.products", responseBody.productList);
        component.set("v.arrButton", arrButton);
      } else {
        console.log("Failed with state: " + state);
      }
    });
    // Send action off to be executed
    $A.enqueueAction(action);
  },
  getPagesQuantity: function(component, event, helper) {}
});
