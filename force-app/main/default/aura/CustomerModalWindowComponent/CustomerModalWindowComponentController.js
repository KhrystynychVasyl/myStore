({
  openModel: function(component, event, helper) {
    // for Display Model,set the "isOpen" attribute to "true"
    component.set("v.isOpen", true);
  },

  closeModel: function(component, event, helper) {
    // for Hide/Close Model,set the "isOpen" attribute to "Fasle"
    component.set("v.isOpen", false);
  },

  likenClose: function(component, event, helper) {
    // Display alert message on the click on the "Like and Close" button from Model Footer
    // and set set the "isOpen" attribute to "False for close the model Box.
    alert("thanks for like Us :)");
    component.set("v.isOpen", false);
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
  handleClick: function(component, event, helper) {
    let action = event.getSource().get("v.label");
    console.log(action);
  }
});
