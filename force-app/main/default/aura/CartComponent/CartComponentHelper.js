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
  helperOrderWindowInformationToggleHide: function(component, event, helper, status) {
    var truthy = component.get("v.truthy");
    truthy = status;
    component.set("v.truthy", truthy);
  }
});
