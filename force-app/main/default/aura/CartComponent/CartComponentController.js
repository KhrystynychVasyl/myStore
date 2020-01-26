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
    totalPrice = cartList
      .reduce(
        (acc, cur) => acc + cur.product.product.price__c * cur.product.quantity,
        0
      )
      .toFixed(2);
    component.set("v.totalPrice", totalPrice);
  },
  createOrder: function(component, event, helper) {
    var validCustomer = component
      .find("newOrderForm")
      .reduce(function(validSoFar, inputCmp) {
        // Displays error messages for invalid fields
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get("v.validity").valid;
      }, true);

    if (validCustomer) {
      // Create the new expense
      var newCustomer = component.get("v.newCustomer");
      var newOrder = component.get("v.newOrder");
      var act = component.get("c.getNewOrder");
      // console.log(JSON.stringify(newCustomer));

      // console.log(JSON.stringify(newOrder));
      // let obj = {
      //   Id: newCustomer.Id,
      //   Name: newCustomer.Name,
      //   Password: newCustomer.Password__c,
      //   OrderName: newOrder.Name,
      //   AddInformation: newOrder.Additional_Information__c
      // };

      console.log(
        "before: " +
          JSON.stringify({
            Id: newCustomer.Id,
            Name: newCustomer.Name,
            AddInformation: newOrder.Additional_Information__c
          })
      );
      act.setParams({
        Id: newCustomer.Id,
        Name: newCustomer.Name,
        AddInformation: newOrder.Additional_Information__c
      });
      act.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          var newOrder = response.getReturnValue();
          console.log("after: " + JSON.stringify(newOrder));
          // component.set("v.newOrder", newOrder);
        }
      });
      $A.enqueueAction(act);
    }
  }
});
