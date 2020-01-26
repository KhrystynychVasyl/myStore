({
  doInit: function(component, event, helper) {
    // Create the action
    var action = component.get("c.getProducts");
    // Add callback behavior for when response is received
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
  },
  handleApplicationEvent: function(component, event) {
    var selectedCategoryIdList = event.getParam("selectedCategoryIdList");

    var action = component.get("c.getProductsByIds");
    action.setParams({ selectedCategoryIdList: selectedCategoryIdList });
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
