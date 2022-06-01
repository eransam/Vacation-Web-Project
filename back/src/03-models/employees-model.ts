import Joi from "joi";


class EmployeesModel {
    public employeesID: number;
    public firstName: string;
    public lastName: string;
    public birthDate: string;
    public city: string;
    public imageName: string = ""; // The image name on the backend ("1.jpg")

    public constructor(Employees: EmployeesModel) {
        this.employeesID = Employees.employeesID;
        this.firstName = Employees.firstName;
        this.lastName = Employees.lastName;
        this.birthDate = Employees.birthDate;
        this.city = Employees.city;
        this.imageName = Employees.imageName;

    }

    //סדרת ולידציות למתודות שונות
    private static postSchema = Joi.object({
        employeesID: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(0).max(1000),
        birthDate: Joi.string().required().min(0).max(10000),
        city: Joi.string().optional(),
        imageName: Joi.string().optional()

    });

    private static putSchema = Joi.object({
        employeesID: Joi.number().required().integer().min(1),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        birthDate: Joi.string().required().min(2).max(100),
        city: Joi.string().optional(),
        imageName: Joi.string().optional()

    });

    private static patchSchema = Joi.object({
        employeesID: Joi.number().required().integer().min(1),
        firstName: Joi.string().optional().min(2).max(100),
        lastName: Joi.string().optional().min(2).max(100),
        birthDate: Joi.string().optional().min(2).max(100),
        city: Joi.string().optional(),
        imageName: Joi.string().optional()

    });

    public validatePatch(): string {
        const result = EmployeesModel.patchSchema.validate(this);
        return result.error?.message;
    }

    public validatePost(): string {
        const result = EmployeesModel.postSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = EmployeesModel.putSchema.validate(this);
        return result.error?.message;
    }



}

export default EmployeesModel;