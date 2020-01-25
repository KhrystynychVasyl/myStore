({
  doInit: function(component, event, helper) {
    // Create the action
    var action = component.get("c.getAllCategories");
    // Add callback behavior for when response is received
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        var categories = response.getReturnValue();
        var Id = "test";
        component.set("v.categories", categories);

        var innerAction = component.get("c.getProducts");

        innerAction.setCallback(this, function(innerResponse) {
          var productList = innerResponse.getReturnValue();
          component.set("v.productList", productList);

          let Id = "";

          let Ids = helper.helperFindCategoriesIdInCategory(
            component,
            event,
            helper,
            Id
          );

          let count = helper.helperCountProdInCategory(
            component,
            event,
            helper,
            Ids
          );

          helper.helperAddFirstCategory(component, event, helper, count);

          helper.helperFindInnerCategories(component, event, helper, Id);
        });

        $A.enqueueAction(innerAction);
      } else {
        console.log("Failed with state: " + state);
      }
    });
    // Send action off to be executed
    $A.enqueueAction(action);
  },
  downTheTree: function(component, event, helper) {
    var Id, count;

    var Name = event.getSource().get("v.label");

    let tempArray = component
      .get("v.tempCategories")
      .filter(el => el.product.Name === Name);
    Id = tempArray[0].product.Id;
    count = tempArray[0].count;
    var categoriesTree = component.get("v.categoriesTree");
    categoriesTree.push({
      Id: Id,
      Name: Name,
      count: count
    });
    component.set("v.categoriesTree", categoriesTree);
    helper.helperFindInnerCategories(component, event, helper, Id);
    var selectedCategoryIdList = [];
    selectedCategoryIdList = helper.helperFindCategoriesIdInCategory(
      component,
      event,
      helper,
      Id
    );

    var appEvent = $A.get("e.c:selectedCategoryUpdatedEvent");
    appEvent.setParams({
      selectedCategoryIdList: selectedCategoryIdList
    });
    appEvent.fire();
  },
  upTheTree: function(component, event, helper) {
    var Id;
    var Name = event.getSource().get("v.label");
    let tempArray = component
      .get("v.categoriesTree")
      .filter(el => el.Name === Name);
    Id = tempArray[0].Id;
    var categoriesTree = component.get("v.categoriesTree");
    var index = categoriesTree.findIndex(el => el.Id === Id);

    categoriesTree = categoriesTree.slice(0, index + 1);
    component.set("v.categoriesTree", categoriesTree);
    helper.helperFindInnerCategories(component, event, helper, Id);
    var selectedCategoryIdList = [];
    selectedCategoryIdList = helper.helperFindCategoriesIdInCategory(
      component,
      event,
      helper,
      Id
    );

    var appEvent = $A.get("e.c:selectedCategoryUpdatedEvent");
    appEvent.setParams({
      selectedCategoryIdList: selectedCategoryIdList
    });
    appEvent.fire();
  }
});
