({
  helperLogInEvent: function(component, event, helper, array) {
    let Id = array[0];
    let status = array[1];
    let type = array[2];
    var appEvent = $A.get("e.c:logInEvent");
    appEvent.setParams({
      Id: Id,
      type: type
    });
    component.set("v.logOut", status);
    appEvent.fire();
  },
  helperLoginProcess: function(component, event, helper, array) {
    let label = array[0];
    let type = array[1];
    var newCustomer = component.get("v.newCustomer");
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

    let sendUser = {
      Name: newCustomer.Name,
      Password__c: newCustomer.Password__c
    };
    
    action.setParams({
      newCustomer: JSON.stringify(sendUser)
    });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        var newCustomer = response.getReturnValue();
        component.set("v.newCustomer", newCustomer);
        console.log(JSON.stringify(newCustomer));
        let status = false;
        this.helperLogInEvent(component, event, helper, [
          newCustomer.Id,
          status,
          type
        ]);
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
              alert(state[0].message);
            }
            break;
          case "Sing Up":
            {
              alert("answer " + state[0].message);
            }
            break;
          default:
            alert("Error");
        }
      }
    });
    $A.enqueueAction(action);
  }
});
