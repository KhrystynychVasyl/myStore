({
  handleClick: function(component, event, helper) {
    var action = event.getSource().get("v.label");
    //console.log(event.getSource().get("v.label"));
    switch (action) {
      case "Add to Cart":
        {
          var quantity = component.get("v.quantity");
          component.set("v.quantity", quantity + 1);
        }

        break;
      case "Remove from Cart": 
        {
          var quantity = component.get("v.quantity");
          if (quantity > 1) {
            component.set("v.quantity", quantity - 1);
          }
        }
        break;
    }
  },
  myAction: function(component, event, helper) {}
  //   handleInit: function(component) {
  //     component.set("v.cartItem", {});
  //   }
});
