({
  openModel: function(component, event, helper) {
    // for Display Model,set the "isOpen" attribute to "true"
    component.set("v.isOpenInner", true);
  },

  closeModel: function(component, event, helper) {
    // for Hide/Close Model,set the "isOpen" attribute to "Fasle"
    component.set("v.isOpenInner", false);
  },

  likenClose: function(component, event, helper) {
    // Display alert message on the click on the "Like and Close" button from Model Footer
    // and set set the "isOpen" attribute to "False for close the model Box.
    alert("thanks for like Us :)");
    component.set("v.isOpenInner", false);
  },
  handleIsAnonymous: function(component, event, helper) {
    let action = event.getSource().get("v.label");
    console.log(action);
    switch (action) {
      case "I'm a new buyer":
        {
          component.set("v.anonymous", true);
        }
        break;
      case "I am a regular customer":
        {
          component.set("v.anonymous", false);
        }
        break;
    }
  },
  handleClickOrder: function(component, event, helper) {
    let userType = event.getSource().getLocalId();
    console.log(userType);
    var validInfo = component
      .find(`${userType}Info`)
      .reduce(function(validSoFar, inputCmp) {
        // Displays error messages for invalid fields
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get("v.validity").valid;
      }, true);
    if (validInfo) {
      var customer = component.get(`v.${userType}`);
      var appEvent = $A.get("e.c:customerInfoUpdateEvent");
      appEvent.setParams({
        infoUser: customer
      });
      appEvent.fire();
      console.log("test1");
      console.log(userType);

      switch (userType) {
        case "anonymousCustomer":
          {
            // component.set(`v.${userType}`, {
            //   sobjectType: "myCustomer__c",
            //   Id: "a003X0000132iynQAA",
            //   Contact_Name__c: "",
            //   Phone__c: "",
            //   email__c: ""
            // });
            component.set("v.isOpenInner", false);
          }
          break;
        case "newCustomer":
          {
            console.log("test2.5");
            console.log(JSON.stringify(customer));

            var appInnerEvent = $A.get("e.c:logInFromModalEvent");
            appInnerEvent.setParams({
              infoUser: customer
            });
            console.log("test3" + JSON.stringify(customer));
            appInnerEvent.fire();
          }
          break;
      }
    }
  },
  handleClick: function(component, event, helper) {
    let action = event.getSource().get("v.label");
    console.log(action);
  },
  handleLogInEvent: function(component, event, helper) {
    if (component.get("v.isOpenInner")) {
      console.log("modalclose");
      component.set("v.isOpenInner", false);
    }
  }
});
