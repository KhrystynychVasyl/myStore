({
  helperAddFirstCategory: function(component) {
    var categoriesTree = [
      {
        Id: "",
        Name: "All Categories"
      }
    ];
    component.set("v.categoriesTree", categoriesTree);
  },
  helperFindInnerCategories: function(component, event, helper, Id) {
    var categories = component.get("v.categories", categories);
    var tempCategories;
    if (Id === "" || Id === "test") {
      tempCategories = categories.filter(el => !el.myCategory__c);
    } else {
      tempCategories = categories.filter(el => el.myCategory__c === Id);
    }
    console.log(JSON.stringify(categories));
    component.set("v.tempCategories", tempCategories);
  },
  helperFindProductsById: function(component, event, helper, Id) {
    let arr = component.get("v.categories");
    let result = [],
      stepArray = [],
      tempArray = [];
    if (Id === "") {
      result = arr.map(el => el.Id);
    } else {
      result.push(Id);
      tempArray = arr
        .filter(element => element.myCategory__c === Id)
        .map(element => element.Id);
      while (tempArray.length > 0) {
        stepArray = tempArray;
        tempArray = [];
        stepArray.forEach(el => {
          let someArr = arr
            .filter(element => element.myCategory__c === el)
            .map(element => element.Id);
          tempArray.push(...someArr);
        });
        result.push(...stepArray);
      }
    }
    console.log(JSON.stringify(result));
    //return result;
  }
});
