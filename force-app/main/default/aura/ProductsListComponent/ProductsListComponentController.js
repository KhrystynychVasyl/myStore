({
  doInit: function(component, event, helper) {
    helper.getAllProducts(component, event);
  },
  handlePageClick: function(component, event, helper) {
    let page = event.getSource().get("v.label");
    component.set("v.page", page);
    helper.refreshPage(component, event, helper);
  },
  handlePageLimitClick: function(component, event, helper) {
    let page = component.get("v.page");
    let pageLimit = event.getSource().get("v.label");
    let count = component.get("v.count");
    component.set("v.pageLimit", pageLimit);
    if (count / pageLimit < page) {
      component.set("v.page", Math.round(count / pageLimit));
    }
    helper.refreshPage(component, event, helper);
  },
  handleApplicationEvent: function(component, event, helper) {
    var selectedCategoryIdList = event.getParam("selectedCategoryIdList");
    var selectedCategoryId = event.getParam("selectedCategoryId");
    component.set("v.selectedCategoryIdList", selectedCategoryIdList);
    if (selectedCategoryId === "") {
      helper.getAllProducts(component, event);
    } else {
      helper.getCountProductsByIds(component, event);
    }
    component.set("v.selectedCategoryId", selectedCategoryId);
  }
});
