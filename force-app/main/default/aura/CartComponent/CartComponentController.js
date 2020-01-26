({
  handleClick: function(component, event, helper) {
    var action = event.getSource().get("v.label");
    switch (action) {
      case "Create Order":
        {
          let cartList = component.get("v.cartList");
          if (cartList.length > 0) {
            var truthy = component.get("v.truthy");
            truthy = false;
            component.set("v.truthy", truthy);
          } else {
            alert("Empty Order List");
          }
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
  handleAddItemToCartEvent: function(component, event, helper) {
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
      component.set("v.cartList", cartList);

      helper.helperTotalPriceCount(component, event, helper);
    }
  },
  handleLogInEvent: function(component, event, helper) {
    let newCustomer = component.get("v.newCustomer");
    let Id = event.getParam("Id");
    newCustomer.Id = Id;
    component.set("v.newCustomer", newCustomer);
  },
  handleCartListChange: function(component, event, helper) {
    helper.helperTotalPriceCount(component, event, helper);
  },
  createOrder: function(component, event, helper) {
    var validOrder = component
      .find("newOrderForm")
      .reduce(function(validSoFar, inputCmp) {
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get("v.validity").valid;
      }, true);

    if (validOrder) {
      var newCustomer = component.get("v.newCustomer");
      var newOrder = component.get("v.newOrder");
      var act = component.get("c.getNewOrder");

      let obj = {
        Id: newCustomer.Id,
        OrderName: newOrder.Name,
        AddInformation: newOrder.Additional_Information__c
      };
      act.setParams({ obj: obj });
      act.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          var newOrder = response.getReturnValue();
          component.set("v.newOrder", newOrder);
        }
      });
      $A.enqueueAction(act);
    }
  }
});
