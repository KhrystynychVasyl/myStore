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
        console.log(JSON.stringify(categories));
        helper.helperAddFirstCategory(component);
        helper.helperFindInnerCategories(component, event, helper, Id);
      } else {
        console.log("Failed with state: " + state);
      }
    });
    // Send action off to be executed
    $A.enqueueAction(action);
  },
  downTheTree: function(component, event, helper) {
    var Id;
    var Name = event.getSource().get("v.label");
    let tempArray = component
      .get("v.tempCategories")
      .filter(el => el.Name === Name);
    Id = tempArray[0].Id;
    var categoriesTree = component.get("v.categoriesTree");
    categoriesTree.push({
      Id: Id,
      Name: Name
    });
    component.set("v.categoriesTree", categoriesTree);
    helper.helperFindInnerCategories(component, event, helper, Id);
    var selectedCategoryIdList = [];
    selectedCategoryIdList = helper.helperFindProductsById(
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
    selectedCategoryIdList = helper.helperFindProductsById(
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
