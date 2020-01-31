public with sharing class LogInController {
  @AuraEnabled
  public static myCustomer__c shopLogIn(String newCustomer) {
    myCustomer__c newCustomerList = (myCustomer__c) JSON.deserialize(
      newCustomer,
      myCustomer__c.class
    );

    myCustomer__c customerLogin = [
      SELECT Id, Name, Password__c
      FROM myCustomer__c
      WHERE
        Name = :newCustomerList.Name
    ];

    if (customerLogin.Password__c == newCustomerList.Password__c) {
      return customerLogin;
    } else {
      throw new AuraHandledException('Invalid information');
    }
  }
  @AuraEnabled
  public static myCustomer__c shopSingUp(String newCustomer) {
    myCustomer__c newCustomerSingUp = (myCustomer__c) JSON.deserialize(
      newCustomer,
      myCustomer__c.class
    );

    List<myCustomer__c> customerCheck = [
      SELECT Id, Password__c
      FROM myCustomer__c
      WHERE
        Name = :newCustomerSingUp.Name
    ];

    if (customerCheck.size() > 0 && customerCheck.get(0).Password__c == newCustomerSingUp.Password__c) {
      throw new AuraHandledException('Name already exist');
    } else {
      insert newCustomerSingUp;
      return newCustomerSingUp;
    }
  }
}
