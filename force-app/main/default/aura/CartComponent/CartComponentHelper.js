({
  helperTotalPriceCount: function(component, event, helper) {
    this.helperSaveToCookie(component, event, helper, "cartList");
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
    this.helperSaveToCookie(component, event, helper, "cartList");
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

    var act = component.get("c.addNewOrder");

    let newOrderProduct = [];
    let cartList = component.get("v.cartList");

    cartList.forEach((element, index) =>
      newOrderProduct.push({
        Name: newCustomer.Id + " " + Date.now() + " " + index,
        ProductId: element.product.product.Id,
        Quantity: element.product.quantity
      })
    );

    let myObject = {
      newUser: {
        Id: newCustomer.Id,
        Contact_Name: newCustomer.Contact_Name__c,
        Phone: newCustomer.Phone__c,
        email: newCustomer.email__c
      },
      newOrder: {
        CustomerId: newCustomer.Id,
        OrderName: newOrder.Name,
        AddInformation: newOrder.Additional_Information__c
      },
      newOrder_Product: newOrderProduct
    };

    act.setParams({ myObject: JSON.stringify([myObject]) });
    act.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        this.helperOrderSubmitted(component, event, helper);
      } else {
        alert("Error");
      }
    });
    $A.enqueueAction(act);
  },

  helperSaveToCookie: function(component, event, helper, name) {
    let toSave = component.get(`v.${name}`);
    let carlist = JSON.stringify(toSave);
    this.helperSetCookie(component, event, helper, [name, carlist, 30]);
  },
  helperSetCookie: function(component, event, helper, array) {
    let cname = array[0];
    let cvalue = array[1];
    let exdays = array[2];

    //createCookie(cname, "", -1);
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  helperGetCookie: function(component, event, helper, cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
});
