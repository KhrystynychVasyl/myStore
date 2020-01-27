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
    var act = component.get("c.getNewOrder");

    console.log("1anonym");
    let sObject = {
      newOrder: {
        customer__c: newCustomer.Id,
        Name: newOrder.Name,
        Additional_Information__c: newOrder.Additional_Information__c
      },
      updateCustomer: {
        Id: newCustomer.Id,
        Contact_Name__c: newCustomer.Contact_Name__c,
        Phone__c: newCustomer.Phone__c,
        email__c: newCustomer.email__c
      }
    };
    console.log("2anonym  " + JSON.stringify(sObject));
    act.setParams({ sObject: JSON.stringify(sObject) });
    act.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        console.log("3anonym");
        var newOrder = response.getReturnValue();
        component.set("v.newOrder", newOrder);

        let OrderProduct = component.get("v.OrderProduct");
        let cartList = component.get("v.cartList");
        console.log("4anonym");
        cartList.forEach((element, index) =>
          OrderProduct.push({
            Name: newCustomer.Id + " " + Date.now() + " " + index,
            Quantity__c: element.product.quantity,
            order__c: newOrder.Id,
            product__c: element.product.product.Id
          })
        );

        var action = component.get("c.getOrderProductList");
        action.setParams({ OrderProduct: OrderProduct });
        action.setCallback(this, function(response) {
          var state = response.getState();
          if (state === "SUCCESS") {
            console.log("4anonym");
            var getOrderProductList = response.getReturnValue();
            this.helperOrderSubmitted(component, event, helper);
          } else {
            alert("Error");
          }
        });
        $A.enqueueAction(action);
      }
    });
    $A.enqueueAction(act);
  },

  helperSaveToCookie: function(component, event, helper, name) {
    let toSave = component.get(`v.${name}`);
    console.log(toSave.length);
    console.log(JSON.stringify(toSave));
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
