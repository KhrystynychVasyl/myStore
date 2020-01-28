public with sharing class CategoriesFilterController {
  @AuraEnabled
  public static List<myCategory__c> getAllCategories() {
    // Perform isAccessible() checking first, then
    return [SELECT Id, Name, myCategory__c FROM myCategory__c];
  }
  @AuraEnabled
  public static List<myProduct__c> getProducts() {
    // Perform isAccessible() checking first, then
    return [SELECT Id, category__r.Name, category__r.Id FROM myProduct__c];
  }

  @AuraEnabled
  public static Integer getCountProdInCategory(List<Id> Ids) {
    Integer count = 0;
    for (Id IdCategory : Ids) {
      count =
        count + [SELECT Id FROM myProduct__c WHERE category__r.Id = :IdCategory].size();
    }
    return count;
  }
}
