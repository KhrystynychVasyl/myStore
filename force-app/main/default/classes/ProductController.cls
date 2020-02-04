public with sharing class ProductController {
  @AuraEnabled
  public static List<myProduct__c> getProducts(
    Integer page,
    Integer pageLimit
  ) {
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
      LIMIT :pageLimit
      OFFSET :(page - 1) * pageLimit
    ];
    return result;
  }
  @AuraEnabled
  public static Integer getCountProductsByIds(List<Id> selectedCategoryIdList) {
    return [
      SELECT COUNT()
      FROM myProduct__c
      WHERE category__r.id = :selectedCategoryIdList
    ];
  }

  @AuraEnabled
  public static List<myProduct__c> getProductsByIds(
    Integer page,
    Integer pageLimit,
    List<Id> selectedCategoryIdList
  ) {
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
      OFFSET :(page - 1) * pageLimit
    ];

    for (myProduct__c product : result) {
      product.ImageURL__c = getImageURL(product);
      //product.ImageURL__c = 'https://khrystynychvasyl-dev-ed--c.documentforce.com/servlet/rtaImage?eid=a023X00001p6XZH&feoid=00N3X00000J9HW6&refid=0EM3X000002Y4gC';
      //                       https://khrystynychvasyl-dev-ed--c.documentforce.com/servlet/rtaImage?eid=a023X00001p6XZC;feoid=00N3X00000J9HW6;refid=0EM3X000002Y4fd
    }

    return result;
  }

  public static String getImageURL(myProduct__c product) {
    String source = (String) JSON.deserializeUntyped(
      JSON.serialize(product.Image__c)
    );

    // String test2 = source.substringBetween('src="', '"').unescapeHtml4();
    // String test = source.substringBetween('img');
        String base = 'https://khrystynychvasyl-dev-ed--c.documentforce.com';
    //     // return (base + product.Image__c.substringBetween('OnlineShop', '" alt')).unescapeHtml4();
    //     // return base + test + 'trsdfsf  ' + test2;
    //     return test2;

    return base;
  }
}
