public with sharing class CategoriesFilterController {
  @AuraEnabled
  public static List<myCategory__c> getAllCategories() {
    // Perform isAccessible() checking first, then
    return [
      SELECT Id, Name, myCategory__c, myCategory__r.Id, myCategory__r.Name
      FROM myCategory__c
    ];
  }
  @AuraEnabled
  public static List<myProduct__c> getProducts() {
    // Perform isAccessible() checking first, then
    return [SELECT Id, Name, category__r.Name,category__r.Id FROM myProduct__c];
  }
}
