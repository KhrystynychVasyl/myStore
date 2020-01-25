({
  handleClick: function(component, event, helper) {
    var productItem = component.get("v.productItem");
    var appEvent = $A.get("e.c:addItemToCartEvent");
    // event.getSource().set("v.disabled", true);
    appEvent.setParams({ productItem: productItem });
    appEvent.fire();
  }
});
