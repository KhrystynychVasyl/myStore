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
    ];
  }
  @AuraEnabled
  public static List<myProduct__c> getProductsByIds(
    String[] selectedCategoryIdList
  ) {
    // Perform isAccessible() checking first, then
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
    ];
  }
}
