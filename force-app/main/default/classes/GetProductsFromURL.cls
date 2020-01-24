public with sharing class GetProductsFromURL {


    private final String url;

    public GetProductsFromURL(String url) {
        this.url = url;
    }

    public GetProductsFromURL() {
        this.url = 'https://lviv-courses-1-developer-edition.eu32.force.com/services/apexrest/products';
    }

    private class TempProduct{
        Integer price;
        String name;
        public myProducy__c someMethod() {
            return new myProducy__c(Name = this.name, price__c = this.price);
        }
    }

    private List<TempProduct> getTempProductList(){

        Http http = new Http();
        HttpRequest request = new HttpRequest();

        request.setEndpoint(this.url);

        request.setMethod('GET');

        HttpResponse response = http.send(request);
        
        List<TempProduct> tempProductList = new List<TempProduct>();
        
        if (response.getStatusCode() == 200) {
            //String s = (String) JSON.deserializeUntyped(response.getBody());
            String s = (String) JSON.deserializeUntyped(response.getBody());
           // List<myProducy__c> productList = (List<myProducy__c>) JSON.deserialize(s ,List<myProducy__c>.class);
            tempProductList = (List<TempProduct>) JSON.deserialize(s ,List<TempProduct>.class);
            
        }
        return tempProductList;
    }

    public void downloadProducts() {
        List<myProducy__c> productList = new List<myProducy__c>();
        for (TempProduct tempProd: this.getTempProductList()) {
            productList.add(tempProd.someMethod()) ;
        }
        //delete [SELECT id FROM myProducy__c];
        insert productList;
    }
}