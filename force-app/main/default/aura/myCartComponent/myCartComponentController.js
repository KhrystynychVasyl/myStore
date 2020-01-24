({
  handleClick: function(component, event, helper) {
    console.log(JSON.stringify(component.get("v.cartList")));
  },
  handleApplicationEvent: function(component, event, helper) {
    var productItem = event.getParam("productItem");
    var cartList = component.get("v.cartList");
    var id = productItem.Id;
    if (
      cartList.length === 0 ||
      cartList.filter(el => el.id === id).length === 0
    ) {
      cartList.push({
        id: id,
        product: {
          quantity: 1,
          product: productItem
        }
      });
      component.set("v.cartList", cartList);
    }
  }
});
