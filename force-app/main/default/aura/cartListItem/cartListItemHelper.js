({
  helperCartListChange: function(component, event, helper) {
    var appEvent = $A.get("e.c:cartListChange");
    appEvent.fire();
  },
  helperMethod: function() {}
});
