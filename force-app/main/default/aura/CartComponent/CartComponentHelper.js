({
  helperTotalPriceCount: function(component, event, helper) {
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

  helperOrderSubmitted: function(component, event, helper) {
    this.helperOrderWindowInformationToggleHide(component, event, helper, true);
    var cartList = component.get("v.cartList");
    cartList = [];
    component.set("v.cartList", cartList);
  },
  helperOrderWindowInformationToggleHide: function(
    component,
    event,
    helper,
    status
  ) {
    var truthy = component.get("v.truthy");
    truthy = status;
    component.set("v.truthy", truthy);
  },
  helperShowModal: function(component, event, helper) {
    var isOpen = component.get("v.isOpen");
    isOpen = true;
    component.set("v.isOpen", isOpen);
  },
  helperSubmitOrder: function(component, event, helper) {

    var newCustomer = component.get("v.newCustomer");
    var newOrder = component.get("v.newOrder");
    var act = component.get("c.getNewOrder");
    
    console.log("1anonym");
    let obj = {
      Id: newCustomer.Id,
      OrderName: newOrder.Name,
      AddInformation: newOrder.Additional_Information__c
    };
    console.log("2anonym  " + JSON.stringify(obj));
    act.setParams({ obj: obj });
    act.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        console.log("3anonym");
        var newOrder = response.getReturnValue();
        component.set("v.newOrder", newOrder);

        let OrderProduct = component.get("v.OrderProduct");
        let cartList = component.get("v.cartList");
        console.log("4anonym");
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
            console.log("4anonym");
            var getOrderProductList = response.getReturnValue();
            this.helperOrderSubmitted(component, event, helper);
          } else {
            alert("Error");
          }
        });
        $A.enqueueAction(action);
      }
    });
    $A.enqueueAction(act);
  }
});
