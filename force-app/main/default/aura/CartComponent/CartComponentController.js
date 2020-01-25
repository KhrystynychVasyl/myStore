({
  handleClick: function(component, event, helper) {
    var action = event.getSource().get("v.label");
    switch (action) {
      default: {
        console.log(JSON.stringify(component.get("v.newOrder")));
        console.log(JSON.stringify(component.get("v.newCustomer")));
      }
    }
  },
  handleApplicationEvent: function(component, event, helper) {
    var productItem = event.getParam("productItem");
    var cartList = component.get("v.cartList");
    var Id = productItem.Id;
    if (
      cartList.length === 0 ||
      cartList.filter(el => el.Id === Id).length === 0
    ) {
      cartList.push({
        Id: Id,
        product: {
          quantity: 1,
          product: productItem
        }
      });
      component.set("v.cartList", cartList);
    }
  },
  createCustomer: function(component, event, helper) {
    var validCustomer = component
      .find("newCustomerForm")
      .reduce(function(validSoFar, inputCmp) {
        // Displays error messages for invalid fields
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get("v.validity").valid;
      }, true);
    if (validCustomer) {
      // Create the new expense
      var newCustomer = component.get("v.newCustomer");
      var action = component.get("c.getNewCustomer");
      action.setParams({
        newCustomer: newCustomer
      });
      action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          var newCustomer = response.getReturnValue();
          component.set("v.newCustomer", newCustomer);
        }
      });
      $A.enqueueAction(action);
    }
  },
  createOrder: function(component, event, helper) {
      // Create the new expense
      var newCustomer = component.get("v.newCustomer");
      var act = component.get("c.getNewOrder");
      let Id = newCustomer.Id;
      console.log(typeof Id, Id)
      act.setParams({
        Id: Id
      });
      act.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          var newOrder = response.getReturnValue();
          component.set("v.newOrder", newOrder);
        }
      });
      $A.enqueueAction(act);
    
  }
});
