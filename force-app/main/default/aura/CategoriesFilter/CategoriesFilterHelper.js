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
    var categories = component.get("v.categories", categories);
    var tempCategories;
    if (Id === "" || Id === "test") {
      tempCategories = categories.filter(el => !el.myCategory__c);
    } else {
      tempCategories = categories.filter(el => el.myCategory__c === Id);
    }

    // console.log('list elem' + JSON.stringify(tempCategories));
    let tempCategoriesId = tempCategories.map(el => el.Id);

    // console.log('list id elem ' + JSON.stringify(tempCategoriesId));

    let tempCategoriesInCategories = tempCategoriesId.map(el =>
      this.helperFindCategoriesIdInCategory(component, event, helper, el)
    );

    // console.log(JSON.stringify(tempCategoriesInCategories));

    let tempCategoriesProdCount = tempCategoriesInCategories.map(el =>
      this.helperCountProdInCategory(component, event, helper, el)
    );
    // console.log(JSON.stringify(tempCategoriesProdCount));
    // console.log(JSON.stringify(tempCategories));

    let tempCategoriesObject = [];

    tempCategories.forEach((element, index) =>
      tempCategoriesObject.push({
        product: element,
        count: tempCategoriesProdCount[index]
      })
    );

    //console.log(JSON.stringify(tempCategoriesObject));

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
  helperCountProdInCategory: function(component, event, helper, Ids) {
    let count = 0;
    let productList = component.get("v.productList");
    Ids.forEach(element => {
      productList.forEach(el => {
        if (element === el.category__r.Id) {
          count += 1;
        }
      });
    });
    return count;
  }
});
