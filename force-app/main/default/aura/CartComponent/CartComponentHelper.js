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
    this.helperOrderWindowInformationToggleHide(component, event, helper);
    var cartList = component.get("v.cartList");
    carlist = [];
    component.set("v.cartList", carlist);
  },
  helperOrderWindowInformationToggleHide: function(component, event, helper) {
    var truthy = component.get("v.truthy");
    truthy = !truthy;
    component.set("v.truthy", truthy);
  }
});
