public with sharing class LogInController {
  @AuraEnabled
  public static myCustomer__c shopLogIn(String newCustomer) {
    List<myCustomer__c> newCustomerList = (List<myCustomer__c>) JSON.deserialize(
      newCustomer,
      List<myCustomer__c>.class
    );

    myCustomer__c customerLogin = [
      SELECT Id, Name, Password__c
      FROM myCustomer__c
      WHERE
        Name = :newCustomerList.get(0).name
        AND Password__c = :newCustomerList.get(0).Password__c
    ];
    return customerLogin;
  }
  @AuraEnabled
  public static myCustomer__c shopSingUp(String newCustomer) {
    List<myCustomer__c> newCustomerSingUp = (List<myCustomer__c>) JSON.deserialize(
      newCustomer,
      List<myCustomer__c>.class
    );

    List<myCustomer__c> customerCheck = [
      SELECT Id, Name
      FROM myCustomer__c
      WHERE
        Name = :newCustomerSingUp.get(0).name
        AND Password__c = :newCustomerSingUp.get(0).Password__c
    ];

    if (customerCheck.size() > 0) {
      throw new AuraHandledException('NSFW name detected.');
    } else {
      insert newCustomerSingUp.get(0);
      return newCustomerSingUp.get(0);
    }
  }
}
