import { OkPacket } from "mysql";
import ErrorModel from "../03-models/error-model";
import ProductModel from "../03-models/product-model";
import dal from "../04-dal/dal";

//פה אנו יוצרים פונקציות
async function getAllProducts(): Promise<ProductModel[]> {
    //אנו יוצרים משתנה עם שאילתת אסקיואל
    const sql = `SELECT
                    ProductID AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock,
                    CONCAT(ProductID, '.jpg') AS imageName 
                    FROM Products`;

    //יוצרים משתנה ומבצעים לתוכו בקשה לדאטה בייס עם השאילתה שיצרנו קודם לכן
    const products = await dal.execute(sql);
    //אנו מחזירים את המשתנה שמכיל בתוכו את התשובה מהבקשה שלנו 
    //שבמקרה שלנו התשובה זה כל המוצרים מהדאטה בייס
    return products;
}

//פה אנו יוצרים פונ' שמחזירה לנו רק מוצר אחד
async function getOneProduct(id: number): Promise<ProductModel> {
    const sql = `SELECT 
                    ProductID AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock,
                    CONCAT(ProductID, '.jpg') AS imageName 
                    FROM Products
                    WHERE ProductID = ${id}`;

    const products = await dal.execute(sql);

    //הדאטה בייס תמיד מחזיר לנו מערך ובשביל לקבל את האובייקט היחיד המבוקש אנו מבקשים את תא 
    //מס' אפס מהמערך שהוחזר
    //וכך המשתנה שלנו יכיל את אובייקט המוצר היחיד באופן רגיל
    //(לא בתוך מערך)
    const product = products[0];

    if(!product) throw new ErrorModel(404, `id ${id} not found`);

    return product;
}

//פונ' שמוסיפה מוצר 
//מקבלת לפרמטר את המוצר שאותו אנו רוצים להוסיף 
async function addProduct(product: ProductModel): Promise<ProductModel> {

    //בודקת בדיקות ולידציה שאותם עשינו בקובץ המודל
    const errors = product.validatePost();
    if (errors) throw new ErrorModel(400, errors);



    //יוצרים שאילתה שמכניסה את המוצר שאנו רוצים להוסיף לדאטה בייס
    const sql = `INSERT INTO Products(ProductName, UnitPrice, UnitsInStock)
                 VALUES('${product.name}',${product.price},${product.stock})`;

                //כך אנו מקבלים את כל הנתונים מהשאילתה כולל את מס האידי שהולך להתווסף
                 const info: OkPacket = await dal.execute(sql);

                 //ולאחר שמוצר זה התווסף וקיבל איידי אוטומטי אנו נזין למוצר שלנו גם את ערך האיידי
                 //אנו נציג למשתמש את ערך האיידי של המוצר שהתווסף return וכך גם ב 
                 product.id = info.insertId;

    return product;
}

//פונ' עדכון מוצר מלא
//בשליחה אנו חייבים לשלוח בבודי את כל הפרופרטיז של האובייקט חוץ מהאיידי
async function updateFullProduct(product: ProductModel): Promise<ProductModel> {

    //בדיקת ולידציה
    const errors = product.validatePut();
    if (errors) throw new ErrorModel(400, errors);

    //יצירת שאילתה
    const sql = `UPDATE Products SET
                 ProductName = '${product.name}',
                 UnitPrice = ${product.price},
                 UnitsInStock = ${product.stock}
                 WHERE ProductID = ${product.id}`;

    //זה הודעה שהמערכת מציגה כאשר מוצר לדוגמא עודכן בהצלחה והיא מכילה את כל הנתונים של המוצר OkPacket
    const info: OkPacket = await dal.execute(sql);

    if(info.affectedRows === 0) throw new ErrorModel(404, `id ${product.id} not found`);

    return product;
}


//פונקציה המעדכנת מוצר חלקי 
//לתוך הפרמטר אנחנו מכניסים את אובייקט המוצר שאותו עדכנו 
async function updatePartialProduct(product: ProductModel): Promise<ProductModel> {

    //בדיקת ולידציה
    const errors = product.validatePatch();
    if (errors) throw new ErrorModel(400, errors);

    //פה אנו מכניסים לתוך המשתנה שלנו את המוצר המלא לפני העדכון שאותו אנו רוצים לעדכן חלקית
    const dbProduct = await getOneProduct(product.id);

    //פה אנו מבצעים על המוצר המעודכן לולאת פרופ
    for(const prop in product) {
        //במידה ויש ערך לפרופרטי זאת אומרת שבמידה ושלחו בפונקציה פרופרטי מסויים מעודכן 
        //אנו נכנס לתנאי ונשתה את הפרופרטי המקורי במעודכן 
        //זאת אומרת שלא רצו לעדכן או לשנות את אותו הפרופרטי  undefined ובמידה והפרופרטי שהתקבל בפונקציה הוא 
        //ואני לא נכנס לתנאי
        if(product[prop] !== undefined) {
            dbProduct[prop] = product[prop];
        }
    }

    const updatedProduct = await updateFullProduct(new ProductModel(dbProduct));

    return updatedProduct;
}





async function updatePartPartialProduct(product: ProductModel): Promise<ProductModel> {
    //בדיקת ולידציה
    //const errors = product.validatePatch();
    //if (errors) throw new ErrorModel(400, errors);

    //פה אנו מכניסים לתוך המשתנה שלנו את המוצר המלא לפני העדכון שאותו אנו רוצים לעדכן חלקית
    const theProductId = product.id;
    for(const prop in product) {
        if(product[prop] !== undefined) {
            const sql = `UPDATE Products SET ${prop} = '${product[prop]}' WHERE ProductID = ${theProductId}`;
            const products = await dal.execute(sql);
            return products;
            
        }
    }
    const updatedProductAry = await getOneProduct(theProductId);
    const updatedProduct = updatedProductAry[0];
    return updatedProduct;
}










//פונ' שמוחקת מוצר
async function deleteProduct(id: number): Promise<void> {
    
    //שאילתת מחיקה 
    const sql = `DELETE FROM Products WHERE ProductID = ${id}`;

    //פה המשתנה שלנו יכיל את כל מידע על המוצר שנימחק 
    const info: OkPacket = await dal.execute(sql);

    if(info.affectedRows === 0) throw new ErrorModel(404, `id ${id} not found`);
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateFullProduct,
    updatePartialProduct,
    deleteProduct,
    updatePartPartialProduct
};

