({
  helperLogInEvent: function(component, event, helper, Id, status) {
    var appEvent = $A.get("e.c:logInEvent");
    appEvent.setParams({
      Id: Id
    });
    component.set("v.logOut", status);
    appEvent.fire();
  }
});
