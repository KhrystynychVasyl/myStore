({
  handleClick: function(component, event, helper) {
    //let currentPage = event.getsource().getlocalid();
    let page = event.getSource().get("v.label");
    console.log(typeof page);
    page = parseInt(page, 10);
    console.log(typeof page);
    component.set("v.page", parseInt(page, 10));
    helper.refreshPage(component, event, helper, page);

    console.log(page);
  },
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
  handleApplicationEvent: function(component, event, helper) {
    var selectedCategoryIdList = event.getParam("selectedCategoryIdList");
    component.set("v.selectedCategoryIdList", selectedCategoryIdList);

    helper.refreshPage(component, event, helper);
  }
});
