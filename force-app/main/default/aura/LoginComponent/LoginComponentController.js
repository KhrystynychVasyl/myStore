({
  handleLoginClick: function(component, event, helper) {
    var validCustomer = component
      .find("newCustomerForm")
      .reduce(function(validSoFar, inputCmp) {
        // Displays error messages for invalid fields
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get("v.validity").valid;
      }, true);

    if (validCustomer) {
      // Create the new expense
      var newCustomer = component.get("v.newCustomer");

      var label = event.getSource().get("v.label");
      var action;
      switch (label) {
        case "Log In":
          {
            action = component.get("c.shopLogIn");
          }
          break;
        case "Sing Up":
          {
            action = component.get("c.shopSingUp");
          }
          break;
        default:
          alert("Error");
      }

      action.setParams({
        newCustomer: newCustomer
      });
      action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          var newCustomer = response.getReturnValue();
          component.set("v.newCustomer", newCustomer);
          helper.helperLogInEvent(
            component,
            event,
            helper,
            newCustomer.Id,
            false
          );
        } else {
          component.set("v.newCustomer", {
            sobjectType: "myCustomer__c",
            Name: "",
            Password__c: "",
            Id: ""
          });
          var state = response.getError();
          switch (label) {
            case "Log In":
              {
                alert("Invalid information");
              }
              break;
            case "Sing Up":
              {
                alert(state[0].message);
              }
              break;
            default:
              alert("Error");
          }
        }
      });
      $A.enqueueAction(action);
    }
  },
  handleLogOut: function(component, event, helper) {
    component.set("v.newCustomer", {
      sobjectType: "myCustomer__c",
      Id: "",
      Name: "",
      Password__c: ""
    });
    helper.helperLogInEvent(component, event, helper, "", true);
  }
});
