public with sharing class ProductController {
  @AuraEnabled
  public static List<myProduct__c> getProducts() {
    List<myProduct__c> result = [
      SELECT
        Id,
        Name,
        category__r.Name,
        price__c,
        stock__c,
        Description__c,
        Image__c,
        ImageURL__c
      FROM myProduct__c
      LIMIT 12
    ];
    return result;
  }

  @AuraEnabled
  public static String getProductsByIds(String SentObject) {
    SentObject custObject = (SentObject) JSON.deserialize(
      SentObject,
      SentObject.class
    );

    Integer page = custObject.page;
    Integer pageLimit = custObject.pageLimit;
    Integer limitSet = (page - 1) * pageLimit;
    String[] selectedCategoryIdList = custObject.selectedCategoryIdList;
    // Perform isAccessible() checking first, then

    // return Database.query(
    //   'SELECT ID,Name,category__r.Name,price__c,stock__c,Description__c,imgUrl__c FROM' +
    //   'myProduct__c WHERE category__r.id = :selectedCategoryIdList Limit ' +
    //   this.pageLimit +' OFFSET ' + this.pageLimit * (page - 1)
    // );

    list<myProduct__c> count = [
      SELECT Id
      FROM myProduct__c
      WHERE category__r.id = :selectedCategoryIdList
    ];

    List<myProduct__c> result = [
      SELECT
        Id,
        Name,
        category__r.Name,
        price__c,
        stock__c,
        Description__c,
        Image__c,
        ImageURL__c
      FROM myProduct__c
      WHERE category__r.id = :selectedCategoryIdList
      LIMIT :pageLimit
      OFFSET :limitSet
    ];

    // for (myProduct__c prod : result) {
    //   prod.ImageURL__c = prod.Image__c.subStringBetween(
    //       prod.Image__c.contains('src') ? 'src="' : 'href="',
    //       '"'
    //     )
    //     .replaceAll('&amp;', '&');
    // }

    SendResult sendResult = new SendResult();
    sendResult.pagesQuantity = count.size();
    sendResult.productList = result;

    String sendResultString = JSON.serialize(sendResult);

    return sendResultString;
  }
  public class SentObject {
    Integer page;
    Integer pageLimit;
    List<String> selectedCategoryIdList;
  }

  public class SendResult {
    Integer pagesQuantity;
    List<myProduct__c> productList;
  }
}
