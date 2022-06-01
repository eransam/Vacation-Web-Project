import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    map(arg0: (prop: any) => void) {
        throw new Error("Method not implemented.");
    }
    public vacationId: number;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;
    public isFollowing: boolean = false;
    public followersCount: number = 0;


    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.isFollowing = vacation.isFollowing;
        this.followersCount = vacation.followersCount;


    }

    //סדרת ולידציות למתודות שונות
    private static postSchema = Joi.object({
        vacationId: Joi.forbidden(),
        description: Joi.string().required().min(2).max(100),
        startDate: Joi.string().required().min(0).max(1000),
        endDate: Joi.string().required().min(0).max(10000),
        price: Joi.number().required().integer().min(0).max(10000),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        followersCount: Joi.number().optional(),
        isFollowing: Joi.boolean().optional()

    });

    private static putSchema = Joi.object({
        vacationId: Joi.number().required().integer().min(1),
        description: Joi.string().required().min(2).max(100),
        startDate: Joi.string().required().min(0).max(1000),
        endDate: Joi.string().required().min(0).max(10000),
        price: Joi.number().required().integer().min(0).max(10000),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        followersCount: Joi.number().optional(),
        isFollowing: Joi.boolean().optional()
    });

    private static patchSchema = Joi.object({
        vacationId: Joi.number().required().integer().min(1),
        description: Joi.string().optional().min(2).max(100),
        startDate: Joi.string().optional().min(0).max(1000),
        endDate: Joi.string().optional().min(0).max(10000),
        price: Joi.number().optional().integer().min(0).max(10000),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        followersCount: Joi.number().optional(),
        isFollowing: Joi.boolean().optional()
    });

    public validatePost(): string {
        const result = VacationModel.postSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = VacationModel.putSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = VacationModel.patchSchema.validate(this);
        return result.error?.message;
    }

}

export default VacationModel;