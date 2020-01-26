({
  handleLogInFromModalEvent: function(component, event, helper) {
    var infoUser = event.getParam("infoUser");
  },
  handleLoginClick: function(component, event, helper) {
    var validCustomer = component
      .find("newCustomerForm")
      .reduce(function(validSoFar, inputCmp) {
        // Displays error messages for invalid fields
        inputCmp.showHelpMessageIfInvalid();
        return validSoFar && inputCmp.get("v.validity").valid;
      }, true);

    if (validCustomer) {
      var label = event.getSource().get("v.label");
      let type = "From LogIn";
      helper.helperLoginProcess(component, event, helper, [label, type]);
      console.log("test");
    }
  },
  handleLogOut: function(component, event, helper) {
    component.set("v.newCustomer", {
      sobjectType: "myCustomer__c",
      Id: "",
      Name: "",
      Password__c: ""
    });
    let Id = "";
    let status = true;
    let type = "From LogIn";
    helper.helperLogInEvent(component, event, helper, [Id, status, type]);
  },
  handleLogInFromModalEvent: function(component, event, helper) {
    console.log("test3");
    var infoUser = event.getParam("infoUser");
    var newCustomer = component.get("v.newCustomer");
    newCustomer.Name = infoUser.Name;
    newCustomer.Password__c = infoUser.Password__c;
    component.set("v.newCustomer", newCustomer);
    console.log("test4");
    let label = "Log In";
    let type = "From Modal";
    helper.helperLoginProcess(component, event, helper, [label, type]);
  }
});
