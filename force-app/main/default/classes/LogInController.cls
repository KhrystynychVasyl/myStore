public with sharing class LogInController {
  @AuraEnabled
  public static myCustomer__c shopLogIn(myCustomer__c newCustomer) {
    myCustomer__c customerLogin = [
      SELECT Id, Name,Password__c
      FROM myCustomer__c
      WHERE Name = :newCustomer.name AND Password__c = :newCustomer.Password__c
    ];
    return customerLogin;
  }
  @AuraEnabled
  public static myCustomer__c shopSingUp(myCustomer__c newCustomer) {
      
    myCustomer__c test = [
      SELECT Id, Name
      FROM myCustomer__c
      WHERE Name = :newCustomer.name AND Password__c = :newCustomer.Password__c
    ];

    if (test != null) {
      throw new AuraHandledException('NSFW name detected.');
    } else {
      myCustomer__c newcust = new myCustomer__c(
        Name = newCustomer.name,
        Password__c = newCustomer.Password__c
      );

      insert newCust;
      return newCust;
    }
  }
}
