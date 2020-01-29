public with sharing class ProductController {
  @AuraEnabled
  public static List<myProduct__c> getProducts() {
    // Perform isAccessible() checking first, then
    return [
      SELECT
        Id,
        Name,
        category__r.Name,
        price__c,
        stock__c,
        Description__c,
        imgUrl__c
      FROM myProduct__c
      LIMIT 12
    ];
  }

  // public static myorder__c addNewOrder(String myObject) {
  // List<CustomeObject> newList = (List<CustomeObject>) JSON.deserialize(
  //   myObject,
  //   List<CustomeObject>.class
  // );

  @AuraEnabled
  public static List<myProduct__c> getProductsByIds(String SentObject) {
    SentObject custObject = (SentObject) JSON.deserialize(
      SentObject,
      SentObject.class
    );

    Integer page = custObject.page;
    Integer pageLimit = custObject.pageLimit;
    Integer limitSet = (page - 1) * pageLimit;
    String[] selectedCategoryIdList = custObject.selectedCategoryIdList;
    // Perform isAccessible() checking first, then

    // return Database.query(
    //   'SELECT ID,Name,category__r.Name,price__c,stock__c,Description__c,imgUrl__c FROM' +
    //   'myProduct__c WHERE category__r.id = :selectedCategoryIdList Limit ' +
    //   this.pageLimit +' OFFSET ' + this.pageLimit * (page - 1)
    // );

    return [
      SELECT
        ID,
        Name,
        category__r.Name,
        price__c,
        stock__c,
        Description__c,
        imgUrl__c
      FROM myProduct__c
      WHERE category__r.id = :selectedCategoryIdList
      LIMIT :pageLimit
      OFFSET :limitSet
    ];
  }
  public class SentObject {
    Integer page;
    Integer pageLimit;
    List<String> selectedCategoryIdList;
  }
}
