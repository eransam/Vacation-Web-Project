import express, { NextFunction, Request, Response } from "express";
import VerifyLoggedInn from "../02-middleware/verify-logged-in";
import productsLogic from "../05-logic/product-logic";
import verifyAdminn from "../02-middleware/verify-admin2";
import path from "path";
import cyber from "../01-utils/cyber";
import ProductModel from "../03-models/products-model";

const router = express.Router();

//ראוט אשר מחזיר את כל המוצרים
router.get(
  "/products",
  VerifyLoggedInn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let authorizationString = request.headers.authorization;

      const userId: any = cyber.getUserFromToken(authorizationString).userId;

      const products = await productsLogic.getAllProducts(userId);
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

//ראוט אשר מקבל איידי ומחזיר את אותו מוצר עם האיידי שהוזן
router.get(
  "/products/:id",
  VerifyLoggedInn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const product = await productsLogic.getOneProduct(id);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
);

//ראוט אשר מוסיף מוצר חדש
router.post(
  "/products/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {


      request.body.image = request.files?.image;

      const product = new ProductModel(request.body);
      const addedProduct = await productsLogic.addProducts(product);
      response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

//ראוט אשר מעדכן מוצר קיים במלואו
router.put(
  "/products/:id",
//   verifyAdminn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      request.body.id = id;
      request.body.image = request.files?.image;

      const product = new ProductModel(request.body);
      const updatedProduct = await productsLogic.updateFullProducts(product);
      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

//ראוט אשר מעדכן באופן חלקי מוצר קיים
router.patch(
  "/products/:id",
//   verifyAdminn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      request.body.productId = id;

      const product = new ProductModel(request.body);
      const updatedProduct = await productsLogic.updateFullProducts(product);
      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

//ראוט אשר מוחק מוצר
router.delete(
  "/products/:id",
//   verifyAdminn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await productsLogic.deleteProduct(id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);


//ראוט אשר מושך תמונה לפי שם התמונה
router.get(
  "/products/images/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = path.join(
        __dirname,
        "..",
        "assets",
        "images",
        "products",
        imageName
      );
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
