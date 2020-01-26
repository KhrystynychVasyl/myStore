({
  helperLogInEvent: function(component, event, helper, Id) {
    var appEvent = $A.get("e.c:logInEvent");
    appEvent.setParams({
      Id: Id
    });
    appEvent.fire();
  },
  helperMethod: function() {}
});
