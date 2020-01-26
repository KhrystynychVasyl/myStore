({
  handleClick: function(component, event, helper) {
    var action = event.getSource().get("v.label");
    switch (action) {
      case "Create Order":
        {
          let cartList = component.get("v.cartList");
          if (cartList.length > 0) {
            helper.helperOrderWindowInformationToggleHide(
              component,
              event,
              helper,
              false
            );
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
          helper.helperOrderWindowInformationToggleHide(
            component,
            event,
            helper,
            true
          );
        }
        break;
      case "Info":
        {
          console.log(JSON.stringify(component.get("v.newOrder")));
          console.log(JSON.stringify(component.get("v.newCustomer")));
          var isOpen = component.get("v.isOpen");
          isOpen = true;
          component.set("v.isOpen", isOpen);
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
    if (Id === "") {
      helper.helperOrderWindowInformationToggleHide(
        component,
        event,
        helper,
        true
      );
    }
    newCustomer.Id = Id;

    component.set("v.newCustomer", newCustomer);
  },
  handleCartListChange: function(component, event, helper) {
    helper.helperTotalPriceCount(component, event, helper);
  },
  createOrder: function(component, event, helper) {
    if (component.get("v.newCustomer").Id) {
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

            let OrderProduct = component.get("v.OrderProduct");
            let cartList = component.get("v.cartList");

            cartList.forEach((element, index) =>
              OrderProduct.push({
                Name: newCustomer.Id + " " + Date.now() + " " + index,
                Quantity__c: element.product.quantity,
                order__c: newOrder.Id,
                product__c: element.product.product.Id
              })
            );

            var action = component.get("c.getOrderProductList");
            action.setParams({ OrderProduct: OrderProduct });
            action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                var getOrderProductList = response.getReturnValue();
                helper.helperOrderSubmitted(component, event, helper);
              } else {
                alert("Error");
              }
            });
            $A.enqueueAction(action);
          }
        });
        $A.enqueueAction(act);
      }
    } else {
      alert("you need to LogIn");
    }
  }
});
