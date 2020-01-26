public with sharing class CartController {
  @AuraEnabled
  public static myorder__c getNewOrder(Map<String, String> obj) {
    myorder__c newOrder = new myorder__c();
    newOrder.customer__c = obj.get('Id');
    newOrder.Name = obj.get('OrderName');
    newOrder.Additional_Information__c = Obj.get('AddInformation');
    insert newOrder;

    return newOrder;
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

