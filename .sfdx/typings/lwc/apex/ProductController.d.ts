declare module "@salesforce/apex/ProductController.getProducts" {
  export default function getProducts(param: {page: any, pageLimit: any}): Promise<any>;
}
declare module "@salesforce/apex/ProductController.getCountProductsByIds" {
  export default function getCountProductsByIds(param: {selectedCategoryIdList: any}): Promise<any>;
}
declare module "@salesforce/apex/ProductController.getProductsByIds" {
  export default function getProductsByIds(param: {page: any, pageLimit: any, selectedCategoryIdList: any}): Promise<any>;
}
