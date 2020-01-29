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
        component.set("v.products", response.getReturnValue());
      } else {
        console.log("Failed with state: " + state);
      }
    });
    // Send action off to be executed
    $A.enqueueAction(action);
  }
});
