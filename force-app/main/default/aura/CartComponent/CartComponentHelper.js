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

  helperMethod: function() {}
});
