import { OkPacket } from "mysql";
import ErrorModel from "../03-models/error-model";
import dal from "../04-dal/dal";
import { v4 as uuid } from "uuid";
import ProductsModel from "../03-models/products-model";

async function getAllProducts(userId: string): Promise<ProductsModel[]> {

  const sql = `SELECT DISTINCT
    V.*,
   EXISTS(SELECT * FROM followers WHERE productId = F.productId AND userId = ?) AS isFollowing,
   COUNT(F.userId) AS followersCount
   FROM products as V LEFT JOIN followers as F
   ON V.productId = F.productId
   GROUP BY productId
   ORDER BY isFollowing DESC`;

  const products = await dal.execute(sql, [userId]);

  return products;
}

async function getOneProduct(id: number): Promise<ProductsModel> {
  const sql = `SELECT
  productId,
  Name,
  Description,
  Price,
  CreationDate,
    CONCAT(productId, '.jpg') AS imageName 
     FROM products
                    WHERE productId = ${id}`;

  const allProducts = await dal.execute(sql);

  const Products = allProducts[0];

  if (!Products) throw new ErrorModel(404, `id ${id} not found`);

  return Products;
}


async function addProducts(Products: ProductsModel): Promise<ProductsModel> {

    Products.image;
  const errors = Products.validatePost();
  if (errors) {
    throw new ErrorModel(400, errors);
  }
  if (Products.image) {
    const extension = Products.image.name.substring(
        Products.image.name.lastIndexOf(".")
    );
    Products.imageName = uuid() + extension;

    await Products.image.mv(
      "./src/assets/images/products/" + Products.imageName
    );
    delete Products.image;
  }

  let sql = ` INSERT INTO products 
  ( Name, 
    Description, 
    Price,
    CreationDate,
    imageName)
  VALUES(?,?,?,?,?)`;
  let parameters = [
    Products.Name,
    Products.Description,
    Products.Price,
    Products.CreationDate,
    Products.imageName,
  ];

  const info: OkPacket = await dal.execute(sql, parameters);
  Products.productId = info.insertId;

  return Products;
}

//פונ' עדכון מוצר מלא
async function updateFullProducts(
    Products: ProductsModel
): Promise<ProductsModel> {
  //בדיקת ולידציה
  const errors = Products.validatePut();
  if (errors) throw new ErrorModel(400, errors);


  if (Products.image) {
    console.log("PUT. Have image! logic");
    const extension = Products.image.name.substring(
        Products.image.name.lastIndexOf(".")
    );
    Products.imageName = uuid() + extension;
    await Products.image.mv(
      "./src/assets/images/products/" + Products.imageName
    );
    delete Products.image;
  }



  let sql = ` UPDATE products 
                SET
                Name = ?,
                Description = ?,
                Price = ?,
                CreationDate = ?,
                imageName = ?
                WHERE productId = ?`;
  let parameters = [
    Products.Name,
    Products.Description,
    Products.Price,
    Products.CreationDate,
    Products.imageName,
    Products.productId,
  ];

  //זה הודעה שהמערכת מציגה כאשר מוצר לדוגמא עודכן בהצלחה והיא מכילה את כל הנתונים של המוצר OkPacket
  const info: OkPacket = await dal.execute(sql, parameters);

  if (info.affectedRows === 0)
    throw new ErrorModel(404, `id ${Products.productId} not found`);

  return Products;
}

async function updatePartialProducts(
    Products: ProductsModel
): Promise<ProductsModel> {
  console.log("1" + Products);

  //בדיקת ולידציה
  const errors = Products.validatePatch();
  if (errors) throw new ErrorModel(400, errors);

  //פה אנו מכניסים לתוך המשתנה שלנו את המוצר המלא לפני העדכון שאותו אנו רוצים לעדכן חלקית
  const dbProduct = await getOneProduct(Products.productId);


  //פה אנו מבצעים על המוצר המעודכן לולאת פרופ
  for (const prop in Products) {
    //במידה ויש ערך לפרופרטי זאת אומרת שבמידה ושלחו בפונקציה פרופרטי מסויים מעודכן
    //אנו נכנס לתנאי ונשתה את הפרופרטי המקורי במעודכן
    //זאת אומרת שלא רצו לעדכן או לשנות את אותו הפרופרטי  undefined ובמידה והפרופרטי שהתקבל בפונקציה הוא
    //ואני לא נכנס לתנאי
    if (Products[prop] !== undefined) {
        dbProduct[prop] = Products[prop];
    }
  }



  const updatedProduct = await updateFullProducts(
    new ProductsModel(dbProduct)
  );

  return updatedProduct;
}

async function deleteProduct(id: number): Promise<void> {
  const sql = `DELETE FROM products WHERE productId = ${id}`;
  const info: OkPacket = await dal.execute(sql);
  if (info.affectedRows === 0) throw new ErrorModel(404, `id ${id} not found`);
}

export default {
    getAllProducts,
  deleteProduct,
  updatePartialProducts,
  updateFullProducts,
  addProducts,
  getOneProduct,
};
