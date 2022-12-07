import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class ProductsModel {
    map(arg0: (prop: any) => void) {
        throw new Error("Method not implemented.");
    }
    public productId: number;
    public Name : string;
    public Description : string ="";
    public CreationDate: string;
    public Price : number;
    public imageName: string = ""; // The image name on the backend ("1.jpg")
    public image: UploadedFile;
    public isFollowing: boolean = false;
    public followersCount: number = 0;


    public constructor(product: ProductsModel) {
        this.productId = product.productId;
        this.Name = product.Name;
        this.Description = product.Description;
        this.CreationDate = product.CreationDate;
        this.Price = product.Price;
        this.imageName = product.imageName;
        this.image = product.image;
        this.isFollowing = product.isFollowing;
        this.followersCount = product.followersCount;


    }

    //סדרת ולידציות למתודות שונות
    private static postSchema = Joi.object({
        productId: Joi.forbidden(),
        Name: Joi.required(),
        Description: Joi.string().required().min(0).max(200),
        CreationDate: Joi.string().required().min(0).max(10000),
        Price: Joi.number().required().integer().min(1),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        followersCount: Joi.number().optional(),
        isFollowing: Joi.boolean().optional()

    });

    private static putSchema = Joi.object({
        productId: Joi.number().required().integer().min(1),

        Name: Joi.required(),
        Description: Joi.string().required().min(0).max(200),
        CreationDate: Joi.string().required().min(0).max(10000),
        Price: Joi.number().required().integer().min(1),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        followersCount: Joi.number().optional(),
        isFollowing: Joi.boolean().optional()
    });

    private static patchSchema = Joi.object({
        productId: Joi.number().required().integer().min(1),
        Name: Joi.required(),
        Description: Joi.string().optional().min(0).max(200),
        CreationDate: Joi.string().optional().min(0).max(10000),
        Price: Joi.number().optional().integer().min(1),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        followersCount: Joi.number().optional(),
        isFollowing: Joi.boolean().optional()
    });

    public validatePost(): string {
        const result = ProductsModel.postSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = ProductsModel.putSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = ProductsModel.patchSchema.validate(this);
        return result.error?.message;
    }

}

export default ProductsModel;












