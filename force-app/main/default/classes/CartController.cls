public with sharing class CartController {
  @AuraEnabled
  public static String getNewOrder(
    String Id,
    String Name,
    String AddInformation
  ) {
    myorder__c newOrder = new myorder__c();
    newOrder.Name = Name;
    newOrder.customer__c = Id;
    newOrder.Additional_Information__c = AddInformation;
    insert newOrder;
    
    return 'USER ID :';

    //         System.debug(v);

    //     myCustomer__c test = [SELECT Id FROM myCustomer__c WHERE Id = :v.Id];
    //     //getNewOrder(Map<String, String> v)

    //     myorder__c newOrder = new myorder__c(
    //       Name = 'ads',
    //       Additional_Information__c = 'adsasd'
    //     );
    // newOrder.customer__c = test.Id;
    //     insert newOrder;

    // myorder__c newOrder = new myorder__c(
    //   Name = v.get('OrderName'),
    //   //   customer__c = v.get('Id'),
    //   customer__c = 'a003X0000132i8zQAA',
    //   Additional_Information__c = v.get('AddInformation')
    // );

    // insert newOrder;

    // newOrder.customer__c = v.get('Id');
    // newOrder.Name = v.get('OrderName');
    // newOrder.;

    //insert newOrder;
    // myorder__c newOrd = new myorder__c();
    // myCustomer__c newCustomer = [SELECT Name,Id FROM myCustomer__c WHERE Id=:Id];
    // newOrd.Name = newCustomer.Name;
    // newOrd.customer__c = newCustomer.Id;
    // insert newOrd;
    // return newOrd;
    // v.get('Id');

    //newOrder.customer__c +
    //'; Order Name :' +
    //newOrder.Name +
    //'; Order AddInformation :' +
    //newOrder.Additional_Information__c;
  }
}

/*


    putcustomclassc : function(component, event, helper) {
        helper.putdatatype(component, "c.pcustomclass", {
            s: 'my string',
            i: 10,
            l: ['list value 1','list value 2'],
            m: {k1: 'map value'},
            os: {b: true}
        });
    }

// actionParamTypesHelper.js
({
    putdatatype : function(component, actionName, val) {
        var action = component.get(actionName);
        action.setParams({ v : val });
        action.setCallback(this, function(response) {
            console.log(response.getReturnValue());
        });
        $A.enqueueAction(action);
    }   
})

    @AuraEnabled
    public static MyCustomApexClass pcustomclass(MyCustomApexClass v){
        System.debug(v); 
        return v;
    }  


    public class MyCustomApexClass {
    @AuraEnabled
    public String s {get; set;}
    @AuraEnabled
    public Integer i {get; set;}
    @AuraEnabled
    public List<String> l {get; set;}
    @AuraEnabled
    public Map <String, String> m {get; set;}
    @AuraEnabled
    public MyOtherCustomApexClass os {get; set;}
}

public class MyOtherCustomApexClass {
    @AuraEnabled
    public Boolean b {get; set;}
}

*/

