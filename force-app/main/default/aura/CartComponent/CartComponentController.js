({
  handleClick: function(component, event, helper) {
    var action = event.getSource().get("v.label");
    switch (action) {
      case "Create Order":
        {
          var truthy = component.get("v.truthy");
          truthy = false;
          component.set("v.truthy", truthy);
        }
        break;
      case "Clear Order":
        {
          component.set("v.cartList", []);
        }
        break;
      case "Back to Order":
        {
          var truthy = component.get("v.truthy");
          truthy = true;
          component.set("v.truthy", truthy);
        }
        break;
      case "Info":
        {
          console.log(JSON.stringify(component.get("v.newOrder")));
          console.log(JSON.stringify(component.get("v.newCustomer")));
        }
        break;
    }
  },
  handleApplicationEvent: function(component, event, helper) {
    var obj = event.getParam("obj");

    var productItem = obj.productItem;
    var quantity = obj.quantity;
    var cartList = component.get("v.cartList");
    var Id = productItem.Id;
    if (
      cartList.length === 0 ||
      cartList.filter(el => el.Id === Id).length === 0
    ) {
      cartList.push({
        Id: Id,
        product: {
          quantity: quantity,
          product: productItem
        }
      });
      var totalPrice = component.get("v.totalPrice");
      totalPrice = cartList.reduce(
        (acc, cur) => acc + cur.product.product.price__c * cur.product.quantity,
        0
      );
      component.set("v.totalPrice", totalPrice);
      component.set("v.cartList", cartList);
    }
  },
  handleCartListChange: function(component, event, helper) {
    var cartList = component.get("v.cartList");
    var totalPrice = component.get("v.totalPrice");
    totalPrice = cartList.reduce(
      (acc, cur) => acc + cur.product.product.price__c * cur.product.quantity,
      0
    );
    component.set("v.totalPrice", totalPrice);
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
    console.log(typeof Id, Id);
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
