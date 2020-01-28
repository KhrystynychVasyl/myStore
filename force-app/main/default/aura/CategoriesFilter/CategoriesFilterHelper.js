({
  helperAddFirstCategory: function(component, event, helper, count) {
    var categoriesTree = [
      {
        Id: "",
        Name: "All Categories",
        count: count
      }
    ];
    component.set("v.categoriesTree", categoriesTree);
  },
  helperFindInnerCategories: function(component, event, helper, Id) {
    let arr = [];
    var categories = component.get("v.categories", categories);
    var tempCategories;
    if (Id === "" || Id === "test") {
      tempCategories = categories.filter(el => !el.myCategory__c);
    } else {
      tempCategories = categories.filter(el => el.myCategory__c === Id);
    }
    let tempCategoriesId = tempCategories.map(el => {
      arr.push(el.Id);
      return el.Id;
    });
    let tempCategoriesInCategories = tempCategoriesId.map(el =>
      this.helperFindCategoriesIdInCategory(component, event, helper, el)
    );
    let tempCategoriesProdCount = tempCategoriesInCategories.map((el, index) =>
      this.helperCountProdInCategory(component, event, helper, [el, arr[index], index])
    );
    let tempCategoriesObject = [];
    tempCategories.forEach((element, index) =>
      tempCategoriesObject.push({
        product: element,
        count: tempCategoriesProdCount[index]
      })
    );
    component.set("v.tempCategories", tempCategoriesObject);
  },
  helperFindCategoriesIdInCategory: function(component, event, helper, Id) {
    let arr = component.get("v.categories");
    let selectedCategoryIdList = [],
      stepArray = [],
      tempArray = [];
    if (Id === "") {
      selectedCategoryIdList = arr.map(el => el.Id);
    } else {
      selectedCategoryIdList.push(Id);
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
        selectedCategoryIdList.push(...stepArray);
      }
    }
    return selectedCategoryIdList;
  },
  helperCountProdInCategory: function(component, event, helper, addInput) {
    let Ids = addInput[0];
    let Id = addInput[1];
    let index = addInput[2]
    let count = 0;


    
    // let productList = component.get("v.productList");
    // Ids.forEach(element => {
    //   productList.forEach(el => {
    //     if (element === el.category__r.Id) {
    //       count += 1;
    //     }
    //   });
    // });

    let action = component.get("c.getCountProdInCategory");
    action.setParams({
      Ids: Ids
    });
    action.setCallback(this, function(response) {
      let state = response.getState();
      if (state === "SUCCESS") {
        let countFromServer = response.getReturnValue();
        if (Id === "") {
          let categoriesTree = component.get("v.categoriesTree");
          categoriesTree[0].count = countFromServer;
          component.set("v.categoriesTree", categoriesTree);
        } else {
          let tempCategories = component.get("v.tempCategories");
          tempCategories[index].count = countFromServer;
          component.set("v.tempCategories", tempCategories);
        }
      }
    });
    $A.enqueueAction(action);
    return count;
  },
  helperOnInit: function(component, event, helper) {
    let Id = "";
    let Ids = this.helperFindCategoriesIdInCategory(
      component,
      event,
      helper,
      Id
    );
    let count = this.helperCountProdInCategory(component, event, helper, [
      Ids,
      Id
    ]);
    this.helperAddFirstCategory(component, event, helper, count);
    this.helperFindInnerCategories(component, event, helper, Id);
  }
});
