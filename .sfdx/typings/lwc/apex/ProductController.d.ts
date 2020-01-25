declare module "@salesforce/apex/ProductController.getProducts" {
  export default function getProducts(): Promise<any>;
}
declare module "@salesforce/apex/ProductController.getProductsByIds" {
  export default function getProductsByIds(param: {selectedCategoryIdList: any}): Promise<any>;
}
