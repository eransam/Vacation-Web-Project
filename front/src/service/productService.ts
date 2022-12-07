import axios from "axios";
import ProductModel from "../Models/ProductModel";
import {
  addProductAction,
  deleteProductAction,
  fetchProductAction,
  followProductAction,
  unFollowProductAction,
  updateProductAction,
} from "../redux/ProductState";
import store from "../redux/Store";
import config from "../utils/Config";
import SocketService from "./SocketService";

class productService {
  public async fetchProduct(socketSend: boolean): Promise<ProductModel[]> {
    console.log("eran");

    if (
      store.getState().productState.Product.length === 0 ||
      socketSend === true
    ) {
      const response = await axios.get<ProductModel[]>(config.vacationsUrl);
      const Product = response.data;
      store.dispatch(fetchProductAction(Product));
    }
    return store.getState().productState.Product;
  }

  public async resetProductState(): Promise<ProductModel[]> {
    console.log("eran");

    const Product: any = [];
    store.dispatch(fetchProductAction(Product));

    return store.getState().productState.Product;
  }

  public async getOneProduct(productId: number): Promise<ProductModel> {
    let product = store
      .getState()
      .productState.Product.find((p) => p.productId === productId);
    if (!product) {
      const response = await axios.get<ProductModel>(
        config.vacationsUrl + productId
      );
      product = response.data;
    }
    return product;
  }

  public async deleteOneProduct(productId: number): Promise<void> {
    await axios.delete(config.vacationsUrl + productId);
    store.dispatch(deleteProductAction(productId));
    SocketService.vacationsChange();
    return;
  }

  public async addNewProduct(product: ProductModel): Promise<ProductModel> {

    let formData = new FormData();
    formData.append("Name", product.Name);
    formData.append("Description", product.Description);
    formData.append("CreationDate", product.CreationDate.toString());
    formData.append("Price", product.Price.toString());
    formData.append("image", product.image.item(0));

    const response = await axios.post<ProductModel>(
      config.vacationsUrl,
      formData
    );
    const addedpro = response.data;

    // Add to redux global state:
    store.dispatch(addProductAction(addedpro));
    SocketService.vacationsChange();

    return addedpro;
  }

  public async updateProduct(product: ProductModel): Promise<ProductModel> {

    // Convert out product to FormData:
    const formData = new FormData();
    formData.append("productId", product.productId.toString());
    formData.append("Name", product.Name);
    formData.append("Description", product.Description);
    formData.append("CreationDate", product.CreationDate.toString());
    formData.append("Price", product.Price.toString());
    formData.append("image", product.image.item(0));


    // Put the new product to the server:
    const response = await axios.put<ProductModel>(
      config.vacationsUrl + product.productId,
      formData
    );

    const updatedProduct = response.data;

    // Add to redux global state:
    store.dispatch(updateProductAction(updatedProduct));
    SocketService.vacationsChange();

    return updatedProduct;
  }


  public async followProduct(productId: number): Promise<void> {
    console.log(
      "config.followsUrl + productId: ",
      config.followsUrl + productId
    );

    await axios.post(config.followsUrl + productId);

    //כך המידע הנ''ל ישמר גם בסטור
    store.dispatch(followProductAction(productId));
  }

  public async unFollowProduct(productId: number): Promise<void> {
    await axios.delete(config.followsUrl + productId);

    store.dispatch(unFollowProductAction(productId));
  }
}

const productsService = new productService();

export default productsService;
