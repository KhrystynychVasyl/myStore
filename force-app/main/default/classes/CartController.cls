public with sharing class CartController {
  @AuraEnabled
  public static myorder__c getNewOrder(Map<String, String> obj) {
    myorder__c newOrder = new myorder__c();
    newOrder.customer__c = obj.get('Id');
    newOrder.Name = obj.get('OrderName');
    newOrder.Additional_Information__c = Obj.get('AddInformation');

    myCustomer__c updateCustomer = new myCustomer__c();
    updateCustomer.Id = obj.get('Id');
    updateCustomer.Contact_Name__c = obj.get('Contact_Name__c');
    updateCustomer.Phone__c = obj.get('Phone__c');
    updateCustomer.email__c = obj.get('email__c');

    upsert updateCustomer;
    insert newOrder;
    return newOrder;
  }
  @AuraEnabled
  public static List<myOrder_product__c> getOrderProductList(
    List<Map<String, String>> OrderProduct
  ) {
    List<myOrder_product__c> addList = new List<myOrder_product__c>();

    for (Map<String, String> orderItem : OrderProduct) {
      myOrder_product__c addItem = new myOrder_product__c();
      addItem.Name = orderItem.get('Name');
      addItem.Quantity__c = integer.valueof(orderItem.get('Quantity__c'));
      addItem.order__c = orderItem.get('order__c');
      addItem.product__c = orderItem.get('product__c');
      addList.add(addItem);
    }

    insert addList;
    return addList;
  }

  @AuraEnabled
  public static myorder__c setOrderCustomerInfo(String myObject) {
    List<CustomeObject> newList = (List<CustomeObject>) JSON.deserialize(
      myObject,
      List<CustomeObject>.class
    );

    myorder__c newOrder = newList.get(0).newOrder.getNewOrder();
    myCustomer__c updateCustomer = newList.get(0).newUser.getCustomer();
   upsert updateCustomer;
    insert newOrder;
    return newOrder;
    
  }
  public class CustomeObject {
    newUser newUser;
    newOrder newOrder;
  }
  public class newUser {
    String Id;
    String Contact_Name;
    String Phone;
    String email;
    public myCustomer__c getCustomer() {
      return new myCustomer__c(
        Id = this.Id,
        Contact_Name__c = this.Contact_Name,
        Phone__c = this.Phone,
        email__c = this.email
      );
    }
  }
  public class newOrder {
    String CustomerId;
    String OrderName;
    String AddInformation;
    public myorder__c getNewOrder() {
      return new myorder__c(
        customer__c = this.CustomerId,
        Name = this.OrderName,
        Additional_Information__c = this.AddInformation
      );
    }
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

