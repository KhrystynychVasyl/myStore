public with sharing class CartController {

  @AuraEnabled
  public static myorder__c addNewOrder(String myObject) {
    List<CustomeObject> newList = (List<CustomeObject>) JSON.deserialize(
      myObject,
      List<CustomeObject>.class
    );

    myorder__c newOrder = newList.get(0).newOrder.getNewOrder();
    myCustomer__c updateCustomer = newList.get(0).newUser.getCustomer();
    List<newOrder_Product> newOrder_Product = newList.get(0).newOrder_Product;

    upsert updateCustomer;
    insert newOrder;
    insertOrderProduct(newOrder_Product, newOrder);
    return newOrder;
  }

  public static void insertOrderProduct(
    List<newOrder_Product> productList,
    myorder__c order
  ) {
    List<myOrder_product__c> insertList = new List<myOrder_product__c>();
    for (newOrder_Product productIdAndQuantity : productList) {
      myOrder_product__c addToList = productIdAndQuantity.getNewOrder_Product();
      addToList.order__c = order.Id;
      insertList.add(addToList);
    }
    insert insertList;
  }

  public class CustomeObject {
    newUser newUser;
    newOrder newOrder;
    List<newOrder_Product> newOrder_Product;
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

  public class newOrder_Product {
    String ProductId;
    Integer Quantity;
    String Name;
    public myOrder_product__c getNewOrder_Product() {
      return new myOrder_product__c(
        product__c = this.ProductId,
        Quantity__c = this.Quantity,
        Name = this.Name
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

