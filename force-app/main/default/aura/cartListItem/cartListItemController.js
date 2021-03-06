({
  handleClick: function(component, event, helper) {
    var action = event.getSource().get("v.label");
    //console.log(event.getSource().get("v.label"));
    switch (action) {
      case "Add to Cart":
        {
          var quantity = component.get("v.quantity");
          component.set("v.quantity", quantity + 1);
          helper.helperCartListChange(component);
        }

        break;
      case "Remove from Cart":
        {
          var quantity = component.get("v.quantity");
          if (quantity > 1) {
            component.set("v.quantity", quantity - 1);
          } else {
            var cartList = component.get("v.cartList");
            var cartItemIn = component.get("v.cartItemIn");
            cartList = cartList.filter(el => el.Id !== cartItemIn.Id);
            component.set("v.cartList", cartList);
          }

          helper.helperCartListChange(component);
        }
        break;
      case "Delete Position":
        {
          var cartList = component.get("v.cartList");
          var cartItemIn = component.get("v.cartItemIn");
          cartList = cartList.filter(el => el.Id !== cartItemIn.Id);
          component.set("v.cartList", cartList);
          helper.helperCartListChange(component);
        }
        break;
    }
  },

  myAction: function(component, event, helper) {}
  //   handleInit: function(component) {
  //     component.set("v.cartItem", {});
  //   }
});
