declare module "@salesforce/apex/CategoriesFilterController.getAllCategories" {
  export default function getAllCategories(): Promise<any>;
}
declare module "@salesforce/apex/CategoriesFilterController.getProducts" {
  export default function getProducts(): Promise<any>;
}
declare module "@salesforce/apex/CategoriesFilterController.getCountProdInCategory" {
  export default function getCountProdInCategory(param: {Ids: any}): Promise<any>;
}
