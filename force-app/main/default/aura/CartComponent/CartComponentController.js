({
  doInit: function(component, event, helper) {
    let someData = helper.helperGetCookie(component, event, helper, "cartList");

    if (someData === "") {
      alert("empty");
    } else {
      //console.log(someData);
      let cartList = JSON.parse(someData);
      cartList.forEach(el => console.log(el.Id));
      component.set("v.cartList", cartList);
      helper.helperTotalPriceCount(component, event, helper);
    }

    // console.log(typeof JSON.parse(someData));
    // component.set("v.cartList", someData);
    //alert("START");
  },

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
    let Id = event.getParam("Id");
    let type = event.getParam("type");
    let newCustomer = component.get("v.newCustomer");
    console.log("test9");
    console.log(JSON.stringify(type));

    console.log(JSON.stringify(Id));
    if (type === "From Modal") {
      newCustomer.Id = Id;
      component.set("v.newCustomer", newCustomer);
      console.log("almost");
      helper.helperSubmitOrder(component, event, helper);
    } else {
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
    }
  },
  handleCartListChange: function(component, event, helper) {
    helper.helperTotalPriceCount(component, event, helper);
  },
  SubmitOrder: function(component, event, helper) {
    // if (component.get("v.newCustomer").Id) {
    var validOrder = component
      .find("newOrderForm")
      .reduce(function(validSoFar, inputCmp) {
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get("v.validity").valid;
      }, true);

    if (validOrder) {
      helper.helperShowModal(component, event, helper);
    }
    // } else {
    //   alert("you need to LogIn");
    // }
  },
  handleCustomerInfoUpdateEvent: function(component, event, helper) {
    var infoUser = event.getParam("infoUser");
    let newCustomer = component.get("v.newCustomer");
    newCustomer.Id = infoUser.Id;
    newCustomer.Contact_Name__c = infoUser.Contact_Name__c;
    newCustomer.Phone__c = infoUser.Phone__c;
    newCustomer.email__c = infoUser.email__c;
    component.set("v.newCustomer", newCustomer);
    if (infoUser.Id) {
      console.log("anonym");
      helper.helperSubmitOrder(component, event, helper);
    } else {
      console.log("need log in action");
    }
  }
});
