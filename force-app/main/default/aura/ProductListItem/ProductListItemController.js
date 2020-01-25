({
  handleClick: function(component, event, helper) {
    var productItem = component.get("v.productItem");
    var appEvent = $A.get("e.c:addItemToCartEvent");

    var obj = {
      quantity: 1,
      productItem: productItem
    };

    var quantity = component.get("v.quantity");
    if (quantity) {
      obj.quantity = +quantity;
    }
    appEvent.setParams({ obj: obj });
    appEvent.fire();
  }
});
