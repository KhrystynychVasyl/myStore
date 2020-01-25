public with sharing class CartController {
    @AuraEnabled
    public static myCustomer__c getNewCustomer(myCustomer__c newCustomer) {
        myCustomer__c newcust = new myCustomer__c(Name = newCustomer.name, 
                                    password__c = newCustomer.password__c);
        insert newCust;
		return  newCust;        
    }

    @AuraEnabled
    public static myorder__c getNewOrder(String Id) {

        myorder__c newOrd = new myorder__c();
        myCustomer__c newCustomer = [SELECT Name,Id FROM myCustomer__c WHERE Id=:Id];
        newOrd.Name = newCustomer.Name;
        newOrd.customer__c = newCustomer.Id;
        insert newOrd;
        return newOrd;
    }

}