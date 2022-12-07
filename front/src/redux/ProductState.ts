import ProductModel from "../Models/ProductModel";

export class ProductsState {
    public Product: ProductModel[] = [];
}

export enum ProductActionType {
    FetchProduct = "FetchProduct",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
    DeleteProduct = "DeleteProduct",
    Follow = 'Follow',
    Un_follow = 'Un_follow',
    resetProductState = 'resetProductState'
}

export interface ProductAction {
    type: ProductActionType;
    payload: any;
}

export function fetchProductAction(Product: ProductModel[]): ProductAction {
    return { type: ProductActionType.FetchProduct, payload: Product };
}
export function resetVacotionAction(Product:[]): ProductAction {
    return { type: ProductActionType.resetProductState, payload: Product };
}
export function addProductAction(Product: ProductModel): ProductAction {
    return { type: ProductActionType.AddProduct, payload: Product };
}
export function updateProductAction(Product: ProductModel): ProductAction {
    return { type: ProductActionType.UpdateProduct, payload: Product };
}
export function deleteProductAction(id: number): ProductAction {
    return { type: ProductActionType.DeleteProduct, payload: id };
}
export const followProductAction = (id: number): ProductAction => {
    return {
      type: ProductActionType.Follow,
      payload: id,
    };
  };
  export const unFollowProductAction = (id: number): ProductAction => {
    return {
      type: ProductActionType.Un_follow,
      payload: id,
    };
  };

// נישלחת ישירות לפרמטר השני הפונ' הרדיוסר dispeach האובייקט המגיע מהפקודה 
export function ProductReducer(currentState = new ProductsState(), action: ProductAction): ProductsState {

    const newState = { ...currentState };

    switch (action.type) {

        case ProductActionType.FetchProduct:
            newState.Product = action.payload; 
            break;

        case ProductActionType.resetProductState:
                newState.Product = action.payload; 
                break;
        case ProductActionType.AddProduct:
            newState.Product.push(action.payload); 
            break;

        case ProductActionType.UpdateProduct:
            const indexToUpdate = newState.Product.findIndex(p => p.productId === action.payload.productId); // Here the payload is a single object to update.
            if (indexToUpdate >= 0) {
                newState.Product[indexToUpdate] = action.payload;
            }
            break;

        case ProductActionType.DeleteProduct:
            const indexToDelete = newState.Product.findIndex(p => p.productId === action.payload); // Here the payload is the id to delete.
            if (indexToDelete >= 0) {
                newState.Product.splice(indexToDelete, 1);
            }
            break;

            case ProductActionType.Follow:
                // אנו ניצור משתנה 
                const indexToFollow = newState.Product.findIndex(
                  (product) => product.productId === action.payload
                );
                if (indexToFollow >= 0) {
                  newState.Product[indexToFollow].isFollowing = true;
                }
                break;
              case ProductActionType.Un_follow:
                const indexToUnFollow = newState.Product.findIndex(
                  (product) => product.productId === action.payload
                );
                if (indexToUnFollow >= 0) {
                  newState.Product[indexToUnFollow].isFollowing = null;
                }
                break;
    }

    return newState;
}
